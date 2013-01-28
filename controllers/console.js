var util = require('util');
var Product = require('../models/product.js');
var Comment = require('../models/comment.js');

// Console Product

exports.products = function(req, res){
  Product.get({}, function(err, products){
    if(!err){
      //req.flash('error', 'not get any products.');
    }
    if(products.length == 0){
      //req.flash('error', 'no product');
    }
    res.render('console/product_index',{title:'产品列表', products:products});
  })
}

// 不论是product还是article，统一处理
exports.comments = function(req, res){
  if(req.query.id && req.query.title){  
    Comment.getByParentId(req.query.id, function(err, comments){
      res.render('console/comments', {title:req.query.title+' 的评论', comments:comments});
    });
  }else {
    Comment.get({}, function(err, comments){
      res.render('console/comments', {title:'所有评论', comments:comments});
    });
  }
}