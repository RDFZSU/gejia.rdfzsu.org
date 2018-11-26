var parseCsv=require("csv-parse/lib/sync");
var fs=require("fs");

var csvFile=fs.readFileSync(__dirname+"/data.csv").toString();
var data=parseCsv(csvFile,{comment:"//"});
var obj=[];

var types={
  "歌赛（初中场）":1,
  "歌赛（高中场）":2,
  "歌赛（rap场）":3,
  "舞赛":4,
  "歌赛（Battle战）":5,
  "歌赛（车轮战）":6
};

var getType=el=>types[el[2]]||0;
data.forEach(el=>{
  obj.push({
    name:el[0],
    "class":el[1],
    type:getType(el),
    id:el[9],
    intro:el[10],
    hasimg:el[11],
    video:el[12]||"暂无视频",
    date:[el[13],el[14]],
    "with":el[16]==" "?"单人参赛":el[16]||"单人参赛",
    done:el[15],
    isRound2:el[17]
  });
});

//cut down size of browser-fetched data.min.json
var forBrowser=[];
obj.forEach(el=>{
  forBrowser.push({
    name:el.name,
    "class":el.class,
    type:el.type,
    id:el.id,
    hasimg:el.hasimg,
    "with":el["with"],
    isRound2:el.isRound2
  });
});

fs.writeFileSync(__dirname+"/participant/data.json",JSON.stringify(obj));
fs.writeFileSync(__dirname+"/participant/data.min.json",JSON.stringify(forBrowser));

console.log("data.json generated.");
