// console log
if(!window.console){
  window.console = {};
}
if(!console.log){
  console.log = function(){};
}
function trace(data){
  console.log(data);
}

// seajs config
var ENV = 'src';
trace('sea配置文件加载。');
seajs.config({
  alias:{
    '$':'jquery/1.8.3/jquery',
    'popWin':'/utilities/popWin/'+ENV+'/popWin',
    'slideShow':'/utilities/slideShow/'+ENV+'/slideShow',
    'path':'/utilities/path/'+ENV+'/path',
    'kindeditor':'/utilities/kindeditor/dist/kindeditor-debug',
    'fixedPos':'/utilities/fixedPos/'+ENV+'/fixedPos'
  }
});


// 一些页面常用事件和方法
seajs.use(['$'], function($){
  $(function(){
    $('body').on('click', '.delete_confirm', function(){
      if(!confirm('是否删除该项？')) return false;
    });
  });
});