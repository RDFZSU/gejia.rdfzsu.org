var fs=require("fs");
var template=require("@alan-liang/utils/template");
var files="index.origin.html|test/index.origin.html|register/index.origin.html|participant/template.origin.html|participant/index.origin.html|404.origin.html|timeline/index.origin.html".split("|");
var htmlTemplate=fs.readFileSync(__dirname+"/template.html").toString();

//build data.json
require("./build-data");

//build timeline first
require("./timeline/build");

for (var i = 0; i < files.length; i++) {
  var f=fs.readFileSync(__dirname+"/"+files[i]).toString();
  var lines=f.split("\n");
  var title=lines.shift().replace("\r","");
  var content=lines.join("\n");
  var s=template(htmlTemplate,{
    title,
    content
  });
  var note=`<!--
  DO NOT MODIFY
  Generated by a automated script.
  Edit ${files[i]} and run 'node build' instead.

  Copyright 2018 RDFZSU. All Rights Reserved.
  -->
  `;
  s=note+s;
  fs.writeFileSync(files[i].replace(".origin.html",".html"),s);
  console.log(`${files[i]} generated.`);
}

//build participants
if(process.argv[2]=="--build-participants")
  require("./participant/build");
else console.log("[WARN] participants not building. use cli option `--build-participants` to build them.");
