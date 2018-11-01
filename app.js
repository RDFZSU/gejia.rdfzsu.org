//ads by Alan-Liang
console.log("%c想参与学生会后续前端&后端制作吗？\n加入我们吧！我的邮箱:liangyalun [at] rdfzsu [dot] org\n技术支持 Alan-Liang zhjimin\n","color:#f5fafd;background-color:#002d4d;font-size:32px;");

// FIXME: hack on mdui
var $=mdui.JQ;
var topNav=$("#top-nav");
var has=false;
topNav.find("a").each((i,el) => {
  var href=el.getAttribute("href");
  el.setAttribute("data-href",href);
  el.setAttribute("href","#content");
  if(href==("/"+location.href.split("/")[3])){
    el.classList.add("mdui-tab-active");
    has=true;
  }
});
if(has) new mdui.Tab(topNav);
topNav.find("a").each((i,el) => {
  el.setAttribute("href",
                  el.getAttribute("data-href"));
});
$("#content").show();
