var types={
  1:"歌赛(单人)",
  2:"歌赛(团队)",
  3:"舞赛(单人)",
  4:"舞赛(团队)",
  5:"Rap专场",
  0:"未知"
};

var setHtml=function(rand){
  var html="";
  for(var i=0;i<rand.length;i++){
    var el=rand[i];
    el.imgid=el.hasimg?el.id:"default";
    el.typename=types[el.type]||types[0];
    html+=processTemplate(template,el);
  }
  $("#main").html(html);
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
  var sing=names[1]=[];
  var dance=names[2]=[];
  for(var i=0;i<data.length;i++){
    switch(parseInt(data[i].type)){
      case 1:
      case 2:
      case 5:
      sing.push(data[i]);
      break;

      case 3:
      case 4:
      dance.push(data[i]);
    }
  }
}

var rand=function(){
  var load=function(data){
    window.template=$("#participant-template").html();
    if(!window.names){
      genNames(data);
    }
    data=window.names[new mdui.Tab($("#participant-selection")).activeIndex];
    var rand=shuffle(data,30);
    setHtml(rand);
  };

  if(!window.names) $.ajax({
    success:load,
    url:"/participant/data.json",
    dataType:"json"
  });
  else load();

  $("#search").on("keyup",function(){
    var key=$("#search").val().toLowerCase();
    if(key=="") return rand();
    var result=[];
    var data=window.names[new mdui.Tab($("#participant-selection")).activeIndex];
    for(var i=0;i<data.length;i++){
      if(data[i].name.toLowerCase().indexOf(key)>-1||
         data[i].id.toLowerCase().indexOf(key)>-1)
         result.push(data[i]);
    }
    if(result.length!=0) return setHtml(result);
    else $("#main").html("无结果");
  });

};

window.onload=function(){
  window.$=mdui.JQ;
  var sel=$("#participant-selection");
  sel.on("click",rand);
  rand();
};
