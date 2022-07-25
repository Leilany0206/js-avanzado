const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((request, response) => {
  //console.log("request: ", request.url);
  const urlObject = url.parse(request.url);
  const path = urlObject.path;
  let fileSystemPath = "";

  if (path === "/") {
    fileSystemPath = "static/index.html";
  } else {
    fileSystemPath = `static${path}`;
  }

  fs.stat(fileSystemPath, (error) => {
    if (error) {
        fs.readFile(fileSystemPath, (error, file) => {
            if(!error) {
                const status = 200;
                const mimeType = { "Content-Type": "text/html" };
                response.writeHead(status, mimeType);
                response.write(file);
                response.end();
            } else {
                const status = 500;
                const mimeType = { "Content-Type": "text/plain" };
                response.writeHead(status, mimeType);
                response.write("Error en mi servidor");
                response.end();
            }
        })
    } else {
      const status = 404;
      const mimeType = { "Content-Type": "text/html" };
      response.writeHead(status, mimeType);
      response.write("<html> <body> 404 Not found </body> </html>");
      response.end();
    }
  });
  
});
server.listen(8080);
console.log("Servidor iniciado");