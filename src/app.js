import express from 'express';

const app = express();
const port = 3080;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/nf', (req, res) => {
});

app.listen(port, () => {
    console.log(`Example app listening in port ${port}`);
});