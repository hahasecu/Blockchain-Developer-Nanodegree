const SHA256 = require('crypto-js/sha256')
const level = require('level')
const chainDB = './chaindata'
const db = level(chainDB)
const Block = require('./block')


const hex_to_ascii = str1 => {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}


class Blockchain {
    constructor() {
        this.getBlockHeightDB().then(height => {
            if (height === -1) {
                this.addBlock(new Block("First block in the chain - Genesis block")).then(() => console.log('added the first block'))
            }
        })
    }


    async getBlockByAddress(address) {
        let blocks = [];
        let block;
        return new Promise((resolve, reject) => {
            db.createReadStream()
                .on('data', function (data) {
                if (parseInt(data.key) !== 0) {
                    block = JSON.parse(data.value)

                    if (block.body.address === address) {
                        block.body.star.story = hex_to_ascii(block.body.star.story);
                        blocks.push(block)
                    }
                  }
                }).on('error', (error) => {
                  reject(error)
                }).on('close', () => {
                  resolve(blocks)
                })
        })

    }

    async getBlockByHash(hash) {
        let block;
        return new Promise((resolve, reject) => {
            db.createReadStream()
                .on('data', function (data) {
                    block = JSON.parse(data.value);
                    if (block.hash === hash) {
                        // console.log(block)
                        if(parseInt(data.key) === 0){
                            return resolve(block);
                        }else{
                            block.body.star.story = hex_to_ascii(block.body.star.story);
                            return resolve(block);
                        }
                    }
                }).on('error', (error) => {
                  return reject(error)
                }).on('close', () => {
                  return resolve(block)
                })
        })
    }

    async addBlock(newBlock) {
        const height = parseInt(await this.getBlockHeightDB());
        newBlock.height = height + 1;
        newBlock.time = new Date().getTime().toString().slice(0, -3);

        if (newBlock.height > 0) {
            let preBlock = await this.getBlock(height);
            newBlock.previousBlockHash = preBlock.hash;
        }

        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        await this.addABlockDB(newBlock.height, JSON.stringify(newBlock))
    }


    async getBlockHeight() {
        return await this.getBlockHeightDB();
    }


    async getBlock(blockHieght) {
        let block = JSON.parse(await this.getABlockByKeyDB(blockHieght));
        if (parseInt(blockHieght) !== 0){
            block.body.star.story = hex_to_ascii(block.body.star.story);
        }
        return block;

    }


    async validateBlock(blockHeight) {
        let block = await this.getBlock(blockHeight);
        let blockHash = block.hash;
        block.hash = '';
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        if (blockHash === validBlockHash) {
            return true;
        } else {
            console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
            return false;
        }

    }

    async validateChain() {
        let errorLog = [];
        let preHash = '';
        let valid;
        let height = await this.getBlockHeightDB();
        for (var i = 0; i < height; i++) {
            this.getBlock(i).then(block => {

                valid = this.validateBlock(block.height);
                if (!valid) {
                    errorLog.push(i);
                }
                if (block.previousBlockHash != preHash) {
                    errorLog.push[i];
                }
                preHash = block.previousBlockHash;
            })
        }
        if (errorLog.length > 0) {
            console.log('Block errors = ' + errorLog.length);
            console.log('Blocks: ' + errorLog);
        } else {
            console.log('No errors detected');
        }
    }


    addABlockDB(key, value) {
        return new Promise((resolve, reject) => {
            db.put(key, value, (err) => {
                if (err) {
                    reject(err);
                }
                console.log(`${key} added`);
                resolve(`Added ${key} to blockchain`);
            })
        })
    }

    getABlockByKeyDB(key) {
        return new Promise((resolve, reject) => {
            db.get(key, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            })
        })
    }


    getBlockHeightDB() {
        return new Promise((resolve, reject) => {
            let height = -1;
            db.createReadStream().on('data', data => {
                height++
            }).on('err', err => {
                reject(err);
            }).on('close', _ => {
                resolve(height);
            })
        })
    }
}

// let blockchain = new Blockchain();

// (function theLoop(i) {
//     setTimeout(() => {
//         blockchain.addBlock(new Block(`Test data ${i}`)).then(() => {
//             if (--i) {
//                 theLoop(i)
//             }
//         })
//     }, 500);
// })(10);

// setTimeout(() => blockchain.validateChain(), 2000)

module.exports = Blockchain