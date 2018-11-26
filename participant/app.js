var types={
  1:"歌赛（初中场）",
  2:"歌赛（高中场）",
  3:"歌赛（rap场）",
  4:"舞赛",
  5:"歌赛 Battle战",
  6:"歌赛 车轮战",
  0:"未知"
};

var setHtml=function(rand,sel){
  var html="";
  for(var i=0;i<rand.length;i++){
    var el=rand[i];
    el.imgid=el.hasimg?el.id:"default";
    el.typename=types[el.type]||types[0];
    if(el.isRound2){
      html+=processTemplate(round2Template,el);
    }else{
      html+=processTemplate(template,el);
    }
  }
  $(sel).html(html);
  paginationTo(document.querySelector(sel));
};

function shuffle(arr,count){
  arr=arr.slice();
  count=count||arr.length;
  var res=[];
  for(;count>0;count--){
    var id=parseInt(Math.random()*arr.length);
    res.push(arr[id]);
    arr.splice(id,1);
  }
  return res;
}

function genNames(data){
  var names=window.names=[data];
  names.battle=[];
  names.wheel=[];
  var sing=names[1]=[];
  var dance=names[2]=[];
  var round1=[];
  for(var i=0;i<data.length;i++){
    switch(parseInt(data[i].type)){
      case 1:
      case 2:
      case 3:
      sing.push(data[i]);
      round1.push(data[i]);
      break;

      case 4:
      dance.push(data[i]);
      round1.push(data[i]);
    }
    if(data[i].type===5) names.battle.push(data[i]);
    if(data[i].type===6) names.wheel.push(data[i]);
  }
  names[0]=round1;

}

var rand=function(){
  var load=function(data){
    window.template=$("#participant-template").html();
    window.round2Template=$("#round2-template").html();
    if(!window.names){
      genNames(data);
      $("#search").off("keyup");
      $("#search").on("keyup",function(){
        var key=$("#search").val().toLowerCase();
        if(key=="") return rand();
        var result=[];
        var data=window.names[new mdui.Tab($("#participant-selection")).activeIndex];
        for(var i=0;i<data.length;i++){
          if(data[i].isRound2) continue;
          if(data[i].name.toLowerCase().indexOf(key)>-1||
             data[i].id.toLowerCase().indexOf(key)>-1||
             data[i]["with"].toLowerCase().indexOf(key)>-1)
             result.push(data[i]);
        }
        if(result.length!=0) return setHtml(result,"#main");
        else $("#main").html("无结果");
      });
    }
    data=window.names[new mdui.Tab($("#participant-selection")).activeIndex];
    var random=shuffle(data,18);
    setHtml(random,"#main");


    var battle=window.names.battle;
    setHtml(battle,"#battle");
    setHtml(window.names.wheel,"#wheel");
  };

  if(!window.names) $.ajax({
    success:load,
    url:"/participant/data.min.json",
    dataType:"json"
  });
  else load();

};

window.onload=function(){
  window.$=mdui.JQ;
  var sel=$("#participant-selection");
  sel.on("click",rand);
  rand();
  $("#round-selection").on("change.mdui.tab",function(){
    setTimeout(function(){
      new mdui.Tab($("#participant-selection")).handleUpdate();
    },0);
  });
};
