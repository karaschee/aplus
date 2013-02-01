var ENV = 'src';
trace('sea配置文件加载。');
seajs.config({
  alias:{
    '$':'jquery/1.8.3/jquery',
    'popWin':'/utilities/popWin/'+ENV+'/popWin',
    'slideShow':'/utilities/slideShow/'+ENV+'/slideShow',
  }
});

function trace(data){
  console && console.log(data);
}


// 一些页面常用事件和方法
seajs.use(['$'], function($){
  $(function(){
    $('body').on('click', '.delete_confirm', function(){
      if(!confirm('是否删除该项？')) return false;
    });
  });
});