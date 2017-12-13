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
  var query = 'select * from Indicators order by code';

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
  var query = 'select * from Countries order by name';

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
  // var query = "select y2000, y2001, y2002, y2003, y2004, y2005, y2006, y2007, y2008, y2009, y2010, y2011, y2012," +
  //   " y2013, y2014 from WorldBank where country_code = '"+ country +"' and" +
  //   " indicator_code = '" + indicator + "';";
  var query = "select * from WorldBank where country_code = '"+ country +"' and" +
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

router.get('/query3/:country/:year', function (req, res) {

  const country = req.params.country;
  var year = req.params.year;
  year = 'y' + year ;
  console.log('year: '+year);

  console.log('Q1: Getting data for '+country+' for '+year);

  var query = "select "+year+" from WorldBank where country_code = '"+ country + "' order by indicator_code;";

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });


});

router.get('/query4/:indicator/:year', function (req, res) {

  const indicator = req.params.indicator;
  var year = req.params.year;
  year = 'y' + year ;
  console.log('year: '+year);

  console.log('Q1: Getting top 10 data for '+indicator+' for '+year);

  var query = "select name, "+year+" from WorldBank inner join Countries on country_code = code where indicator_code" +
    " = '"+ indicator + "' order by "+year+" desc" +
    " limit" +
    " 10;";

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });


});

router.get('/top10/:indicator/:year/:mode', function (req, res) {

  const indicator = req.params.indicator;
  var year = req.params.year;
  var mode = req.params.mode;
  year = 'y' + year ;
  console.log('year: '+year);
  var query;
  if(mode == 'top') {
    console.log('Q1: Getting top 10 data for ' + indicator + ' for ' + year);

    query = "select name, " + year + " from WorldBank inner join Countries on country_code = code where indicator_code" +
      " = '" + indicator + "' and name <> 'World' and name <> 'IDA & IBRD total' and name <> 'Low & middle income'" +
      " and" +
      " name <> 'Middle income' and name <> 'IBRD only' and name <> 'Early-demographic dividend' and name <> 'Lower" +
      " middle income' and name <> 'Upper middle income' " +
      "and name <> 'East Asia & Pacific' and name <> 'Late-demographic dividend' order by " + year + " desc" +
      " limit 10;";
  }
  if(mode == 'bottom') {
    console.log('Q1: Getting top 10 data for ' + indicator + ' for ' + year);

    query = "select name, " + year + " from WorldBank inner join Countries on country_code = code where indicator_code" +
      " = '" + indicator + "' order by " + year +
      " limit" +
      " 10;";
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });


});

router.get('/percentDifference/:country/:indicator/:year1/:year2', function (req, res) {

  const indicator = req.params.indicator;
  const country = req.params.country;
  var year1 = req.params.year1;
  var year2 = req.params.year2;
  year1 = 'y' + year1 ;
  year2 = 'y' + year2;
  console.log('year1: '+year1);

  console.log('Q1: Getting percent difference '+country+' for '+year1);

  var query = "select (( "+year2+"-"+year1+")/"+year1+")*100 as percent from WorldBank inner join Countries on" +
    " country_code =" +
    " code" +
    " where" +
    " indicator_code" + " = '"+ indicator + "' and name = '"+ country +"';";

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
