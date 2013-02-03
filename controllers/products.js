var util = require('util');
var Product = require('../models/product.js');

exports.getById = function(req, res, next, id) {
  Product.get(id, 0, function(err, product){
    if (err) return next(err);
    if (!product) return next(new Error('Post loading failed'));
    req.result = product;
    req.collection = 'product';
    next();
  });
}

exports.new = function(req, res){
  res.render('console/product_edit', {title:'新增产品', product:{params:{}}, is_new:true});
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
  var newProduct = new Product(data);
  newProduct.save(function(err, product){
    console.log(err, product);
    res.redirect('/console/products');
  });
}

exports.edit = function(req, res){
  res.render('console/product_edit',{title:'编辑产品', product:req.result, is_new:false});
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

  Product.get(id, 1, function(err, product){
    for(var i in data){
      product[i] = data[i];
    }
    Product.update(id, product, function(err, product){
      res.redirect("/console/products");
    });
  });
}

exports.delete = function(req, res){
  Product.delete(req.params.id, function(err, fields){
    res.redirect('back');
  });
}