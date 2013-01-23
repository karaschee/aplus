var Product = require('../models/product.js');
var Comment = require('../models/comment.js');

exports.products = function(req, res){
  Product.get({}, function(err, products){
  res.render('website/product_index', { title:'', products:products})
  });
}

exports.product = function(req, res){
  var product = req.product;
  var comments = Comment.getByParentId(product._id, function(err, comments){
    res.render('website/product_detail', { title:'', product:product, comments:comments})
  })
}