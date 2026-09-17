const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end('Page not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain'});res.end(data);});
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
