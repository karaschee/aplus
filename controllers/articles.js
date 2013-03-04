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
  res.render('console/article_edit', {title:'新增文章', article:{}, is_new:true});
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
  var body = req.body;
  
  Article.get(id, 1, function(err, article){
    for(var i in body){
      article[i] = body[i];
    }
    if(!article.is_top) article.is_top = '0'
    if(!article.show_in_home) article.show_in_home = '0'
    Article.update(id, article, function(err, article){
      res.redirect("/console/articles");
    });
  });
}

exports.delete = function(req, res){
  Article.delete(req.params.id, function(err, numOfRemoved){
    res.redirect('back');
  });
}