(function(){
  var frame=document.getElementsByTagName("iframe")[0];
  if(!frame) return;
  var adjust=function(){
    var width=window.getComputedStyle(frame).width;
    var height=parseFloat(width)*9/16;
    frame.style.height=height+"px";
  };
  window.addEventListener("resize",adjust);
  adjust();
})();
