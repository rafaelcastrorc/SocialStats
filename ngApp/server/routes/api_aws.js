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
  res.send('I am able to connect to AWS');
});

router.get('/WorldBankTEST', function (req, res) {
  var query = 'SELECT * FROM WorldBank where indicator_code = \'SP.POP.TOTL\';';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/conflicts', function (req, res) {
  var year = req.params.year;
  console.log("Get conflicts for " + year);
  var query = 'SELECT * FROM Conflicts LIMIT 10;';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

router.get('/conflicts/:year', function (req, res) {
  var year = req.params.year;
  console.log("Get conflicts for " + year);
  var query = 'SELECT * FROM Conflicts WHERE year = ' + year + ';';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});
//
router.get('/conflicts/:country/:year', function (req, res) {
  var country = req.params.country;
  var year = req.params.year;
  console.log("Get conflicts for " + year);
  var query = 'SELECT * FROM Conflicts WHERE country = ' + country + ' AND year = ' + year + ';';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
  //console.log('You are now connected...');
});

module.exports = router;
