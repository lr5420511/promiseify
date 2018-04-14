'use strict';

const assert = require('assert');

exports.promiseify = function(method, callbackIndex, errorIndex = 0) {
    assert(
        method instanceof Function,
        'promiseify: method need been function.'
    );
    return function() {
        const args = [].slice.call(arguments),
            cur = this,
            cbIndex = typeof callbackIndex === 'number' ?
            callbackIndex : args.length,
            erIndex = typeof errorIndex === 'number' ?
            errorIndex : 0;
        return new Promise((res, rej) => {
            args.splice(cbIndex, 0, function() {
                const err = arguments[erIndex];
                let result = [].filter.call(arguments,
                    (cur, i) => {
                        return i !== erIndex;
                    }
                );
                if (err) return rej(err);
                const len = result.length;
                result = len ?
                    (len === 1 ? result[0] : result) :
                    undefined;
                res(result);
            });
            method.call(cur, ...args);
        });
    };
};