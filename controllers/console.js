var Product = require('../models/product.js');
var Comment = require('../models/comment.js');
var Article = require('../models/article.js');
var db = require('../models/db.js');

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

exports.articles = function(req, res){
  Article.get({}, function(err, articles){
    res.render('console/article_index',{title:'文章列表', articles:articles});
  })
}

// 统一处理
exports.comments = function(req, res){
  var parent = req.result;
  var collection = req.collection;
  var parentUrl = '/' + collection + 's/' + parent._id;
  Comment.getByParentId(parent._id, function(err, comments){
    res.render('console/comment_index', {title:parent.title + ' 的评论', comments:comments, parent:parent, parentUrl:parentUrl});
  });

}

exports.allComments = function(req, res){
  var count = 0;
  Comment.get({}, function(err, comments){
    for(var i in comments){
      var comment = comments[i];
      (function(comment){
        db.collection(comment.at).findOne({_id:comment.parent_id}, function(err, parent){
          comment.parent = parent;
          if(count++ === comments.length - 1){
            console.log(comments);
            res.render('console/comment_index', {title:'所有评论', comments:comments, parent:false, parentUrl:false});
          }
        })
      })(comment);
    }
  });
}