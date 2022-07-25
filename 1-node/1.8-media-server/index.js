const http = require('http');
const url = require('url');
const fs = require('fs');
const colors = require('colors');

const CONTENT_TYPE = 'Content-Type';
const MIME_TYPES = {
    html: 'text/html',
    css: 'text/css',
    jpg: 'image/jpg',
    ico: 'image/x-icon',
    mp3: 'audio/mpeg3',
    mp4: 'video/mp4',
    json: 'application/json'
};

const server = http.createServer((request, response) => {
    
    const urlObject = url.parse(request.url);
    const path = urlObject.path;

    let status = 0;
    let responseObj = {};
    let fileSytemPath = '';

    if (path) {
        fileSytemPath = `static${path}`
    }
    console.log(`Path solicitada: `, fileSytemPath);

    fs.stat(fileSytemPath, error => {
        if (!error) {
            
            fs.readFile(fileSytemPath, (error, file) => {
                if (!error) {
                    
                    status = 200;
                    const aux = fileSytemPath.split('.'); // index.html => ['index', 'html']
                    const extension = aux[ aux.length - 1 ];
                    const mimeType = MIME_TYPES[extension]; // MIME_TYPES.html;
                    
                    response.writeHead(status, { [CONTENT_TYPE] : mimeType } );
                    response.write(file);
                    response.end();        
                } else {

                    status = 500;
                    responseObject = { message: 'Internal server error' };
                    response.writeHead(status, { [CONTENT_TYPE] : MIME_TYPES.json } );
                    response.write(responseObject);
                    response.end();        

                }
            });
        } else {
            console.log('error:', error)
            status = 404;
            responseObject = { message: 'Not found' };
            response.writeHead(status, { [CONTENT_TYPE] : MIME_TYPES.json } );
            response.write(responseObject);
            response.end();
        }
    });
});

server.listen(9000);
console.log('API en node...'.rainbow);
console.log('Esperando peticiones....'.yellow);
