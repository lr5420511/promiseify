'use strict';

const { promiseify } = require('./lib/promiseify');
const { readFile } = require('fs');

const readFilePromise = promiseify(readFile);

(async(path) => {
    const ctn1 = await readFilePromise(path, 'utf8');
    console.log(ctn1);
    let ctn2;
    try {
        ctn2 = await readFilePromise(path + '1', 'utf8');
        console.log([ctn2, ctn1]);
    } catch (err) {
        console.log(err.message);
    }
})('./test')

console.log('The first sync print.');

const test = {
    name: 'test name',
    asyncMethod: function(callback, timeout = 0) {
        const cur = this;
        setTimeout(() => {
            if (timeout > 100)
                return callback(
                    null,
                    new RangeError('timeout is too large.')
                );
            callback(cur, null);
        }, timeout);
    }
};

const testAsyncPromise = promiseify(
    test.asyncMethod, 0, 1
).bind(test);

(async() => {
    let obj = await testAsyncPromise();
    console.log(obj.name);
    obj.name = 'change name';
    obj = await testAsyncPromise(100);
    console.log(obj.name);
    try {
        obj = await testAsyncPromise(3000);
        console.log(obj.name);
    } catch (err) {
        console.log(err.message);
    }
    console.log('demo end');
})()

console.log('The second sync print.');