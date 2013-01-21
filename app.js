
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , consoleRoute = require('./routes/console')
  , http = require('http')
  , path = require('path')
  , db = require('./models/db');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:'./uploads'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'uploads')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Helpers

app.locals.blankStr = function(obj){
  if(obj === undefined){
    return "";
  }
  return obj;
}


// Routes

app.get('/', routes.index);

// Console

app.get('/console', function(req, res){
  res.redirect('/console/product');
})

// Console Product

app.param('productid', consoleRoute.getProductById);

app.get('/console/product', consoleRoute.product_index);

app.get('/console/product/new', consoleRoute.product_new);
app.post('/console/product/new', consoleRoute.product_new_save);

app.get('/console/product/edit/:productid', consoleRoute.product_edit);
app.post('/console/product/edit/:productid', consoleRoute.product_edit_save);

app.get('/console/product/delete/:productid', consoleRoute.product_delete);


// Start Server

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});













