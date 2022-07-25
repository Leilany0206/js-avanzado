const http = require('http');
const url = require('url');
const colors = require('colors')

const server = http.createServer((request, response) => {
    const urlObject = url.parse(request.url);
    const path = urlObject.path;
    console.log("Path solicitada: ", path)

    let status = 0;
    let responseObj = {};
    let mimeType = { 'Content-Type' : 'application/json'};

    if (path === '/') { // 200
        // paso 3.1 conectarse a la bd y hacer la operacion real y obtener
        // resultados reales para el mensaje y el status
        responseObj = { message: 'OK' };
        status = 200;
    } else if (path === '/new-card') { // 201
        responseObj = { message: 'Created' };
        status = 201;
    } else if (path === '/do-login') { // 204
        responseObj = {};
        status = 204;
    } else if (path === '/modify-admin') { // 403
        responseObj = {};
        status = 403;
    } else if (path === '/loquesea.txt') { // 404
        responseObj = { message: 'no encontre el txt' };
        status = 404;
    } else { // 500
        responseObj = { message: 'Internal server error' };
        status = 500;
    }

    const stringResponse  = JSON.stringify(responseObj);

    response.writeHead(status, mimeType);
    response.write(stringResponse);
    response.end();
}); 

server.listen(8080);

console.log('Servidorsito...'.rainbow);
console.log('== esperando peticiones =='.blue);