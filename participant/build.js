var fs=require("fs");
var template=require("@alan-liang/utils/template");
var htmlTemplate=fs.readFileSync(__dirname+"/template.html").toString();
var files=fs.readFileSync(__dirname+"/data.json").toString();
var types={
  1:"歌赛（初中场）",
  2:"歌赛（高中场）",
  3:"歌赛（rap场）",
  4:"舞赛",
  5:"歌赛 Battle战",
  6:"歌赛 车轮战",
  0:"未知"
};
files=JSON.parse(files);

for (var i = 0; i < files.length; i++) {
  var d=files[i];
  d.imgid=d.hasimg?d.id:"default";
  d.typename=types[d.type]||types[0];
  d.dateString=`${d.date[0]}月${d.date[1]}日`;
  d.idString=d.isRound2?d.type===5?"Battle战":"车轮战":d.id[0];
  // FIXME:
  if(d.intro!="暂无介绍"){
    d.intro=`《${d.intro}》`;
  }
  var s=template(htmlTemplate,d);
  var note=`<!--
  DO NOT MODIFY
  Generated by a automated script.
  Edit data.json and run 'node build' instead.

  Copyright 2018 RDFZSU. All Rights Reserved.
  -->
  `;
  s=note+s;
  try{
    fs.mkdirSync(__dirname+"/"+files[i].id);
  }catch(e){}
  fs.writeFileSync(__dirname+"/"+files[i].id+"/index.html",s);
}

console.log("participants generated.");
