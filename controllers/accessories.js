var util = require('util');
var Accessory = require('../models/accessory.js');

exports.getById = function(req, res, next, id) {
  Accessory.get(id, 0, function(err, accessory){
    if (err) return next(err);
    if (!accessory) return next(new Error('Post loading failed'));
    req.result = accessory;
    req.collection = 'accessory';
    next();
  });
}

exports.new = function(req, res){
  res.render('console/accessory_edit', {title:'新增配件', accessory:{}, is_new:true});
}

exports.save = function(req, res){
  var image = req.files.image, data = req.body;
  if(image.size === 0){
    // 删除图片
    data.image = "";
  }else {
    data.image = "/" + image.path;
  }
  data.price = Number(data.price);

  //console.log(util.inspect(image));
  var newAccessory = new Accessory(data);
  newAccessory.save(function(err, product){
    console.log(err, product);
    res.redirect('/console/accessories');
  });
}

exports.edit = function(req, res){
  res.render('console/accessory_edit',{title:'编辑配件', accessory:req.result, is_new:false});
}

exports.update = function(req, res){
  var id = req.params.productid;
  var image = req.files.image, data = req.body;

  if(image.size === 0){
    data.image = data.mark_image;
  }else {
    data.image = "/" + image.path;
  }
  data.price = Number(data.price);

  Accessory.get(id, 1, function(err, product){
    for(var i in data){
      product[i] = data[i];
    }
    Accessory.update(id, product, function(err, product){
      res.redirect("/console/accessories");
    });
  });
}

exports.delete = function(req, res){
  Accessory.delete(req.params.id, function(err, numOfRemoved){
    res.redirect('back');
  });
}