const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api_religion = require('./server/routes/api_religion');
const api_aws = require('./server/routes/api_aws.js');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//religion api
app.use('/api_religion', api_religion);

app.use('/api_aws', api_aws);

//Default page is index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});


app.listen(port, function () {
  console.log("Server running on localhost: "+ port);
});
