var util = require('util');
var Product = require('../models/product.js');

// Console Product

exports.getProductById = function(req, res, next, id) {
  Product.get(id, function(err, result){
    if (err) return next(err);
    if (!result) return next(new Error('Post loading failed'));
    req.product = result;
    next();
  });
}

exports.product_index = function(req, res){
  Product.get({}, function(err, products){
    if(!err){
      //req.flash('error', 'not get any products.');
    }
    if(products.length == 0){
      //req.flash('error', 'no product');
    }
    res.render('console/product_index',{title:'A+后台管理中心', products:products});
  })
}

exports.product_new = function(req, res){
  res.render('console/product_edit', {title:'新增产品', product:{params:{}}, is_new:true});
}

exports.product_new_save = function(req, res){
  var image = req.files.image, data = req.body;
  if(image.size === 0){
    // 删除图片
    data.image = "";
  }else {
    data.image = image.path;
  }

  console.log(util.inspect(image));
  var newProduct = new Product(data);
  newProduct.save(function(err, product){
    console.log(err, product);
    res.redirect('/console');
  });
}

exports.product_edit = function(req, res){
  res.render('console/product_edit',{title:'编辑产品', product:req.product, is_new:false});
}

exports.product_edit_save = function(req, res){
  var id = req.params.productid;
  var image = req.files.image, body = req.body;

  if(image.size === 0){
    // 删除图片
    body.image = body.mark_image;
  }else {
    body.image = image.path;
  }

  var newp = new Product(body);
  Product.update(id, newp.data, function(err, product){
    res.redirect("/console/product");
  });

}

exports.product_delete = function(req, res){
  Product.delete(req.params.productid, function(err, fields){
    res.redirect('console/product');
  });
}