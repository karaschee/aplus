var db = require('./db');
var lib = require('../lib')

function Product(data){
  var product = {};

  product.title = data.title;
  product.brand = data.brand;
  product.image = data.image;
  product.introduce = data.introduce;
  product.create_at = new Date();
  product.count = 0;

  product.params = {};
  product.params.color = data.color;

  this.data = product;

}
module.exports = Product;

Product.prototype.save = function(callback){
  db.product.insert(this.data, function(err, product){
    callback && callback(err, product);
  });
}

Product.get = function(condition, callback){
  var id = lib.getDbId(condition);
  // 如果直接传id的话
  if(id){
    db.product.findOne({_id:id}, function(err, product){
      callback && callback(err, product);
    });
  // 根据条件查询
  }else {
    db.product.find(condition, function(err, products){
      callback && callback(err, products);
    });
  }
}

Product.update = function(id, data, callback){
  db.product.update({ _id:lib.getDbId(id)}, data, function(err, product){
      callback && callback(err, product);
  });
}

Product.delete = function(id, callback){
  db.product.remove({_id:lib.getDbId(id)}, function(err, product){
    callback && callback(err, product);
  });
  
  // $todo:删除图片\评论
}