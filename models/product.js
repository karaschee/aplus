var db = require('./db');
var lib = require('../lib')
var config = require('../config')
var fs = require('fs')

function Product(data){
  var product = data;

  product.introduce = data.introduce;
  product.create_at = new Date();
  product.count = 0;

  this.data = product;

}
module.exports = Product;

Product.prototype.save = function(callback){
  db.product.insert(this.data, function(err, product){
    callback && callback(err, product);
  });
}

Product.get = function(query, limit, callback){
  var id = lib.getDbId(query);
  // 如果直接传id的话
  if(id){
    db.product.findOne({_id:id}, function(err, product){
      callback && callback(err, product);
    });
  // 根据条件查询
  }else {
    db.product.find(query).limit(limit).sort({create_at:-1}, function(err, products){
      callback && callback(err, products);
    });
  }
}

Product.getOnePage = function(req, query, callback){
  lib.pages({
    req:req,
    limit:config.numPerPage,
    collection:'product',
    query:query
  }, function(pageManager){
    callback(pageManager)
  });
}

Product.getHot = function(limit, callback){
  db.collection('product').find({}).limit(limit).sort({count:-1}, function(err, products){
    callback && callback(err, products);
  })
}

Product.update = function(id, data, callback){
  db.product.update({ _id:lib.getDbId(id)}, data, function(err, product){
      callback && callback(err, product);
  });
}

Product.delete = function(id, callback){
  id = lib.getDbId(id);
  db.collection('comment').remove({parent_id:id}, function(err,numberOfRemoved){
    console.log('相关'+numberOfRemoved+'条评论删除成功');
  })
  db.product.findOne({_id:id}, function(err, product){
    fs.unlink(__dirname.replace('/models','')+product.image, function(err){
      if(!err){
        console.log('相关图片已经删除');
      }
    })
    db.product.remove({_id:id}, function(err, numberOfRemoved){
      console.log('删除的产品数：'+numberOfRemoved);
      callback && callback(err, numberOfRemoved);
    });
  })
}