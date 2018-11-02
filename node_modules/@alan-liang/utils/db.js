//MongoDB helper
//@author Alan-Liang
//@code-style Really Bad
//need to install `mongodb`

var MongoClient=require("mongodb").MongoClient;
var log=require("./log")("db");

var self=exports=module.exports={};
// TODO: replace config here and authenticate
self.url="mongodb://localhost:27017";
if(process.env.OPENSHIFT){
	var uri=process.env.DATABASE_URI;
	if(uri) self.url=uri;
}
self.dbName = "database";
self.connect=function(callback){
  MongoClient.connect(self.url, function(err, client) {
    if(err){
    	log.error(err.stack);
    	if(callback) callback(err);
    }
    log.info("Connected to MongoDB.");
    self.db=client.db(self.dbName);
    self.client=client;
    if(callback) callback(null);
  });
}

//zing(Error err) logs an error if present
var zing=function(err){
	if(err) log.error(err.stack);
}

var getCollection=self.getCollection=function(name){
	if(typeof name==typeof {}) return name;
	if(!name)return name;
	return self.db.collection(name);
}

var insertMany=self.insertMany=function(collection,documents,callback){
  collection=getCollection(collection);
  collection.insertMany(documents,function(err,result){
    zing(err);
    if(callback) callback(err,result);
  });
};

var insertOne=self.insertOne=function(collection,document,callback){
  collection=getCollection(collection);
  collection.insertOne(document,function(err,result){
    zing(err);
    if(callback) callback(err,result);
  });
};

var insert=self.insert=function(collection,doc,cb){
	if(!doc){
		callback(new TypeError("document missing!"));
		return;
	}
	if(doc.length){
		return insertMany(collection,doc,cb);
	}else{
		return insertOne(collection,doc,cb);
	}
};

var find=self.find=function(collection,filter,callback){
  collection=getCollection(collection);
  if(typeof filter==typeof zing){//2nd param is a function
  	callback=filter;
  	filter={};
  }
  collection.find(filter).toArray(function(err, docs) {
    zing(err);
    callback(err,docs);
  });
}

var updateMany=self.updateMany=function(collection,filter,update,callback){
  collection=getCollection(collection);
  collection.updateMany(filter,update,function(err,result){
    zing(err);
    if(callback) callback(err,result);
  });
};

var updateOne=self.updateOne=function(collection,filter,update,callback){
  collection=getCollection(collection);
  collection.updateOne(filter,update,function(err,result){
    zing(err);
    if(callback) callback(err,result);
  });
};

var deleteOne=self.deleteOne=function(collection,query,callback){
	collection=getCollection(collection);
	return collection.deleteOne(query,function(err,result){
		zing(err);
		if(callback)callback(err,result);
	});
};
