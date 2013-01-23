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

Comment.getByParentId = function(id, callback){
  db.collection("comment").find({parent_id:id}, function(err, comments){
    callback(err, comments);
  });
}