function paginationTo(el){
  var images=(el||document).getElementsByTagName("img");
  var onscroll=function(){
    for(var i=0;i<images.length;i++){
      var rect=images[i].getBoundingClientRect();
      var isin=((rect.top<window.innerHeight)&&(rect.bottom>0));
      if(isin&&!images[i].isin){
        images[i].setAttribute("src",images[i].getAttribute("data-src"));
      }
      if(!isin&&images[i].isin){
        images[i].setAttribute("src",nullsrc);
      }
      images[i].isin=isin;
    }
  };
  var onresize=function(){
    for (var i = 0; i < images.length; i++) {
      var width=window.getComputedStyle(images[i]).width;
      var height=parseFloat(width)*9/16;
      images[i].style.height=height+"px";
    }
  }
  window.addEventListener("scroll",onscroll);
  window.addEventListener("click",onscroll);
  window.addEventListener("click",onresize);
  window.addEventListener("resize",onresize);
  var nullsrc="";
  onresize();
  onscroll();
}
