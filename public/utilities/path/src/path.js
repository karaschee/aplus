define(function(require, exports, module){
  function Path(href){
    if(typeof href == 'string'){
      this._href = href;
      //$todo
    }else {
      this._href = location.href;
      this.host = location.host;
      this.pathname = location.pathname;
      this.url = this._href.split('?')[0];
    }
    var str = this._href.split('?')[1];
    if(str){
      this._query = str.split('#')[0];
      this.cursor = str.split('#')[1];
      this.init();
    }else {
      this.data = {};
    }
  }

  Path.prototype.init = function(){
    var query = this._query;
    var params = query.split('&'), data = {};
    for(var i in params){
      var param = params[i].split('=')
      var key = param[0];
      var value = param[1];
      data[key] = value;
    }
    this.data = data;
  }

  Path.prototype.get = function(key){
    if(!key) return this.data;
    else return this.data[key];
  }

  Path.prototype.set = function(arg1, arg2){
    if(arguments.length === 1 && typeof arg1 == 'object'){
      this.data = arg1;
    }else {
      this.data[arg1] = arg2;
    }
  }

  Path.prototype.del = function(key){
    delete this.data[key];
  }

  Path.prototype.getQueryStr = function(){
    var arr = [], query;
    for(var key in this.data){
      var value = this.data[key];
      var param = key + '=' + value;
      arr.push(param);
    }
    return '?' + arr.join('&');
  }

  Path.prototype.getHref = function(){
    return this.url + this.getQueryStr();
  }

  module.exports = Path;
})