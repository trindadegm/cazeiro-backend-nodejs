import test from 'node:test';
import assert from 'node:assert';

import { nfFromJSON } from '../src/data/nf.js';

export default function run() {
    test('Nf decoding', async t => {
        await t.test('Empty NF', async t => {
            nfFromJSON(JSON.stringify({
                value: '2,33',
                currency: 'BRL',
                entries: []
            }));

            nfFromJSON(JSON.stringify({
                nfeId: '123456',
                value: '2,33',
                currency: 'BRL',
                entries: []
            }));
        });

        await t.test('Complete NF', async t => {
            nfFromJSON(JSON.stringify({
                value: '2,33',
                currency: 'BRL',
                entries: [
                    {
                        productName: 'AAA',
                        value: '1,11',
                        unit: 'units',
                        ammount: 1,
                        unitValue: '1,11'
                    },
                    {
                        productName: 'BBB',
                        value: '2,22',
                        unit: 'kg',
                        ammount: 0.5,
                        unitValue: '4,44'
                    },
                    {
                        productName: 'CCC',
                        value: '3,33',
                        unit: 'kg',
                        ammount: 0.75,
                        unitValue: '4,44'
                    }
                ]
            }));

            nfFromJSON(JSON.stringify({
                nfeId: '123456',
                value: '2,33',
                currency: 'BRL',
                entries: [
                    {
                        productName: 'AAA',
                        value: '1,11',
                        unit: 'units',
                        ammount: 1,
                        unitValue: '1,11'
                    },
                    {
                        productName: 'BBB',
                        value: '2,22',
                        unit: 'kg',
                        ammount: 0.5,
                        unitValue: '4,44'
                    },
                    {
                        productName: 'CCC',
                        value: '3,33',
                        unit: 'kg',
                        ammount: 0.75,
                        unitValue: '4,44'
                    }
                ]
            }));
        });
    });
}

run();