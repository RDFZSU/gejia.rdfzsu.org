var http=require("http");
var url=require("url");
var template=require("@alan-liang/utils/template");
var fs=require("fs");
var mime=require("mime");

var htmlTemplate=fs.readFileSync(__dirname+"/template.html").toString();

http.createServer(function(req,resp){
  var p=url.parse(req.url).pathname.substr(1);
  if(p===""||p.endsWith("/")) p+="index.html";
  if(p.indexOf(".html")>-1){
    var str;
    try{
      str=fs.readFileSync(__dirname+"/"+p.replace(".html",".origin.html")).toString();
    }catch(e){
      resp.writeHead(500);
      resp.end(e.stack);
      return;
    }
    var lines=str.split("\n");
    var title=lines.shift().replace("\r","");
    var content=lines.join("\n");
    resp.writeHead(200,{"Content-Type":"text/html"});
    resp.end(template(htmlTemplate,{
      title,
      content
    }));
    return;
  }else{
    var type=mime.getType(p);
    var content;
    try{
      content=fs.readFileSync(__dirname+"/"+p);
    }catch(e){
      resp.writeHead(500);
      resp.end(e.stack);
      return;
    }
    resp.writeHead(200,{"Content-Type":type});
    resp.end(content);
  }
}).listen(8080);
