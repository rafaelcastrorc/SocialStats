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


router.get('/getCountries', function (req, res) {
  var query = 'SELECT code, name FROM Countries;';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/getIndicators', function (req, res) {
  // console.log('Getting all indicators');
  var query = 'SELECT code, name from Indicators ORDER BY code';
  connection.query(query, function(err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

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

router.get('/conflictsPerYear/:countryCode', function (req, res) {
  var countryCode = req.params.countryCode;
  console.log("Get conflicts for " + countryCode);
  var query = 'Select t.year, COUNT(*) as numConflicts FROM Conflicts t ' +
    'WHERE t.country_id = "' + countryCode + '" GROUP BY t.year;';

  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

router.get('/DeathsPerYear/:countryCode', function (req, res) {
  var countryCode = req.params.countryCode;
  console.log("Get num deaths for " + countryCode);
  var query = 'SELECT t.year, (SUM(t.deaths_a) + SUM(t.deaths_b) + SUM(t.deaths_civilians)) as totalDeaths ' +
    'FROM Conflicts t ' +
    'WHERE t.country_id = "' + countryCode + '" GROUP BY t.year;';

  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

router.get('/conflictLocation/:countryCode', function (req, res) {
  var countryCode = req.params.countryCode;
  console.log("Get locations of deaths for " + countryCode);
  var query = 'SELECT (t.deaths_a + t.deaths_b + t.deaths_civilians) as totalDeaths, t.latitude, t.longitude ' +
    'FROM Conflicts t ' +
    'WHERE t.country_id = "' + countryCode + '" ORDER BY totalDeaths DESC LIMIT 50;';

  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

router.get('/numConflictsAndIndicator/:indicatorCode/:year', function (req, res) {
  var indicatorCode = req.params.indicatorCode;
  var year = req.params.year;
  console.log("Get correlation between " + indicatorCode + " and number of conflicts in " + year);
  var query = 'SELECT e.country_code, cc.numConflicts, e.y' + year + ' as indicatorVal ' +
    'FROM WorldBank e INNER JOIN (' +
      'SELECT c.country_id, COUNT(*) as numConflicts ' +
      'FROM Conflicts c ' +
      'WHERE c.year = ' + year + ' ' +
      'GROUP BY (c.country_id)) ' +
    'cc ON e.country_code = cc.country_id ' +
    'WHERE e.indicator_code = "' + indicatorCode + '";';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

router.get('/numDeathsAndIndicator/:indicatorCode/:year', function (req, res) {
  var indicatorCode = req.params.indicatorCode;
  var year = req.params.year;
  console.log("Get correlation between " + indicatorCode + " and number of deaths in " + year);
  var query = 'SELECT e.country_code, cc.numDeaths, e.y' + year + ' as indicatorVal ' +
    ' FROM WorldBank e INNER JOIN (' +
    'SELECT c.country_id, (SUM(c.deaths_a) + SUM(c.deaths_b) + SUM(c.deaths_civilians)) as numDeaths ' +
    'FROM Conflicts c ' +
    'WHERE c.year = ' + year + ' ' +
    'GROUP BY (c.country_id)) ' +
    'cc ON e.country_code = cc.country_id ' +
    'WHERE e.indicator_code = "' + indicatorCode + '";';
  connection.query(query, function (err, rows) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
});

router.get('/deadliestConflicts', function (req, res) {
  console.log("Get the deadliest conflict of each nation, limited to top 50");
  var query = 'SELECT c.name, t.date_start, t.date_end, max((t.deaths_a + t.deaths_b + t.deaths_civilians)) as totalDeaths ' +
    'FROM Countries c INNER JOIN Conflicts t ON c.code = t.country_id ' +
    'GROUP BY c.name ' +
    'ORDER BY totalDeaths DESC ' +
    'LIMIT 50;';
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
});

module.exports = router;
