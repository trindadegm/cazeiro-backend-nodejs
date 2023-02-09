import express from 'express';

const app = express();
const port = 3080;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

var allNf = []

app.post('/v1/nf', (req, res) => {
    allNf.push({});
    res.statusCode = 200;
    res.send({
        id: allNf.length - 1,
    });
});

app.listen(port, () => {
    console.log(`Example app listening in port ${port}`);
});