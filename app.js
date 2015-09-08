var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');

// Route to Single Page Application
app.use('/', routes);

// Route to states
app.use('/states', function (req, res) {
  res.render('./states' + req.path);
});

// api routes
var api = {
  clients: require('./routes/api/clients')
}

app.use('/api/clients', api.clients);

// display environment
console.log('\n\t Environment:\t' + app.get('env') + '\n');

// mongodb configuration
var mongoose = require('mongoose');
var mongo = '';

var credentials = {
  user: 'climan',
  password:  'climan'
};

if (app.get('env') === 'development') {
  mongo = 'mongodb://localhost/climan';
  mongoose.connect(mongo);
} else {
  mongo = 'mongodb://' + credentials.user + ':' + credentials.password + '@ds041603.mongolab.com:41603/heroku_m7cmxxmp';
  mongoose.connect(mongo);
}

// mongodb connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection'));
db.once('open', function callback () {
  console.log('mongoose connection [Opened: connected to [' + mongo + ']]');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
