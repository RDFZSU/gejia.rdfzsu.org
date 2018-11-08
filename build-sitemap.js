var fs=require("fs");
module.exports=function(files){
  var urls="";
  files.forEach(el=>{
    urls+=`<url>
            <loc>https://gejia.rdfzsu.org/${el}</loc>
            <lastmod>2018-11-08T07:04:27+00:00</lastmod>
            <priority>1.00</priority>
          </url>`;
  });
  var xml=`<?xml version="1.0" encoding="UTF-8"?>
           <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
             ${urls}
            </urlset>`;
  fs.writeFileSync("sitemap.xml",xml);
};
