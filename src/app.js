import express from 'express';
import { MongoClient } from 'mongodb';

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

const dburi = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(dburi);

async function run() {
    console.log('Running');
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        console.log('Connected successfully to database');

        app.listen(port, () => {
            console.log(`Example app listening in port ${port}`);
        });
    } finally {
        await client.close();
    }
}

await run().catch(console.dir);
