var fs=require("fs");
var template=require("@alan-liang/utils/template");

var htmlTemplate=fs.readFileSync(__dirname+"/index.origin.origin.html").toString();
var participantTemplate=fs.readFileSync(__dirname+"/participant-template.html").toString();
var participantsTemplate=fs.readFileSync(__dirname+"/participants-template.html").toString();
var data=fs.readFileSync(__dirname+"/../participant/data.json").toString();
data=JSON.parse(data);

var types={
  1:"歌赛(单人)",
  2:"歌赛(团队)",
  3:"舞赛(单人)",
  4:"舞赛(团队)",
  5:"Rap专场",
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

var isSinger=el=>el.type==1||el.type==2||el.type==5;
var isDancer=el=>el.type==3||el.type==4;

var processDates=dates_=>{
  var html="";
  var dates__=[];
  for(var date in dates_){
    dates__.push([date,dates_[date],dates_[date][0].date]);
  }
  dates__=dates__.sort((a,b)=>{
    return (a[2][0]-b[2][0])*1000+(a[2][1]-b[2][1]);
  });
  dates__.forEach(el=>{
    var dates=el[1];
    var date=el[0];
    if(!dates) return console.log(el);
    var singers=[],dancers=[];
    dates.forEach(el=>{
      el.imgid=el.hasimg?el.id:"default";
      el.typename=types[el.type]||types[0];
      if(isSinger(el)) singers.push(el);
      else if(isDancer(el)) dancers.push(el);
    });
    // TODO:
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
  });
  return html;
};

fs.writeFileSync(__dirname+"/index.origin.html",template(htmlTemplate,{
  done:processDates(datesDone),
  undone:processDates(datesUndone)
}));

console.log("timeline generated.");
