var console = require('./controllers/console');
var products = require('./controllers/products');
var articles = require('./controllers/articles');
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

  // Comment

  app.param('commentid', comments.getById);

  app.post('/comments/new', comments.save);
  app.get('/comments/:commentid/delete', comments.delete);
  app.post('/comments/:commentid/reply', comments.reply);

  // Console

  app.get('/console', function(req, res){
    res.redirect('/console/products');
  })
  app.get('/console/products', console.products);
  app.get('/console/articles', console.articles);
  app.get('/console/comments', console.allComments);
  app.get('/console/products/:productid/comments', console.comments);
  app.get('/console/articles/:articleid/comments', console.comments);


  // Website

  app.get('/products', site.products)
  app.get('/products/:productid', site.product)

  app.get('/articles', site.articles)
  app.get('/articles/:articleid', site.article)
}