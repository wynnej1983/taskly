/*global console: true, process: true, require: true*/
'use strict';

/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose');

var app = express()
  , oneYear = 86400000 * 365;

app.set('port', process.env.PORT || 3000);
app.set('mongodb', process.env.MONGO_DB || 'mongodb://localhost/taskly_db');

// mongodb connection
mongoose.connect(app.get('mongodb'))
  .connection
  .on('open', function () {
    console.log('INFO::Connected to mongodb at ' + app.get('mongodb'));
  })
  .on('error', function (err) {
    console.log('ERROR::Errored trying to connect to mongodb at ' + app.get('mongodb'));
    console.log(err);
  });


app.use(express.favicon());
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'app'), { maxAge: oneYear }));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('password'));
app.use(express.session({ secret: 'password' }));
app.use(app.router);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// routes
fs.readdirSync('routes').forEach(function (file) {
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName).mapRoutes(app);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('INFO::Taskly REST API service listening on port ' + app.get('port'));
  return;
});
