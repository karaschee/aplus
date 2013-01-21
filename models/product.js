var db = require('./db');

function Product(data){
  var product = {};

  product.name = data.name;
  product.brand = data.brand;
  product.image = data.image;
  product.introduce = data.introduce;
  
  product.params = {};
  product.params.color = data.color;

  this.data = product;

}
module.exports = Product;

Product.prototype.save = function(callback){
  db.product.insert(this.data, function(err, product){
    callback(err, product);
  });
}

Product.get = function(condition, callback){
  // 如果直接传id的话
  if(typeof condition == "string"){
    var id = condition;
    if(id.length != 24){
      callback(new Error("the length of id is not 24"));
      return;
    }
    db.product.findOne({_id:db.ObjectId(id)}, function(err, product){
      callback(err, product);
    });

  }else {
    db.product.find(condition, function(err, products){
      callback(err, products);
    });
  }
}

Product.update = function(id, data, callback){
  db.product.update({ _id: db.ObjectId(id)}, data, function(err, product){
      callback(err, product);
  });
}

Product.delete = function(id, callback){
  db.product.remove({_id:db.ObjectId(id)}, function(err, product){
    callback(err, product);
  });
}