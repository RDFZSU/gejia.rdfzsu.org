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

var rand=function(){

var $=mdui.JQ;
function shuf(arr,count){
  arr=arr.slice();
  count=count||arr.length;
  var res=[];
  for(;count>0;count--){
    var id=parseInt(Math.random()*count);
	res.push(arr[id]);
	arr.splice(id,1);
  }
  return res;
}

var load=function(data){
  window.template=$("#participant-template").html();
  window.names=data;
  var rand=shuf(data,30);
  setHtml(rand);
};
if(!window.names) $.ajax({
  success:load,
  url:"/participant/data.json",
  dataType:"json"
});
else load(window.names);

$("#search").on("keyup",function(){
  var key=$("#search").val();
  if(key=="") return rand();
  var result=[];
  var data=window.names;
  for(var i=0;i<data.length;i++){
    if(data[i].name.indexOf(key)>-1) result.push(data[i]);
  }
  if(result.length!=0) return setHtml(result);
  else $("#main").html("无结果");
});

};

setTimeout(rand,100);
