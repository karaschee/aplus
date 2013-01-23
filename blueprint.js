product collection:

{
  title:"最新iphone5更轻更薄更长",//自填
  name:"iphone5",//自填
  brand:"苹果",//单选
  net:["GSM","CDMA","电信3G","联通3G","移动3G"],//多选
  OS:"ios",
  price:4600, //自填
  introduce:"html code",//自填
  params：{ //可选
    color："白色和黑色",
    camera：800, //单选
    type:"直板",
  },
  create_at:Date object,
  update_at:Date object
}

comments collection:

[
  {
    at:"product", // product or article column name
    parent_id:ObjectId(id),
    user:"jiangche", 
    email:"234234234@qq.com",
    content:"这个还有货吗？",
    reply:{
      content:"没有了。",
      create_at:Date object,
      update_at:Date object
    },
    create_at:Date object,
    update_at:Date object
  },
  ...
]

product.params collection:（only one doument）

{
  brand:["苹果", "HTC", ... , "其它"],
  net:["GSM","CDMA","电信3G","联通3G","移动3G"],
  camera:[100,200,300,400,500,600,700,800,900, ..., "其它像素"],
  os:["ios", "android", ..., "其它"]
}

article collection:

{
  title:"本店新开张，欢迎光临",
  keyword:["news","public"]//自填
  content:"html code",
  create_at:Date object,
}
