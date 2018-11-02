//Utilities used by @Alan-Liang
//@author Alan-Liang
//@code-style Really Bad

var template=require("./template");
try{
  var log=require("./log");
}catch(e){}
var vurl=require("./vurl");
var db;
try{
  db=require("./db");
}catch(e){}

module.exports={
  template,
  log,
  vurl,
  db
};
