const http = require("http");
const url = require("url");
const fs = require("fs");
const server = http.createServer((request, response)=>{
    //console.log("request: ", request.url);
    const urlObject = url.parse(request.url);
    const path = urlObject.path;
    let fileSystemPath = "";
    if(path==="/"){
        fileSystemPath = "./static/index.html";
    }else{
        fileSystemPath = `./static/${path}`;
    }
    fs.stat(fileSystemPath, (error)=>{
        if(error){
            //leer la pagina web
        } else {
            const status = 404;
            const mimeType = { 'Content-Type' : 'text/html' } ;
            response.writeHead(status,mimeType);
            response.write('<html> <body> 404 Not found </body> </html>');
            response.end();
        }
    });
    //console.log("",);
});

server.listen(8080);
console.log("Servidor iniciado");