var Product = require('../models/product.js');
var Article = require('../models/article.js');
var Comment = require('../models/comment.js');
var util = require('util')

exports.products = function(req, res){
  Product.get({}, function(err, products){
    res.render('website/product_index', { title:'', products:products})
  });
}

exports.product = function(req, res){
  var product = req.result;
  var comments = Comment.getByParentId(req.params.productid, function(err, comments){
    res.render('website/product_detail', { title:'', product:product, comments:comments})
  })
}

exports.articles = function(req, res){
  Article.get({}, function(err, articles){
    res.render('website/article_index', { title:'', articles:articles})
  });
}

exports.article = function(req, res){
  var article = req.result;
  var comments = Comment.getByParentId(req.params.articleid, function(err, comments){
    res.render('website/article_detail', { title:'', article:article, comments:comments})
  })
}