var Product = require('../models/product');
var Article = require('../models/article');
var Comment = require('../models/comment');
var db = require('../models/db');
var config = require('../config');
var lib = require('../lib');
var util = require('util');
var EventProxy = require('eventproxy');

exports.home = function(req, res){
  var render = EventProxy.create('hotProducts', 'newProducts', 'newComments', 'askArticle', 'askArticleComments', function(hotProducts, newProducts, newComments, askArticle, askArticleComments){
    res.render('website/home', { title:'首页', hotProducts:hotProducts, newProducts:newProducts, newComments:newComments, askArticle:askArticle, askArticleComments:askArticleComments } );
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
  Article.get({show_in_home:'1'}, 1, function(err, articles){
    console.log(articles);
    if(articles.length == 1){
      Comment.get({parent_id:articles[0]._id}, 10, function(err, comments){
        render.emit('askArticleComments', comments);
      })
      render.emit('askArticle', articles[0]);
    }else {
      render.emit('askArticle', undefined);
      render.emit('askArticleComments', []);
    }
  });
}

exports.products = function(req, res){
  var query = lib.copy(req.query);
  var originPrice = query.price;
  if('page' in query){
    delete query.page;
  }
  if(originPrice){
    if(query.price == '5000以上'){
      query.price = {
        '$gte':5000
      }
    }else {
      var compare = query.price.split('-');
      query.price = {
        '$lte':Number(compare[1]),
        '$gte':Number(compare[0])
      }
    }
  }
  console.log("query:");
  console.log(query);

  var render = EventProxy.create('pageManager', 'newArticles', function(pageManager, newArticles){
    if(originPrice){
      query.price = originPrice;
    }
    res.render('website/product_index', { title:'产品列表', pageManager:pageManager, products:pageManager.data, newArticles:newArticles, query:query } );
  });

  Article.get({}, 10, function(err, articles){
    render.emit('newArticles', articles);
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

exports.aboutus = function(req, res){
  res.render('website/aboutus', { title:'关于本店' })
}

exports.service = function(req, res){
  res.render('website/service', { title:'售后与保修' })
}


