const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'cis550db.crillo0h6fby.us-east-1.rds.amazonaws.com',
  port : '3306',
  user : 'digvijay10011',
  password : 'qwerty10011',
  database : 'cis550db'
});

router.get('/', function (req, res) {
  res.send('Fuck, it works');
});

//To get all indicators
router.get('/allIndicators', function (req, res) {
  console.log('Getting all indicators');
  var query = 'select * from Indicators';

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

});

router.get('/allCountries', function (req, res) {
  console.log('Getting all countries');
  var query = 'select * from Countries';

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

});

router.get('/allCountriesDesc', function (req, res){
  console.log('getting all descriptions');
  var query = "select * from CountriesDesc;";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});

router.get('/query1/:country/:indicator', function (req, res) {

  const country = req.params.country;
  const indicator = req.params.indicator;

  console.log('Q1: Getting data for '+country+' for '+indicator);
  var query = "select y2000, y2001, y2002, y2003, y2004, y2005 from WorldBank where country_code = '"+ country +"' and" +
    " indicator_code = '" + indicator + "';";

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });


});



module.exports = router;
