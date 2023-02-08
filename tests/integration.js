import test from 'node:test';
import assert from 'node:assert';
import got from 'got';

test("Create Nota Fiscal", async t => {
    await t.test("Example", async t => {
        console.log("Example");
        let test = await got.get('http://localhost:3080');
        assert(test.statusCode == 200, "Test request failed");
    });
});