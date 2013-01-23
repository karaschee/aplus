var util = require('util');
var Comment = require('../models/comment.js');

exports.save = function(req, res) {
  var collection = req.params.collection.slice(0, -1);
  var id = req.params.id, body = req.body, newc;
  body.parent_id = id;
  body.at = collection;

  newc = new Comment(body);
  newc.save(function(){
    res.redirect("/"+req.params.collection+"/"+id);
  });
}