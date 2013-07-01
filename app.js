/*global console: true, process: true*/
'use strict';

/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();
var oneYear = 86400000 * 365;

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.favicon());
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'app'), { maxAge: oneYear }));

app.use(express.logger('dev'));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('password'));
app.use(express.session({ secret: 'password' }));
app.use(passport.initialize());
app.use(passport.session());
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
  console.log('Express server listening on port ' + app.get('port'));
  return;
});
