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

const nfRouter = express.Router();

nfRouter
    .use((req, res, next) => {
        res
            .setHeader('Access-Control-Allow-Origin', '*')
            .setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
            .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        next();
    })
    .route('/v1/nf')
    .post(async (req, res) => {
        if (req.is('application/json')) {
            const validationResult = validateNf(req.body);
            if (validationResult.valid) {
                const toInsert = req.body;
                try {
                    const dbRes = await db.collection('nfs').insertOne(toInsert);
                    res.status(200).send({
                        id: dbRes.insertedId,
                    });
                } catch (e) {
                    res.status(500).send();
                }
            } else {
                res.status(400).send({
                    error_description: 'Invalid object, verify schema: ' + JSON.stringify(validationResult.errors),
                });
            }
        } else {
            res.status(415).send({
                error_description: 'Content-Type must be JSON',
            });
        }
    })
    .options((req, res) => {
        res.status(200).send();
    });

app.use(nfRouter);

app.listen(port, () => {
    console.log(`Example app listening in port ${port}`);
}).on('exit', async () => {
    await client.close();
});
