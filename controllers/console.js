var Product = require('../models/product.js');
var Comment = require('../models/comment.js');
var Article = require('../models/article.js');
var Accessory = require('../models/accessory.js');
var db = require('../models/db.js');
var lib = require('../lib');
var EventProxy = require('eventproxy')

// Console Product

exports.products = function(req, res){
  Product.getOnePage(req, {}, function(pageManager){
    res.render('console/product_index',{title:'产品列表', products:pageManager.data, pageManager:pageManager});
  });
}

exports.accessories = function(req, res){
  Accessory.getOnePage(req, {}, function(pageManager){
    res.render('console/accessory_index',{title:'产品列表', accessories:pageManager.data, pageManager:pageManager});
  });
}

exports.articles = function(req, res){
  Article.getOnePage(req, {}, function(pageManager){
    res.render('console/article_index',{title:'文章列表', articles:pageManager.data, pageManager:pageManager});
  });
}

// 统一处理
exports.comments = function(req, res){
  var parent = req.result;
  var collection = req.collection;
  var parentUrl = '/' + collection + 's/' + parent._id;

  Comment.getOnePage(req, {parent_id:parent._id}, function(pageManager){
    res.render('console/comment_index', {title:parent.title + ' 的评论', comments:pageManager.data, parent:parent, parentUrl:parentUrl, pageManager:pageManager});
  });

}

exports.allComments = function(req, res){
  var count = 0;
  Comment.getOnePage(req, {}, function(pageManager){
    var comments = pageManager.data;
    var render = function(){
      res.render('console/comment_index', {title:'所有评论', comments:comments, parent:false, parentUrl:false, pageManager:pageManager});
    }
    if(comments.length === 0){
      render();
    }else {
      for(var i in comments){
        var comment = comments[i];
        (function(comment){
          db.collection(comment.at).findOne({_id:comment.parent_id}, function(err, parent){
            comment.parent = parent;
            if(count++ === comments.length - 1){
              console.log(comments);
              render();
            }
          })
        })(comment);
      }
    }
  });
}

exports.ad = function(req, res){
  res.render('console/ad', {title:'编辑广告'})
}

exports.slide = function(req, res){
  res.render('console/slide', {title:'编辑动态滚动栏'})
}
exports.slideGetData = function(req, res){
  db.collection('feature').findOne({type:'slide'}, function(err, element){
    var slides = element ? element.content : [];
    res.send(slides);
  })
}
exports.slideSave = function(req, res){
  console.log(req.body);
  var data = {
    type:'slide',
    content:req.body.slides
  }
  db.collection('feature').update({type:"slide"}, data, {upsert: true}, function(err, element){
    console.log('congratulation! slide update!');
    res.send("success!");
  });
}

exports.bulletin = function(req, res){
  db.collection('feature').findOne({type:"bulletin"}, function(err, element){
    var bulletin = element ? element.content : {};
    res.render('console/bulletin', {title:'编辑公告栏', bulletin:bulletin})
  })
}
exports.bulletinSave = function(req, res){
  var body = req.body;
  var data = {
    type:"bulletin",
    content:body
  }
  db.collection('feature').update({type:"bulletin"}, data, {upsert: true}, function(err, element){
    console.log('congratulation! bulletin update!');
    res.redirect('/console/bulletin');
  });
}