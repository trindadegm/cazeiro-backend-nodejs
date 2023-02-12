import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { validateNf } from './data/nf.js';

const app = express();
app.use(express.json());

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
    if (req.is('application/json')) {
        if (validateNf(req.body).valid) {
            const toInsert = req.body;
            try {
                const dbRes = await db.collection('nfs').insertOne(toInsert);
                res.statusCode = 200;
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.send({
                    id: dbRes.insertedId,
                });
            } catch (e) {
                res.statusCode = 500;
                res.send();
            }
        } else {
            res.statusCode = 400;
            res.send({
                error_description: 'Invalid object, verify schema',
            });
        }
    } else {
        res.statusCode = 415;
        res.send({
            error_description: 'Content-Type must be JSON',
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening in port ${port}`);
}).on('exit', async () => {
    await client.close();
});
