var util = require('util');
var Comment = require('../models/comment.js');

exports.save = function(req, res) {
  var collection = req.query.collection;
  var id = req.query.id, body = req.body, newc;
  body.parent_id = id;
  body.at = collection;

  newc = new Comment(body);
  newc.save(function(){
    res.redirect("/"+collection+"s/"+id);
  });
}

exports.getById = function(req, res, next, id) {
  Comment.get(id, function(err, comment){
    if (err) return next(err);
    if (!comment) return next(new Error('Comment loading failed'));
    req.result = comment;
    next();
  });
}

exports.delete = function(req, res){
  var comment = req.result;
  Comment.delete(req.params.commentid, function(err){
    res.redirect('back')
  });
}

exports.reply = function(req, res){
  var comment = req.result;
  var txt = req.body.content;
  comment.reply = txt;
  Comment.update(req.params.commentid, comment, function(err, comment){
    res.send(true);
    //res.redirect('/console/'+comment.at+'s/'+comment.parent_id+'/comments/')
  });
}