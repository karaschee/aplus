var ENV = 'src';
console.log('sea配置文件加载。');
seajs.config({
  alias:{
    '$':'jquery/1.8.3/jquery',
    'popWin':'/utilities/popWin/'+ENV+'/popWin'
  }
});
