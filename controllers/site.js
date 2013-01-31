var Product = require('../models/product');
var Article = require('../models/article');
var Comment = require('../models/comment');
var db = require('../models/db');
var config = require('../config');
var lib = require('../lib');
var util = require('util');
var EventProxy = require('eventproxy');

exports.home = function(req, res){
  var render = EventProxy.create('hotProducts', 'newProducts', 'newComments', function(hotProducts, newProducts, newComments){
    res.render('website/home', { title:'首页', hotProducts:hotProducts, newProducts:newProducts, newComments:newComments } );
  });
  Product.getHot(5, function(err, products){
    render.emit('hotProducts', products);
  });
  Product.get({}, 12, function(err, products){
    render.emit('newProducts', products);
  });
  Comment.get({}, 5, function(err, comments){
    render.emit('newComments', comments);
  })
  
}

exports.products = function(req, res){
  var query = req.query;
  if('page' in query){
    delete query.page;
  }
  var render = EventProxy.create('pageManager', function(pageManager){
    res.render('website/product_index', { title:'产品列表', pageManager:pageManager, products:pageManager.data, query:query } );
  });

  Product.getOnePage(req, query, function(pageManager){
    render.emit('pageManager', pageManager);
  });
}

exports.product = function(req, res){
  var product = req.result;
  product.count++;
  Product.update(product._id, product);

  Comment.getOnePage(req, {parent_id:product._id}, function(pageManager){
    res.render('website/product_detail', { title:'', product:product, comments:pageManager.data, pageManager:pageManager})
  })
}

exports.articles = function(req, res){  
  var render = EventProxy.create('pageManager', function(pageManager){
    res.render('website/article_index', { title:'文章列表', pageManager:pageManager, articles:pageManager.data } );
  })

  Article.getOnePage(req, {}, function(pageManager){
    render.emit('pageManager', pageManager);
  });
}

exports.article = function(req, res){
  var article = req.result;
  article.count++;
  Article.update(article._id, article);

  Comment.getOnePage(req, {parent_id:article._id}, function(pageManager){
    res.render('website/article_detail', { title:'', article:article, comments:pageManager.data, pageManager:pageManager})
  })
}