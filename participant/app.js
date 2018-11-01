setTimeout(function(){

var $=mdui.JQ;
var names;
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
var types={
  1:"歌赛(单人)",
  2:"歌赛(团队)",
  3:"舞赛(单人)",
  4:"舞赛(团队)",
  5:"Rap专场",
  0:"未知"
};

var template=$("#participant-template").html();
$.ajax({
  success:function(data){
    names=data;
	var rand=shuf(data);
	var html="";
	for(var i=0;i<rand.length;i++){
      var el=rand[i];
      el.imgid=el.hasimg?el.id:"default";
      el.typename=types[el.type]||types[0];
	  html+=processTemplate(template,el);
	}
	$("#main").html(html);
  },
  url:"/participant/data.json",
  dataType:"json"
});


},10);