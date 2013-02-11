/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var lib = require('./lib')
  , config = require('./config')
  , request = require('request');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:'uploads'})); //上传文件保存位置
  app.use(express.methodOverride());
  app.use(app.router);
  // 静态访问，eg：http://localhost:3000/xxx.jpg xxx.jpg在public文件夹
  app.use(express.static(path.join(__dirname, 'public')));
  // 静态访问，eg：http://localhost:3000/uploads/xxx.jpg在uploads文件夹
  app.use("/uploads", express.static(path.join(__dirname, 'uploads'))); 
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// User validation

var auth = express.basicAuth('shimeng', 'aplus', 'Super duper secret area');
app.get('/console/*', auth, function(req, res, next){
  next();
});

// Helpers

app.locals.$ = lib;
app.locals.config = config;

// Routes

routes(app);

// Start Server

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});













