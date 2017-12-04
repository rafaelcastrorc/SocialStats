const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-54-145-205-218.compute-1.amazonaws.com', neo4j.auth.basic('neo4j', 'rafaelcastro'));
const session = driver.session();
const CountryReligionYearNumber = require('../models/CountryReligionYearNumber.js')
const NameYearNumber = require('../models/NameYearNumber.js')

router.get('/', function (req, res) {
  res.send('Religion API works!');
});

//To get all countries
router.get('/countries', function (req, res) {
  console.log('Get all countries');
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
        console.log(object);

      });

      res.json(countriesArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});


router.get('/countries/:name', function (req, res) {
  console.log('Retrieve a country');
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
        console.log(object);

      });

      res.json(countriesArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});

//Gets all the countries
router.get('/religions', function (req, res) {
  console.log('Get all religions');
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
        console.log(object);

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
    .run('MATCH()-[r:HAS_RELIGION]->() RETURN DISTINCT r.year AS year ORDER BY r.year DESC')
    .then(function (result) {
      const yearsArr = [];

      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        yearsArr.push(
          object.low
        );
        console.log(object);

      });

      res.json(yearsArr);
    })

    .catch(function (err) {
      console.log(err);
    });

});

//Query: Get the number of people who follow a certain religion (query 1)
router.get('/queries/:country/:year/:religion', function (req, res) {
  const country = req.params.country;
  const year = parseInt(req.params.year);
  const religion = req.params.religion;
  let countryParam, religionParam, yearParam;
  // Check if user wants to retrieve all the countries
  if (country !== 'All Countries') {
    countryParam = '{name:\''+country+'\'}'
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
    .run('MATCH(c:Country '+ countryParam +'), (rel:Religion '+ religionParam+'),' +
      ' (c)-[r:HAS_RELIGION '+ yearParam +']->(rel) RETURN {Country: c.name, Religion: rel.name, Year: r.year,' +
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


//Query: Get the religions followed by the least amount of countries in a year
router.get('/queries/:year/:limit', function (req, res) {
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
    .run('MATCH (c:Religion) RETURN {Religion: c.name, Number: SIZE((c)<-[:HAS_RELIGION ' + yearParam+']-(:Country))}' +
      ' AS result ORDER  BY SIZE((c)<-[:HAS_RELIGION ' + yearParam+ ']-(:Country)) ' + limitParam)
    .then(function (result) {
      const queryAns = [];
      result.records.forEach(function (record) {
        const object = record.get(0);
        transform(object);
        let query = new NameYearNumber(object.Religion, req.params.year , object.Number);
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
