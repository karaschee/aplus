var console = require('./controllers/console');
var products = require('./controllers/products');
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

  app.get('/products/:productid/delete', products.delete);

  // Comment

  app.post('/:collection/:id/comments/new', comments.save)

  // Console

  app.get('/console', function(req, res){
    res.redirect('/console/products');
  })
  app.get('/console/products', console.products);
  app.get('/console/products/:productid/comments', console.comments)
  
  app.get('/console/articles/:productid/comments', console.comments)

  // Website

  app.get('/products', site.products)

  app.get('/products/:productid', site.product)
}