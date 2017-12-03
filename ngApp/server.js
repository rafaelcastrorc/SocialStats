const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api_religion = require('./server/routes/api_religion');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const configDB = require('./config/database.js');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//religion api
app.use('/api_religion', api_religion);


mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({ secret: 'quackquackquack' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./app/routes.js')(app, passport);
//Default page is index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(port, function () {
  console.log("Server running on localhost: "+ port);
});
