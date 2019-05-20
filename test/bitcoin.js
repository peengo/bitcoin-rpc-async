const { assert } = require('chai');
const Rpc = require('../');

const url = 'http://user:password@localhost:8332';
const methodsCamelCase = ['getBlockchainInfo', 'getBlockHash'];
const methodsUnderscore = ['get_blockchain_info', 'get_block_hash'];

const chain = 'main';
const genesisBlockHash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';

describe('Bitcoin RPC Async', () => {
    const rpc = new Rpc(url);
    describe('.run("getblockchaininfo")', () => {
        it('should return the blockchaininfo', async () => {
            try {
                const { result: info } = await rpc.run('getblockchaininfo');

                assert.equal(info.chain, chain);
                assert.equal(typeof info.blocks, 'number');
            } catch (error) {
                throw error;
            }
        });
    });

    describe('.run("getblockhash",[0])', () => {
        it('should return the genesis block hash', async () => {
            try {
                const { result: hash } = await rpc.run('getblockhash', [0]);

                assert.equal(hash, genesisBlockHash);
            } catch (error) {
                throw error;
            }
        });
    });

    describe('.run("invalidmethod")', () => {
        it('should return Method not found', async () => {
            try {
                const { result, error } = await rpc.run('invalidmethod');

                assert.equal(result, null);
                assert.equal(error.message, 'Method not found');
            } catch (error) {
                throw error;
            }
        });
    });

    // CAMEL CASE
    const rpcCamelCase = new Rpc(url, methodsCamelCase, 'camelCase');
    describe('camelCase method names', () => {
        describe('.getBlockchainInfo()', () => {
            it('should return the blockchaininfo', async () => {
                try {
                    const { result: info } = await rpcCamelCase.getBlockchainInfo();

                    assert.equal(info.chain, chain);
                    assert.equal(typeof info.blocks, 'number');
                } catch (error) {
                    throw error;
                }
            });
        });

        describe('.getBlockHash([0])', () => {
            it('should return the genesis block hash', async () => {
                try {
                    const { result: hash } = await rpcCamelCase.getBlockHash([0]);

                    assert.equal(hash, genesisBlockHash);
                } catch (error) {
                    throw error;
                }
            });
        });
    });

    // UNDERSCORE
    const rpcUnderscore = new Rpc(url, methodsUnderscore, 'underscore');
    describe('underscore method names', () => {
        describe('.get_blockchain_info()', () => {
            it('should return the blockchaininfo', async () => {
                try {
                    const { result: info } = await rpcUnderscore.get_blockchain_info();

                    assert.equal(info.chain, chain);
                    assert.equal(typeof info.blocks, 'number');
                } catch (error) {
                    throw error;
                }
            });
        });

        describe('.get_block_hash([0])', () => {
            it('should return the genesis block hash', async () => {
                try {
                    const { result: hash } = await rpcUnderscore.get_block_hash([0]);

                    assert.equal(hash, genesisBlockHash);
                } catch (error) {
                    throw error;
                }
            });
        });
    });
});