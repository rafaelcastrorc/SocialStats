var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./server/routes/api')
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);


app.get('*', function (req, res) {
  res.send(path.join(__dirname, 'dist/index.html'));
});


app.listen(port, function() {
  console.log("Server running on localhost: " + port);
});
