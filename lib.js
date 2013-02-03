var db = require('./models/db');
var config = require('./config');
var EventProxy = require('eventproxy');

// from cnode lib.js

exports.formatDate = function (date, friendly) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  
  if (friendly) {
    var now = new Date();
    var mseconds = -(date.getTime() - now.getTime());
    var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
    if (mseconds < time_std[3]) {
      if (mseconds > 0 && mseconds < time_std[1]) {
        return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
      }
      if (mseconds > time_std[1] && mseconds < time_std[2]) {
        return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
      }
      if (mseconds > time_std[2]) {
        return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
      }
    }
  }
  
  //month = ((month < 10) ? '0' : '') + month;
  //day = ((day < 10) ? '0' : '') + day;
  hour = ((hour < 10) ? '0' : '') + hour;
  minute = ((minute < 10) ? '0' : '') + minute;
  second = ((second < 10) ? '0': '') + second;

  thisYear = new Date().getFullYear();
  year = (thisYear === year) ? '' : (year + '-');
  return year + month + '-' + day + ' ' + hour + ':' + minute;
};

exports.blankStr = function(obj){
  if(obj === undefined){
    return "";
  }
  return obj;
}

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html){
  var codeSpan = /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm;
  var codeBlock = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
  var spans = [];
  var blocks = [];
  var text = String(html).replace(/\r\n/g, '\n')
  .replace('/\r/g', '\n');
  
  text = '\n\n' + text + '\n\n';

  text = text.replace(codeSpan, function(code) {
    spans.push(code);
    return '`span`';
  });

  text += '~0';

  return text.replace(codeBlock, function (whole, code, nextChar) {
    blocks.push(code);
    return '\n\tblock' + nextChar;
  })
  .replace(/&(?!\w+;)/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/`span`/g, function() {
    return spans.shift();
  })
  .replace(/\n\tblock/g, function() {
    return blocks.shift();
  })
  .replace(/~0$/,'')
  .replace(/^\n\n/, '')
  .replace(/\n\n$/, '');
};

/**
 * 将数据库中字符串id转换为object形式
 *
 * @param {String|Object} id
 */
exports.getDbId = function(id){
  if(typeof id == 'object' && id.toString().length == 24){
    return id;
  }else if(typeof id == 'string' && id.length == 24){
    return db.ObjectId(id);
  }else {
    return false;
  }
}

/**
 * 页数管理
 *
 * @param {Object} options keys:req collection limit query
 * @param {Function} callback 
 */

exports.pages = function(options, callback){

  var currentPage = parseInt(options.req.query.page, 10) || 1,
      limit = options.limit,
      skip = (currentPage - 1) * limit,
      collection = options.collection,
      base = options.req.originalUrl.replace(/&page=\d+|\?page=\d+$/g,''),
      query = options.query ? options.query : {};

  var ep = EventProxy.create('count', 'data', function(count, data){
    console.log(count);
    var pageManager = {
      pages:Math.ceil(count / limit) || 1,
      currentPage:currentPage,
      base:base,
      data:data
    }
    callback && callback(pageManager);
  });

  db.collection(collection).find(query).count(function(err, count){
    ep.emit('count', count)
  });

  db.collection(collection).find(query).limit(limit).skip(skip).sort({create_at:-1}, function(err, data){
    ep.emit('data', data)
  });
}

/**
 * shadow copy
 *
 * @param {Object} 被复制的对象
 */

exports.copy = function(obj){
  var newObj = {};
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      newObj[i] = obj[i];
    }
  }
  return newObj;
}

