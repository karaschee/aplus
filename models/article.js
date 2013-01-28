var db = require('./db');

function Article(data){
  var article = {};

  article.title = data.title;
  article.brand = data.content;
  article.create_at = new Date();

  this.data = article;

}
module.exports = Article;

Article.prototype.save = function(callback){
  db.collection('article').insert(this.data, function(err, article){
    callback(err, article);
  });
}

Article.get = function(condition, callback){
  // 如果直接传id的话
  if(typeof condition == "string"){
    if(condition.length != 24){
      callback(new Error("the length of id is not 24"));
      return;
    }
    db.collection('article').findOne({_id:db.ObjectId(condition)}, function(err, article){
      callback(err, article);
    });
  // 根据条件查询
  }else {
    db.collection('article').find(condition, function(err, articles){
      callback(err, articles);
    });
  }
}

Article.update = function(id, data, callback){
  db.collection('article').update({ _id: db.ObjectId(id)}, data, function(err, article){
      callback(err, article);
  });
}

Article.delete = function(id, callback){
  db.collection('article').remove({_id:db.ObjectId(id)}, function(err, article){
    callback(err, article);
  });
  // $todo:删除评论
}