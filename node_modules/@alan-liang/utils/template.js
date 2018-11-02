function processTemplate(str,obj){
	var st=/{{[a-zA-Z0-9]*}}/gi;
	var res="";
	var comp;
	var last=0;
	var flag=false;
	while(comp=st.exec(str)){
		res+=str.substring(last,comp.index);
		flag=true;
		last=comp.index+comp[0].length;
		var pps=str.substring(comp.index+2,last-2);
		var val;
		if((val=obj[pps])!=undefined)res+=val;
		else res+=("{{"+pps+"}}");
	}
	res+=str.substring(last,str.length);
	return res;
}
if(typeof module!="undefined") module.exports=processTemplate;
