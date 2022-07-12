const fs = require('fs');

const fileName = './my-file.txt';
const textContent = 'Este texto lo escribí desde node';

fs.writeFile(fileName, textContent, (err) => {
    if (err) {
        throw error;
    } else {
        console.log('¡Archivo creado con exito!')
    }
});