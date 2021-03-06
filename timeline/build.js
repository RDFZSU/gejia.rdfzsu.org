var fs=require("fs");
var template=require("@alan-liang/utils/template");

var htmlTemplate=fs.readFileSync(__dirname+"/index.origin.origin.html").toString();
var participantTemplate=fs.readFileSync(__dirname+"/participant-template.html").toString();
var participantsTemplate=fs.readFileSync(__dirname+"/participants-template.html").toString();
var round2Template=fs.readFileSync(__dirname+"/round2-template.html").toString();
var data=fs.readFileSync(__dirname+"/../participant/data.json").toString();
data=JSON.parse(data);

var types={
  1:"歌赛（初中场）",
  2:"歌赛（高中场）",
  3:"歌赛（rap场）",
  4:"舞赛",
  5:"歌赛 Battle战",
  6:"歌赛 车轮战",
  7:"总决赛",
  0:"未知"
};

var datesDone={},datesUndone={};
data.forEach(el=>{
  var date=el.date.join("/");
  var dates=datesUndone;
  if(el.done) dates=datesDone;
  dates[date]=dates[date]||[];
  dates[date].push(el);
});

var isSinger=el=>el.type==1||el.type==2||el.type==3;
var isDancer=el=>el.type==4;

var processDates=(dates_,reverse)=>{
  var html="";
  var dates__=[];
  for(var date in dates_){
    dates__.push([date,dates_[date],dates_[date][0].date]);
  }
  dates__=dates__.sort((a,b)=>{
    return (reverse?-1:1)*((a[2][0]-b[2][0])*1000+(a[2][1]-b[2][1]));
  });
  dates__.forEach(el=>{
    var dates=el[1];
    var date=el[0];
    if(!dates) return console.log(el);
    var singers=[],dancers=[],battlers=[],wheels=[],finals=[];
    dates.forEach(el=>{
      el.imgid=el.hasimg?el.id:"default";
      el.typename=types[el.type]||types[0];
      if(isSinger(el)) singers.push(el);
      else if(isDancer(el)) dancers.push(el);
      else if(el.type===5) battlers.push(el);
      else if(el.type===6) wheels.push(el);
      else if(el.type===7) finals.push(el);
    });
    // FIXME: Copy-and-Paste code leads to inreadability
    if(singers.length>0){
      // FIXME: Use templates!!!
      html+=`<h2 class="mdui-typo-subheading">${date}:歌赛</h2><hr />`;
      var singersHtml="";
      singers.forEach((el)=>{
        singersHtml+=template(participantTemplate,el);
      });
      html+=template(participantsTemplate,{html:singersHtml});
    }
    if(dancers.length>0){
      // FIXME: Use templates!!!
      html+=`<h2 class="mdui-typo-subheading">${date}:舞赛</h2><hr />`;
      var dancersHtml="";
      dancers.forEach((el)=>{
        dancersHtml+=template(participantTemplate,el);
      });
      html+=template(participantsTemplate,{html:dancersHtml});
    }
    if(battlers.length>0){
      html+=`<h2 class="mdui-typo-subheading">${date}:Battle战</h2><hr />`;
      var battlersHtml="";
      battlers.forEach((el)=>{
        battlersHtml+=template(round2Template,el);
      });
      html+=template(participantsTemplate,{html:battlersHtml});
    }
    if(wheels.length>0){
      html+=`<h2 class="mdui-typo-subheading">${date}:车轮战</h2><hr />`;
      var wheelsHtml="";
      wheels.forEach((el)=>{
        wheelsHtml+=template(round2Template,el);
      });
      html+=template(participantsTemplate,{html:wheelsHtml});
    }
    if(finals.length>0){
      html+=`<h2 class="mdui-typo-subheading">${date}:总决赛</h2><hr />`;
      var finalsHtml="";
      finals.forEach((el)=>{
        finalsHtml+=template(round2Template,el);
      });
      html+=template(participantsTemplate,{html:finalsHtml});
    }
  });
  return html;
};

fs.writeFileSync(__dirname+"/index.origin.html",template(htmlTemplate,{
  done:processDates(datesDone,true),
  undone:processDates(datesUndone,false)
}));

console.log("timeline generated.");
