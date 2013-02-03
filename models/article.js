var db = require('./db');
var lib = require('../lib');
var config = require('../config');

function Article(data){
  var article = {};
  for(var i in data){
    article[i] = data[i];
  }

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

Article.getOnePage = function(req, query, callback){
  lib.pages({
    req:req,
    limit:config.numPerPage,
    collection:'article',
    query:query
  }, function(pageManager){
    callback(pageManager)
  });
}

Article.get = function(query, limit, callback){
  var id = lib.getDbId(query);
  // 如果直接传id的话
  if(id){
    db.collection('article').findOne({_id:id}, function(err, article){
      callback && callback(err, article);
    });
  // 根据条件查询
  }else {
    db.collection('article').find(query).limit(0).sort({create_at:-1}, function(err, articles){
      callback && callback(err, articles);
    });
  }
}

Article.getHot = function(limit, callback){
  db.collection('article').find({}).limit(limit).sort({count:-1}, function(err, articles){
    callback && callback(err, articles);
  })
}

Article.update = function(id, data, callback){
  db.collection('article').update({_id:lib.getDbId(id)}, data, function(err, article){
      callback && callback(err, article);
  });
}

Article.delete = function(id, callback){
  id = lib.getDbId(id);
  db.collection('comment').remove({parent_id:id}, function(err,numberOfRemoved){
    console.log('相关'+numberOfRemoved+'条评论删除成功');
  })
  db.collection('article').remove({_id:id}, function(err, numberOfRemoved){
    callback && callback(err, numberOfRemoved);
  });
}