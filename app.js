//ads by Alan-Liang
console.log("%c想参与学生会后续前端&后端制作吗？\n加入我们吧！我的邮箱:liangyalun [at] rdfzsu [dot] org\n技术支持 Alan-Liang zhjimin\n","color:#f5fafd;background-color:#002d4d;font-size:32px;");

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
