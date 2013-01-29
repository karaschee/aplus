var db = require('./db');
var lib = require('../lib')

function Comment(data){
  data.create_at = new Date();
  data.parent_id = db.ObjectId(data.parent_id);

  this.data = data;
}
module.exports = Comment;

Comment.prototype.save = function(callback){
  db.collection("comment").insert(this.data, function(err, comment){
    callback && callback(err, comment);
  });
}

Comment.get = function(condition, callback){
  var id = lib.getDbId(condition);
  // 如果直接传id的话
  if(id){
    db.collection('comment').findOne({_id:id}, function(err, comment){
      callback && callback(err, comment);
    });
  // 根据条件查询
  }else {
    db.collection('comment').find(condition).sort({create_at:-1}, function(err, comments){
      callback && callback(err, comments);
    });
  }
}

Comment.getByParentId = function(id, callback){
  db.collection("comment").find({parent_id:lib.getDbId(id)}).sort({create_at:-1}, function(err, comments){
    callback && callback(err, comments);
  });
}

Comment.update = function(id, data, callback){
  db.collection("comment").update({_id:db.ObjectId(id)}, data, function(err, comments){
    callback && callback(err, comments);
  });
}

Comment.delete = function(id, callback){
  db.collection('comment').remove({_id:db.ObjectId(id)}, function(err, comment){
    callback && callback(err, comment);
  });
}