/**
 * Developed by Rafael Castro
 */
const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-54-145-205-218.compute-1.amazonaws.com', neo4j.auth.basic('neo4j', 'rafaelcastro'));
const session = driver.session();
const CountryReligionYearNumber = require('../models/CountryReligionYearNumber.js');
const NameYearNumber = require('../models/NameYearNumber.js');
const CountryReligionNumber = require('../models/CountryReligionNumber.js');
const PartOf = require('../models/PartOf.js');
const YearValue = require('../models/YearValue.js');
const NameValue = require('../models/NameValue.js');

let allYearsArr = [];


router.get('/', function (req, res) {
  res.send('Religion API works!');
});

//To get all countries
router.get('/countries', function (req, res) {
  session
    .run('MATCH(n:Country) RETURN n ORDER BY n.name')
    .then(function (result) {
      const countriesArr = [];

      result.records.forEach(function (record) {

        const object = record._fields[0].properties;
        transform(object);

        countriesArr.push({
          name: object.name,
          abbrev: object.abbrev
        });

      });

      res.json(countriesArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});


router.get('/countries/:name', function (req, res) {
  session
    .run('MATCH(n:Country{name:{nameParam}}) RETURN n ORDER BY n.name', {nameParam: req.params.name})
    .then(function (result) {
      const countriesArr = [];

      result.records.forEach(function (record) {

        const object = record._fields[0].properties;
        transform(object);
        countriesArr.push({
          name: object.name,
          abbrev: object.abbrev
        });

      });

      res.json(countriesArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});

//Gets all the countries
router.get('/religions', function (req, res) {
  session
    .run('MATCH(r:Religion)RETURN r ORDER BY r.name')
    .then(function (result) {
      const religionsArr = [];

      result.records.forEach(function (record) {

        const object = record._fields[0].properties;
        transform(object);

        religionsArr.push({
          name: object.name,
          religionCode: object.religionCode
        });

      });

      res.json(religionsArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});


//Gets all the years
router.get('/years', function (req, res) {
  session
    .run('MATCH()-[r:HAS_RELIGION]->() RETURN DISTINCT r.year AS year ORDER BY r.year')
    .then(function (result) {
      const yearsArr = [];

      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        yearsArr.push(
          object.low
        );

      });
      allYearsArr = yearsArr;
      res.json(yearsArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});

//Query: Get the number of people who follow a certain religion (query 1)
router.get('/queries/followers/:country/:year/:religion', function (req, res) {
  const country = req.params.country;
  const year = parseInt(req.params.year);
  const religion = req.params.religion;
  let countryParam, religionParam, yearParam;
  // Check if user wants to retrieve all the countries
  if (country !== 'All Countries') {
    countryParam = '{name:\'' + country + '\'}'
  }
  else {
    countryParam = '';
  }
  // Check if user wants to retrieve all the countries
  if (religion !== 'All Religions') {
    religionParam = '{name:\'' + religion + '\'}'
  }
  else {
    religionParam = '';
  }
  // Check if user wants to retrieve all the countries
  if (!Number.isNaN(year)) {
    yearParam = '{year:' + year + '}'
  }
  else {
    yearParam = '';
  }

  session
    .run('MATCH(c:Country ' + countryParam + '), (rel:Religion ' + religionParam + '),' +
      ' (c)-[r:HAS_RELIGION ' + yearParam + ']->(rel) RETURN {Country: c.name, Religion: rel.name, Year: r.year,' +
      ' Number: r.number_of_members} AS result ORDER BY c.name, rel.name, r.year, rel.number_of_members')
    .then(function (result) {
      const queryAns = [];
      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        let query = new CountryReligionYearNumber(object.Country, object.Religion, object.Year, object.Number);
        queryAns.push(query);
      });
      //In case the result does not exist
      if (queryAns.length === 0) {
        queryAns.push({
          country: country,
          religion: religion,
          year: 'No records',
          number: 'No records'
        });
      }
      res.json(queryAns);

    })

    .catch(function (err) {
      console.log(err);
    });

});


//Query: Get the religions followed by the least amount of countries in a year (query2)
router.get('/queries/leastfollowed/:year/:limit', function (req, res) {
  const year = parseInt(req.params.year);
  const limit = parseInt(req.params.limit);
  let yearParam, limitParam;

  if (!Number.isNaN(year)) {
    yearParam = '{year:' + year + '}'
  }
  else {
    yearParam = '';
  }
  if (!Number.isNaN(limit)) {
    limitParam = 'limit ' + limit;
  }
  else {
    limitParam = '';
  }

  session
    .run('MATCH (c:Religion) RETURN {Religion: c.name, Number: SIZE((c)<-[:HAS_RELIGION ' + yearParam + ']-(:Country))}' +
      ' AS result ORDER  BY SIZE((c)<-[:HAS_RELIGION ' + yearParam + ']-(:Country)) ' + limitParam)
    .then(function (result) {
      const queryAns = [];
      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        let query = new NameYearNumber(object.Religion, req.params.year, object.Number);
        queryAns.push(query);
      });
      //In case the result does not exist
      if (queryAns.length === 0) {
        queryAns.push({
          year: 'No records',
          number: 'No records'
        });
      }
      res.json(queryAns);

    })

    .catch(function (err) {
      console.log(err);
    });

});


//Query: Get the most followed religion per country (query 3)
router.get('/queries/mostpopular/:year/:top/:ignore', function (req, res) {
  const year = parseInt(req.params.year);
  const top = parseInt(req.params.top);
  const ignore = (req.params.ignore === 'true');
  let ignorePartOf = '';
  if (ignore) {
    ignorePartOf = "WHERE NOT (:Religion)-[:PART_OF]->(r)";
  }

  session
    .run('MATCH (c:Country)-[has:HAS_RELIGION{year:' + year + '}]->(r:Religion)' + ignorePartOf + ' WITH c.name AS country,' +
      ' r.name AS religion, has.number_of_members AS num ORDER BY num DESC WITH country, collect([religion, num])[..' + top + '] ' +
      'AS temp UNWIND temp AS res RETURN {Country: country, Religion: res[0],Number: res[1]} ORDER BY country, res[1] DESC')
    .then(function (result) {
      const queryAns = [];
      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        let query = new CountryReligionNumber(object.Country, object.Religion, object.Number);
        queryAns.push(query);
      });
      //In case the result does not exist
      if (queryAns.length === 0) {
        queryAns.push({
          country: country,
          religion: religion,
          year: 'No records',
          number: 'No records'
        });
      }
      res.json(queryAns);

    })

    .catch(function (err) {
      console.log(err);
    });

});


//Query: Get the number of people who follow a certain religion (query 4)
//Ex:
// MATCH (allRels:Religion)<-[all:HAS_RELIGION{year:2010}]-(:Country{abbrev:"ALB"})
// WHERE NOT (:Religion)-[:PART_OF]->(allRels)
// WITH SUM(all.number_of_members) AS TotalPop
// MATCH (:Country{abbrev:"ALB"})-[r:HAS_RELIGION{year:2010}]->(rel:Religion)
// WHERE NOT (:Religion)-[:PART_OF]->(rel)
// RETURN DISTINCT (rel.name) AS Religion,
// 100.0 * SUM(r.number_of_members) / TotalPop AS Percent
// ORDER BY Percent DESC
router.get('/queries/percentage/:country/:year/:group', function (req, res) {
  const country = req.params.country;
  const year = parseInt(req.params.year);
  const group = req.params.group;

  let countryParam, yearParam;
  // Check if user wants to retrieve all the countries
  if (country !== 'All Countries') {
    countryParam = '{name:\'' + country + '\'}'
  }
  else {
    countryParam = '';
  }
  //If user wants to group the religions that are part of other religions
  let groupPartOf = "WHERE NOT (:Religion)<-[:PART_OF]-(rel)";
  if (group === 'no') {
    console.log(group)
    groupPartOf = "WHERE NOT (:Religion)-[:PART_OF]->(rel)";
  }

  // Check if user wants to retrieve all the countries
  yearParam = '{year:' + year + '}';

  session
    .run('MATCH (allRels:Religion)<-[all:HAS_RELIGION ' + yearParam + ']-(:Country' + countryParam + ') ' +
      'WHERE NOT (:Religion)-[:PART_OF]->(allRels) ' +
      'WITH SUM(all.number_of_members) AS TotalPop ' +
      'MATCH (:Country' + countryParam + ')-[r:HAS_RELIGION' + yearParam + ']->(rel:Religion) ' +
      groupPartOf + ' ' +
      'RETURN DISTINCT (rel.name) AS Religion, ' +
      '100.0 * SUM(r.number_of_members) / TotalPop AS Percent ' +
      'ORDER BY Percent DESC')
    .then(function (result) {

      let queryAns = [];
      result.records.forEach(function (record) {
        transform(record);
        let query = new NameValue(record._fields[0], parseFloat(record._fields[1]).toFixed(2));
        queryAns.push(query);
      });


      res.json(queryAns);

    })

    .catch(function (err) {
      console.log(err);
    });

});


//Query: Get the change in number of people who follow  a religion(query 5)
router.get('/queries/numbers/:country/:religion/:year', function (req, res) {
  const country = req.params.country;
  const religion = req.params.religion;
  let countryParam, religionParam, partOf;
  // Check if user wants to retrieve all the countries
  if (country !== 'All Countries') {
    countryParam = '{name:\'' + country + '\'}'
  }
  else {
    countryParam = '';
  }
  // Check if user wants to retrieve all the religions
  if (religion !== 'All Religions') {
    religionParam = '{name:\'' + religion + '\'}'
    partOf = '';
  }
  else {
    religionParam = '';
    partOf = "WHERE NOT ((:Religion)-[:PART_OF]->(rel) OR rel.name = \"Non. Religious\") ";

  }
  session
  //MATCH (rel:Religion) WHERE NOT (:Religion)-[:PART_OF]->(rel)  WITH rel MATCH (c:Country {name:'Albania'}), (c)-[r:HAS_RELIGION]->(rel)  RETURN DISTINCT (r.year) AS Year, SUM(r.number_of_members) AS Number ORDER BY r.year
  //By percent:
    .run('MATCH (rel:Religion ' + religionParam + ') ' + partOf +
      'WITH rel ' +
      'MATCH (c:Country ' + countryParam + '), (c)-[r:HAS_RELIGION]->(rel) ' +
      'RETURN DISTINCT (r.year) AS Year, SUM(r.number_of_members) AS Number ORDER BY r.year')
    .then(function (result) {
      let queryAns = [];
      result.records.forEach(function (record) {
        transform(record);
        let query = new YearValue(parseInt(record._fields[0]), parseInt(record._fields[1]));
        queryAns.push(query);
      });

      let valuesPerYear = mapYearToNumber(queryAns);
      res.json(valuesPerYear);
    })

    .catch(function (err) {
      console.log(err);
    });

});


//Query: Get the change in PERCENTAGE of people who follow  a religion(query 5)
//MATCH()-[y:HAS_RELIGION]->()
// WITH y
// WITH COLLECT (DISTINCT y.year) AS years
// UNWIND years as curr
// //Get total population for every year
// MATCH (allRels:Religion)<-[all:HAS_RELIGION{year:curr}]-(:Country{})
// WHERE NOT (:Religion)-[:PART_OF]->(allRels)
// WITH SUM(all.number_of_members) AS TotalPop, curr
// //Get percentage of religion per year
// MATCH (:Country{})-[r:HAS_RELIGION{year:curr}]->(rel:Religion{})
// WHERE NOT ((:Religion)-[:PART_OF]->(rel) OR rel.name = "Non. Religious")
// RETURN DISTINCT curr AS Year,
// 100.0 * SUM(r.number_of_members) / TotalPop AS Percent
// ORDER BY Year DESC;
router.get('/queries/numbers2/:country/:religion/:year', function (req, res) {
  const country = req.params.country;
  const religion = req.params.religion;
  const year = parseInt(req.params.year);
  let countryParam, religionParam, partOf, yearParam;
  // Check if user wants to retrieve all the countries
  if (country !== 'All Countries') {
    countryParam = '{name:\'' + country + '\'}'
  }
  else {
    countryParam = '';
  }
  // Check if user wants to retrieve all the religions
  if (religion !== 'All Religions') {
    religionParam = '{name:\'' + religion + '\'}'
    partOf = '';
  }
  else {
    religionParam = '';
    partOf = "WHERE NOT ((:Religion)-[:PART_OF]->(religions:Religion) OR religions.name = \"Non. Religious\")";
  }
  if (!Number.isNaN(year)) {
    yearParam = '{year:' + year + '}'
  }
  else {
    yearParam = '';
  }
  console.log(yearParam);
  session
    .run('MATCH (y:Year'+ yearParam +')\n' +
      'WITH collect(y.year) AS years\n' +
      'UNWIND years as curr\n' +
      'WITH DISTINCT curr\n' +
      'MATCH (allRels:Religion) \n' +
      'WHERE NOT (:Religion)-[:PART_OF]->(allRels:Religion)\n' +
      'WITH COLLECT (distinct allRels) as allReligions, curr\n' +
      'UNWIND allReligions AS currReligion\n' +
      'WITH DISTINCT currReligion, curr\n' +
      'MATCH (:Country'+ countryParam +')-[all:HAS_RELIGION{year:curr}]->(currReligion) \n' +
      'WITH SUM(all.number_of_members) AS TotalPop, curr\n' +
      'MATCH (religions:Religion) \n' +
      partOf + ' '+
      'WITH religions, TotalPop, curr\n' +
      'MATCH (:Country' + countryParam+ ')-[r:HAS_RELIGION{year:curr}]->(religions'+ religionParam + ') \n' +
      'RETURN DISTINCT curr AS Year,\n' +
      '                100.0 * SUM(r.number_of_members) / TotalPop AS Percent\n' +
      '  ORDER BY Year DESC')

    .run('MATCH()-[y:HAS_RELIGION' + yearParam+ ']->() ' +
      'WITH y ' +
      'WITH COLLECT (DISTINCT y.year) AS years ' +
      'UNWIND years as curr ' +
      'MATCH (allRels:Religion)<-[all:HAS_RELIGION{year:curr}]-(:Country' + countryParam + ') ' +
      'WHERE NOT (:Religion)-[:PART_OF]->(allRels) ' +
      'WITH SUM(all.number_of_members) AS TotalPop, curr ' +
      'MATCH (c:Country ' + countryParam + ')-[r:HAS_RELIGION{year:curr}]->(rel:Religion' + religionParam + ') ' +
      partOf + ' ' +
      'RETURN DISTINCT curr AS Year,\n' +
      '100.0 * SUM(r.number_of_members) / TotalPop AS Number ' +
      'ORDER BY Year')
    .then(function (result) {
      let queryAns = [];
      result.records.forEach(function (record) {
        transform(record);
        let query = new YearValue(parseInt(record._fields[0]), parseInt(record._fields[1]));
        queryAns.push(query);
      });

      let valuesPerYear = mapYearToNumber(queryAns);
      res.json(valuesPerYear);
    })

    .catch(function (err) {
      console.log(err);
    });

});

//Returns the PART_OF relationship between religions (religions that are part of another religion)
router.get('/partof', function (req, res) {
  session
    .run('MATCH p= (r1:Religion)-[r:PART_OF]->(r2:Religion) RETURN {Religion: r1.name, Partof:r2.name}')
    .then(function (result) {
      const partOfArr = [];

      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        let query = new PartOf(object.Religion, object.Partof);
        partOfArr.push(
          query
        );

      });

      res.json(partOfArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});


//Creates an array for the values of each year, if there is no value for a given year, it adds a 0 to the array
function mapYearToNumber(arrayOfValues) {
  // Create an array of 0s based on the number of
  let result = Array.apply(null, Array(allYearsArr.length)).map(Number.prototype.valueOf, 0);
  for (let i = 0; i < arrayOfValues.length; i++) {
    let curr = arrayOfValues[i];
    //Get the start year value and get its index position
    let indexToUse = (parseInt(curr.year - allYearsArr[0])) / 5;
    result[indexToUse] = curr.number;
  }
  return result;
}


//For handling numbers in neo4j
function transform(object) {
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      const propertyValue = object[property];
      if (neo4j.isInt(propertyValue)) {
        object[property] = propertyValue.toString();
      } else if (typeof propertyValue === 'object') {
        transform(propertyValue);
      }
    }
  }
}

module.exports = router;
