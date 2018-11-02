//vurl by Alan-Liang
//@code-style Really Bad

/*Usage:
   *add:
      vurl.add({path:'/path',func:function(req,resp){}});
    or
      vurl.add=({regexp:/^\/path$/,func:function(req,resp){}});
   *remove:
      vurl.remove(data); //data is the original version of vurl.add
   *query:
      vurl.query('/data');
   *debug:
      vurl.debug = true;
*/

//list of VURLs, private
var list = [];

//debug argument
this.debug = false;

//add
this.add=function (a) {
	this.debug && console.log(a);
	var flag = false;
	for (var i = 0; i < list.length; i++)
		if (a && list[i].path === a.path && list[i].func === a.func)
		//              there is one, so don't add it again
		flag = true;
	if (!flag && a && (a.path!==undefined || a.regexp!==undefined) && a.func)
	//          correct argument
	list.push(a);
};

//remove
this.remove = function (a) {
    if (a) for (var i = 0; i < list.length; i++)
        if (((list[i].path == a.path) || (list[i].regexp && list[i].regexp.test(a))) && list[i].func == a.func)
            //          yes! got it, then remove it!
            list[i] = {};
};

//query
this.query = function (a) {
    this.debug && console.log(a);
    for (var i = 0; i < list.length; i++)
        if ((list[i].regexp && list[i].regexp.test(a)) || list[i].path == a)
            //          yes! got it!
            return list[i].func;
    //  no,return undefined.
    return undefined;
};
