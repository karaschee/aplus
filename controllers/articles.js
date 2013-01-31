var util = require('util');
var Article = require('../models/article.js');

exports.getById = function(req, res, next, id) {
  Article.get(id, 0, function(err, article){
    if (err) return next(err);
    if (!article) return next(new Error('Post loading failed'));
    req.result = article;
    req.collection = 'article';
    next();
  });
}

exports.new = function(req, res){
  res.render('console/article_edit', {title:'新增文章', article:{params:{}}, is_new:true});
}

exports.save = function(req, res){
  var data = req.body;

  var newArticle = new Article(data);
  newArticle.save(function(err, article){
    console.log(err, article);
    res.redirect('/console/articles');
  });
}

exports.edit = function(req, res){
  res.render('console/article_edit',{title:'编辑文章', article:req.result, is_new:false});
}

exports.update = function(req, res){
  var id = req.params.articleid;
  var image = req.files.image, body = req.body;

  if(image.size === 0){
    // 删除图片
    body.image = body.mark_image;
  }else {
    body.image = "/" + image.path;
  }

  var newp = new Article(body);
  Article.update(id, newp.data, function(err, article){
    res.redirect("/console/articles");
  });

}

exports.delete = function(req, res){
  Article.delete(req.params.id, function(err, fields){
    res.redirect('back');
  });
}