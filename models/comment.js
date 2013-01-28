var db = require('./db');

function Comment(data){
  data.create_at = new Date();
  data.parent_id = db.ObjectId(data.parent_id);

  this.data = data;
}
module.exports = Comment;

Comment.prototype.save = function(callback){
  db.collection("comment").insert(this.data, function(err, comment){
    callback(err, comment);
  });
}

Comment.get = function(condition, callback){
  // 如果直接传id的话
  if(typeof condition == "string"){
    if(condition.length != 24){
      callback(new Error("the length of id is not 24"));
      return;
    }
    db.collection('comment').findOne({_id:db.ObjectId(condition)}, function(err, comment){
      callback(err, comment);
    });
  // 根据条件查询
  }else {
    db.collection('comment').find(condition, function(err, comments){
      callback(err, comments);
    });
  }
}

Comment.getByParentId = function(id, callback){
  db.collection("comment").find({parent_id:db.ObjectId(id)}, function(err, comments){
    callback(err, comments);
  });
}

Comment.update = function(id, data, callback){
  db.collection("comment").update({_id:db.ObjectId(id)}, data, function(err, comments){
    callback(err, comments);
  });
}

Comment.delete = function(id, callback){
  db.collection('comment').remove({_id:db.ObjectId(id)}, function(err, comment){
    callback(err, comment);
  });
}