var consoleRoute = require('./controllers/console');
var products = require('./controllers/products');
var articles = require('./controllers/articles');
var accessories = require('./controllers/accessories');
var comments = require('./controllers/comments');
var site = require('./controllers/site');



module.exports = function(app){
  //app.get('/', routes.index);

  // Product

  app.param('productid', products.getById);

  app.get('/products/new', products.new);
  app.post('/products/new', products.save);

  app.get('/products/:productid/edit', products.edit);
  app.post('/products/:productid/edit', products.update);

  app.get('/products/:id/delete', products.delete);

  //Aticle

  app.param('articleid', articles.getById);

  app.get('/articles/new', articles.new);
  app.post('/articles/new', articles.save);

  app.get('/articles/:articleid/edit', articles.edit);
  app.post('/articles/:articleid/edit', articles.update);

  app.get('/articles/:id/delete', articles.delete);

  //Accessory

  app.param('accessoryid', accessories.getById);

  app.get('/accessories/new', accessories.new);
  app.post('/accessories/new', accessories.save);

  app.get('/accessories/:accessoryid/edit', accessories.edit);
  app.post('/accessories/:accessoryid/edit', accessories.update);

  app.get('/accessories/:id/delete', accessories.delete);

  // Comment

  app.param('commentid', comments.getById);

  app.post('/comments/new', comments.save);
  app.get('/comments/:commentid/delete', comments.delete);
  app.post('/comments/:commentid/reply', comments.reply);

  // Console

  app.get('/console', function(req, res){
    res.redirect('/console/products');
  })
  app.get('/console/products', consoleRoute.products);
  app.get('/console/articles', consoleRoute.articles);
  app.get('/console/accessories', consoleRoute.accessories);
  app.get('/console/comments', consoleRoute.allComments);
  app.get('/console/products/:productid/comments', consoleRoute.comments);
  app.get('/console/articles/:articleid/comments', consoleRoute.comments);
  app.get('/console/accessories/:accessoryid/comments', consoleRoute.comments);

  app.get('/console/ad', consoleRoute.ad);
  app.post('/console/ad', consoleRoute.adSave);
  app.get('/console/bulletin', consoleRoute.bulletin);
  app.post('/console/bulletin', consoleRoute.bulletinSave);
  app.get('/console/slide', consoleRoute.slide);
  app.post('/console/slide', consoleRoute.slideSave);

  // Website

  // app.get(/^\/(?!console)(?!stylesheets)(?!javascripts)(?!sea-modules).*/, site.prepare);

  app.get('/', site.home);

  app.get('/products', site.products);
  app.get('/products/:productid', site.product);
  app.get('/articles', site.articles);
  app.get('/articles/:articleid', site.article);
  app.get('/accessories', site.accessories);
  app.get('/accessories/:accessoryid', site.accessory);
  app.get('/aboutus', site.aboutus);
  app.get('/service', site.service);
}