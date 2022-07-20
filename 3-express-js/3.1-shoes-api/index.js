const express = require('express');
const colors = require('colors');
const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.log('Servidor express listening...'.rainbow)
});

app.get('/', (req, res) => {
    res.send('hola mundo');
});

let shoes = [
    { id: 1, brand: 'noke', price: 200, size: 29 },
    { id: 2, brand: 'edidas', price: 500, size: 22 },
    { id: 3, brand: 'floxi', price: 900, size: 25 },
];

// Query Params: Filtrar información
// http://localhost:3000/shoes/?page=1&pageSize=10&brand=%22noke%22
// %20 => espacio en blanco
// %22 => comillas dobles
app.get('/shoes', (req, res) => {
    // const page = req.query.page;
    // const pageSize = req.query.pageSize;
    // const brand = req.query.brand;
    const { page, pageSize, brand } = req.query;

    if (page && pageSize && brand) {
        res.json({ page, pageSize, brand });
        // = res.json({ page: page, pageSize: pageSize, brand: brand });
    } else {
        res.json(shoes);
    }
});

app.get('/shoes/:id', (req, res) => {
    const { id }= req.params;
    const shoe = { id: 1, brand: 'noke', price: 200, size: 29, searching: id };
    res.json(shoe);
});

app.post('/shoes', (req, res) => {
    const newShoe = req.body;
    shoes.push(newShoe);
    console.log(shoes);
    const response = { message: 'shoe created!' };
    res.status(201).json(response)
});

app.patch('/shoes/:id', (req, res) => {
    const body = req.body;
    const { id }= req.params;
    const indexFounded = shoes.findIndex(shoe => shoe.id === id);
    if(indexFounded !== -1) {
        const shoeCopy = { ...shoes[indexFounded] };
        shoes[indexFounded] = { ...shoeCopy, ...body }
        res.json({ message: 'modified with success', body })
    } else {
        res.send('ese id no existe')
    }
})