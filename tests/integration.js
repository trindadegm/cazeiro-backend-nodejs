import test from 'node:test';
import assert from 'node:assert';
import got from 'got';

test("Create Nota Fiscal", async t => {
    await t.test("Create empty", async t => {
        const result = await got.post('http://localhost:3080/v1/nf');
        assert(result.statusCode == 200, 'Failed to create a new empty NF');
        const body = JSON.parse(result.body);
        assert(body.id !== null, 'Body does not contain id');
    });
});