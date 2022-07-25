const http = require('http');

const server = http.createServer((request, response) => {
    const status = 200;
    const mimeType = { 'Content-Type' : 'text/html' }
    response.writeHead(status, mimeType);
    response.write('<html> <body> Hola </body> </html>')
    response.end();
});

server.listen(8080);
console.log('Inicie el servidor...')