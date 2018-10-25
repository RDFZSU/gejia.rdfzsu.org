var $=mdui.JQ;
var topNav=$("#top-nav");
topNav.find("a").each((i,el) => {
  if(el.getAttribute("data-href")==location.pathname){
    el.classList.add("mdui-tab-active");
  }
});
// FIXME: hack on mdui
new mdui.Tab(topNav);
topNav.find("a").each((i,el) => {
  el.setAttribute("href",
                  el.getAttribute("data-href"));
});
$("#content").show();
