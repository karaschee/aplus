var db = require('./db');
var lib = require('../lib');
var config = require('../config');
var fs = require('fs');

function Accessory(data){
  var accessory = {};
  for(var i in data){
    accessory[i] = data[i];
  }

  accessory.create_at = new Date();
  accessory.count = 0;

  this.data = accessory;

}
module.exports = Accessory;

Accessory.prototype.save = function(callback){
  db.collection('accessory').insert(this.data, function(err, accessory){
    callback && callback(err, accessory);
  });
}

Accessory.getOnePage = function(req, query, callback){
  lib.pages({
    req:req,
    limit:config.numPerPage,
    collection:'accessory',
    query:query
  }, function(pageManager){
    callback(pageManager)
  });
}

Accessory.get = function(query, limit, callback){
  var id = lib.getDbId(query);
  // 如果直接传id的话
  if(id){
    db.collection('accessory').findOne({_id:id}, function(err, accessory){
      callback && callback(err, accessory);
    });
  // 根据条件查询
  }else {
    db.collection('accessory').find(query).limit(limit).sort({create_at:-1}, function(err, accessories){
      callback && callback(err, accessories);
    });
  }
}

Accessory.update = function(id, data, callback){
  db.collection('accessory').update({_id:lib.getDbId(id)}, data, function(err, accessory){
      callback && callback(err, accessory);
  });
}

Accessory.delete = function(id, callback){
  id = lib.getDbId(id);
  db.collection('comment').remove({parent_id:id}, function(err,numberOfRemoved){
    console.log('相关'+numberOfRemoved+'条评论删除成功');
  })
  db.collection('accessory').findOne({_id:id}, function(err, accessory){
    fs.unlink(__dirname.replace('/models','')+accessory.image, function(err){
      if(!err){
        console.log('相关图片已经删除');
      }
    })
    db.collection('accessory').remove({_id:id}, function(err, numberOfRemoved){
      console.log('删除的产品数：'+numberOfRemoved);
      callback && callback(err, numberOfRemoved);
    });
  })
}