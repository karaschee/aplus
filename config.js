module.exports = {
  name:"A+诚品手机官方网站",
  description: 'A+诚品手机, 成都手机诚信店!',
  siteLogo:"",

  db:"aplus",
  collection:["product", "article", "comment"],

  articlesPerPage:3,
  productsPerPage:3,
  numPerPage:3,

  product:{
    brand:{key:"品牌",multiple:false,data:["其它","三星","LG","摩托罗拉","诺基亚","夏普","苹果","索尼","魅族","酷派","OPPO","联想","步步高","小米","黑莓","天语","HTC","华为","中兴","港利通"]},
    type:{key:"类型",multiple:true,data:["其它","4G","3G","千元智能","拍照手机","多核智能","拍照手机","高清屏幕","四核旗舰","平板","商务","三防","音乐","时尚","电视","老人","儿童","女性","女性智能"]},
    design:{key:"机身设计",multiple:false,data:["其它","直板","翻盖","滑盖","侧滑盖","旋转屏"]},
    size:{key:"屏幕尺寸",multiple:false,data:["其它","3.0","3.3","3.5","3.7","4.0","4.3","4.5","4.8","5.0","5.3","5.5"]},
    touch:{key:"触控",multiple:false,data:["其它","单点触控","两点触控","多点触控","电阻屏"]},
    mode:{key:"网络类型",multiple:false,data:["其它","单卡双模","单卡多模","双卡单模","双卡双模"]},
    net:{key:"网络制式",multiple:true,data:["其它","4G网络","GSM","WCDMA","CDMA2000","TD-SCDMA"]}
  }
}