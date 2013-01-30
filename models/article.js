var db = require('./db');
var lib = require('../lib')

function Article(data){
  var article = {};

  article.title = data.title;
  article.brand = data.content;
  article.create_at = new Date();
  article.count = 0;

  this.data = article;

}
module.exports = Article;

Article.prototype.save = function(callback){
  db.collection('article').insert(this.data, function(err, article){
    callback && callback(err, article);
  });
}

Article.count = function(callback){
  db.collection('article').count(function(err, count){
    callback && callback(err, count)
  });
}

Article.getOnePage = function(options, callback){
  db.collection('article').find({}).limit(options.limit).skip(options.skip).sort({create_at:-1}, function(err, articles){
    callback && callback(err, articles);
  })
}

Article.get = function(condition, callback){
  var id = lib.getDbId(condition);
  // 如果直接传id的话
  if(id){
    db.collection('article').findOne({_id:id}, function(err, article){
      callback && callback(err, article);
    });
  // 根据条件查询
  }else {
    db.collection('article').find(condition, function(err, articles){
      callback && callback(err, articles);
    });
  }
}

Article.update = function(id, data, callback){
  db.collection('article').update({_id:lib.getDbId(id)}, data, function(err, article){
      callback && callback(err, article);
  });
}

Article.delete = function(id, callback){
  db.collection('article').remove({_id:lib.getDbId(id)}, function(err, article){
    callback && callback(err, article);
  });
  // $todo:删除评论
}