# bitcoin-rpc-async

A node.js async RPC library that communicates with the Bitcoin (bitcoind) Daemon and others that follow its standard. Run methods as a Promise or inside async/await. 

I wrote this wrapper because most others use callbacks and have none or poor error handling. 

## Prerequisites

A running Bitcoin Daemon (bitcoind or similar) that is listening to the rpc commands and has properly configured rpc username and password eaither via CLI or in the configuration file.

## Installing

```
npm install --save bitcoin-rpc-async
```

## Usage

The object constructor takes 3 arguments:
* `url` (required) \<string> | rpc url string endpoint

* `methods` *(optional)* \<Array> | Array of \<string> method names that will be linked to direct functions on the object (for easier access)

* `naming` *(optional)* \<string> | naming convention for methods we provided as the second argument under `methods`. Eaither `'camelCase'` or `'underscore'`

**Simple example using a Promise:**
```js
const Rpc = require('bitcoin-rpc-async');

const rpc = new Rpc('http://user:password@localhost:8332');

rpc.run('getblockhash', [0]).then(data => console.log(data));
```

Methods take parameters in an \<Array>.  
Methods don't return the data directly instead they return an `object` of a `result`, `error` and `id`.

You want to use camelCase or underscore naming convention. I've got you covered.

**camelCase naming convention with async/await and destructuring assignment:**
```js
const rpc = new Rpc(
    'http://user:password@localhost:8332',
    ['getBlockHash', 'getBlock'],
    'camelCase'
);

(async () => {
    try {
        const { result: hash } = await rpc.getBlockHash([0]);
        const { result: block } = await rpc.getBlock([hash]);

        console.log(block);
    } catch (error) {
        console.log(error);
    }
})();
```

**underscore naming convention**
```js
const rpc = new Rpc(
    'http://user:password@localhost:8332',
    ['get_block_hash', 'get_block'],
    'underscore'
);

(async () => {
    try {
        const { result: hash } = await rpc.get_block_hash([0]);
        const { result: block } = await rpc.get_block([hash]);

        console.log(block);
    } catch (error) {
        console.log(error);
    }
})();
```