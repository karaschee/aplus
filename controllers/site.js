var Product = require('../models/product.js');
var Article = require('../models/article.js');
var Comment = require('../models/comment.js');
var config = require('../config.js');
var lib = require('../lib.js');
var util = require('util');
var EventProxy = require('eventproxy');

exports.products = function(req, res){
  var query = {};
  var render = EventProxy.create('pageManager', function(pageManager){
    res.render('website/product_index', { title:'产品列表', productPageManager:pageManager, products:pageManager.data, query:query } );
  })

  lib.pages({
    currentPage:parseInt(req.query.page, 10) || 1,
    limit:config.productsPerPage,
    collection:'product',
    base:'/products',
    query:query
  }, render);
}

exports.product = function(req, res){
  var product = req.result;
  product.count++;
  Product.update(product._id, product);

  Comment.getByParentId(req.params.productid, function(err, comments){
    res.render('website/product_detail', { title:'', product:product, comments:comments})
  })
}

exports.articles = function(req, res){  
  var render = EventProxy.create('pageManager', function(pageManager){
    res.render('website/article_index', { title:'文章列表', articlePageManager:pageManager, articles:pageManager.data } );
  })
  lib.pages({
    currentPage:parseInt(req.query.page, 10) || 1,
    limit:config.articlesPerPage,
    collection:'article',
    base:'/articles'
  }, render);
}

exports.article = function(req, res){
  var article = req.result;
  article.count++;
  Article.update(article._id, article);

  Comment.getByParentId(req.params.articleid, function(err, comments){
    res.render('website/article_detail', { title:'', article:article, comments:comments})
  })
}