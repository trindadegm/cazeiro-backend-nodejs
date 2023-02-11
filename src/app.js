import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 3080;

const dburi = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(dburi, { serverApi: ServerApiVersion.v1 });

await client.connect();

const db = client.db('ordoka');

await db.command({ ping: 1 });

app.get('/', async (req, res) => {
    const dbResponse = await db.collection('nfs').findOne({});
    res.send(dbResponse);
});

app.post('/v1/nf', async (req, res) => {
    try {
        const dbRes = await db.collection('nfs').insertOne({});
        res.statusCode = 200;
        res.send({
            id: dbRes.insertedId,
        });
    } catch (e) {
        res.statusCode = 500;
        res.send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening in port ${port}`);
}).on('exit', async () => {
    await client.close();
});
