var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/nuxt-book', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({'extended':'false'}));
//app.use(express.static(path.join(__dirname, 'dist')));

// JWT middleware
const jwt = require('express-jwt')

app.use('/code', jwt({secret: 'nuxt-book'}), require('./code'));
app.use('/auth', require('./auth'));
app.use('/compile',require('./compile'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err);

  if (req.app.get('env') !== 'development') {
      delete err.stack;
  }

    res.status(err.statusCode || 500).json(err);
});

module.exports = {
  path: '/api',
  handler: app
}
