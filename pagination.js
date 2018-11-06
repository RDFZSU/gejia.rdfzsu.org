function paginationTo(el){
  var images=(el||document).getElementsByTagName("img");
  var onscroll=function(){
    for(var i=0;i<images.length;i++){
      var rect=images[i].getBoundingClientRect();
      var isin=((rect.top<window.innerHeight)&&(rect.bottom>0));
      if(isin&&!images[i].isin){
        images[i].setAttribute("src",images[i].getAttribute("data-src"));
        images[i].style.height="";
      }
      if(!isin&&images[i].isin){
        images[i].setAttribute("src",nullsrc);
        images[i].style.height=rect.height+"px";
      }
      images[i].isin=isin;
    }
  };
  window.addEventListener("scroll",onscroll);
  var nullsrc="";
  onscroll();
}
