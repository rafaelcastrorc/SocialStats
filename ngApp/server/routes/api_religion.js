const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-54-145-205-218.compute-1.amazonaws.com', neo4j.auth.basic('neo4j', 'rafaelcastro'));
const session = driver.session();
const country = require('../models/Country');


router.get('/', function (req, res) {
  res.send('Religion API works!');
});

//To get all countries
router.get('/countries', function (req, res) {
  console.log('Get all countries');
  session
    .run('MATCH(n:Country) RETURN n')
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
    .run('MATCH(n:Country{name:{nameParam}}) RETURN n', {nameParam: req.params.name})
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

//To get all countries
router.get('/religions', function (req, res) {
  console.log('Get all religions');
  session
    .run('MATCH(r:Religion) RETURN r')
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


router.post('/video', function(req, res) {
  console.log('Type a country');
  var countryName = req.body.name;
  var abbrev = req.body.abbrev;


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



