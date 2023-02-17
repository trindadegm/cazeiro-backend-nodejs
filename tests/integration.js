import test from 'node:test';
import assert from 'node:assert';
import got from 'got';

export default function run() {
    test("Create Nota Fiscal", async t => {
        await t.test("Test create empty", async t => {
            const result = await got.post('http://localhost:3080/v1/nf', {
                    json: {
                        currency: "BRL",
                        value: "0",
                        entries: [],
                    },
                });
            assert(result.statusCode == 200, 'Failed to create a new empty NF');
            const body = JSON.parse(result.body);
            assert(body.id !== null, 'Body does not contain id');
        });

        await t.test("Test create with data", async t => {
            const result = await got.post('http://localhost:3080/v1/nf', {
                    json: {
                        nfeId: '12345678',
                        currency: 'BRL',
                        value: '7.19',
                        entries: [
                            {
                                productName: 'Creme dental',
                                ammount: 1,
                                unit: 'units',
                                unitValue: '2.99',
                                value: '2.99'
                            },
                            {
                                productName: 'Maçã nacional',
                                ammount: 0.451,
                                unit: 'Kg',
                                unitValue: '5.99',
                                value: '2.7'
                            },
                            {
                                productName: 'Caneta',
                                ammount: 3,
                                unit: 'units',
                                unitValue: '0.5',
                                value: '1.5'
                            }
                        ],
                    },
                });
            assert(result.statusCode == 200, 'Failed to create a new empty NF');
            const body = JSON.parse(result.body);
            assert(body.id !== null, 'Body does not contain id');
        });

        await t.test('Test wrong content type', async t => {
            const result = await got.post('http://localhost:3080/v1/nf')
                .catch((e) => e.response);
            assert(result.statusCode == 415, 'Wrong error code response');
        });
    });
}

run();