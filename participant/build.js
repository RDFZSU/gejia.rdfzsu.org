var fs=require("fs");
var template=require("@alan-liang/utils/template");
var htmlTemplate=fs.readFileSync(__dirname+"/template.html").toString();
var files=fs.readFileSync(__dirname+"/data.json").toString();
var types={
  1:"歌赛(单人)",
  2:"歌赛(团队)",
  3:"舞赛(单人)",
  4:"舞赛(团队)",
  5:"Rap专场",
  0:"未知"
};
files=JSON.parse(files);

for (var i = 0; i < files.length; i++) {
  var d=files[i];
  d.imgid=d.hasimg?d.id:"default";
  d.typename=types[d.type]||types[0];
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
