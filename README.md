
# Projects for Blockchain Developer Nanodegree Term1

Learn to identify fundamental transaction types, build a web service and API, and secure digital assets with your blockchain identity. Create a private blockchain, and a notarization web service. Use your blockchain identity to secure digital assets on the Ethereum platform with a smart contract.<br><br>
By Adrianacmy
<br>

## [Project_1](./Project_1/Project_1.md): [Manage your blockchain identity using a bitcoin wallet.](./verifyMessageSignature.js)

## [Project_2](./Project_2/README.md) : Create a private blockchain ledger that persists data and validates the blockchain ledger utilizing block hashes.

## [Project_3](./Project_3/README.md) : Create web service API with Express.js.

## [Project_4](./Project_4/README.md) : Create web service API with Express.js.


## Digital Assets
- ASCII(American Standard Code for Information Interchange): [ascii converter](https://www.branah.com/ascii-converter)
- [ascii table](http://www.asciitable.com/)
- hexadecimal: [converter](http://www.convertstring.com/EncodeDecode/HexEncode)
- Base64:Encoding scheme meant to represent data as numbers in a string format
```
String to hex: xxd -p <<< "Blockchain Developer"
Hex to string: echo 426c6f636b636861696e20446576656c6f7065720a|xxd -r -p
String to Hex: xxd -p file.txt fileEncoded.txt
Hex to String: xxd -p -r fileEncoded.txt fileDecoded.txt

Image to Hex: xxd -p img.png img.txt
Hex to Image: xxd -p -r img.txt imgDecoded.png
```
- [Proof of existence](http://poex.io/)
    - http://originstamp.org/home
    - https://www.factom.com/
    - https://www.flo.cash/


## Ethereum
- Generating Keys in Ethereum
```
    <!-- Generate Private Key -->
    openssl ecparam -name secp256k1 -genkey -noout

    <!-- Generate a random Private Key & Derive a Public Key -->
    openssl ecparam -name secp256k1 -genkey -noout | openssl ec -text -noout > Key

    <!-- Generate the hash, and save to a file 'address' -->
    cat pub | keccak-256sum -x -l | tr -d ' -' | tail -c 41 > address


```
- Ethereum command line interface
    - install Geth: https://ethereum.github.io/go-ethereum/install/
    - Sync to the Rinkeby Test Network: `geth --rinkeby --syncmode "fast"`
- Get test ether:
    - https://faucet.metamask.io/
    - https://www.rinkeby.io/#faucet

- local test/dev environment Truffle: https://truffleframework.com/docs/ganache/quickstart
```
    npm install -g ganache-cli
    sudo npm install -g ganache-cli truffle

    <!-- Run Ganache CLI -->
    ganache-cli


    <!-- Stop Ganache and modify your Ganache command line statement to include --mnemonic "string of words". -->
    ganache-cli --mnemonic 'trick core barely fold sample icon display hollow smoke task emotion pepper'

    <!-- Compile smart contracts -->
    truffle compile

    <!-- Deploy smart contract -->
    <!-- Make sure to configure your network settings. Modify truffle.js file (or truffle-config.js for windows), example below: -->
    module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
        host: "localhost",
        port: 8545,
        network_id: "*" // Match any network id
        }
    }
    };

    <!-- Run the following command to start the migrations scripts and deploy your smart contracts: -->
    truffle migrate

```

- http-server: https://www.npmjs.com/package/http-server
```
 npm install http-server -g

 http-server [path] [options]
<!-- [path] defaults to ./public if the folder exists, and ./ otherwise. -->

```
- Ether Wei converter: https://www.myetherwallet.com/helpers.html
- OpenZeppelin: https://github.com/OpenZeppelin/openzeppelin-solidity
- Infura: https://infura.io/


### Resources
    - https://ethstats.net/
    - https://github.com/ethereum/wiki/wiki/Glossary


## RPC: Remote precedure calls

## [Bitcoin Glosary](./glosary.md)

## [Bitcoin-cli](./bitcoin-cli.md)

## Organizations with great pitches

- https://traseable.com/
- https://new.consensys.net/: wetsite color solution is great
- https://viant.io/
- https://www.originprotocol.com/en#
- https://bloom.co/
- https://dharma.io/
- https://www.cryptokitties.co/
- https://www.nytimes.com/2018/05/18/style/cryptokitty-auction.html


## Known Bugs
- N/A

## Technologies Used

- Javascript
- Nodejs
- Solidity
- LevelDB
- Crypto-js
- Experss.js
- Sails.js
- Hapi.js


## Thanks/Resources

- [Generate a bitcoin address]( https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html)
- [Sharing images](https://imgbb.com/)
- [Difference between publick and private blockchain]( https://www.ibm.com/blogs/blockchain/2017/05/the-difference-between-public-and-private-blockchain/)
- [3 types of blockchain you need to know](https://hackernoon.com/3-popular-types-of-blockchains-you-need-to-know-7a5b98ee545a)
- [Block explorer](https://blockexplorer.com/)
- [Bitcoin Developer Glosary](https://bitcoin.org/en/developer-glossary#section)
- [Developer test example](https://bitcoin.org/en/developer-examples#testing-applications)
- [Bitcoin faucet to get test coins](http://bitcoinfaucet.uo1.net/send.php)

- [testnet block explorer](https://live.blockcypher.com/btc-testnet/)
- [A list of bitcoin-cli](https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list)

- https://github.com/bitpay/bitcore-message
- https://github.com/bitcoinjs/bitcoinjs-lib
- https://github.com/brix/crypto-js
- http://leveldb.org/
- https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/

- https://www.npmjs.com/package/bitcoin-core
- https://www.npmjs.com/package/ethereumjs-util
- https://www.npmjs.com/search?q=keywords:blockchain
- https://www.google.com/sky/
- [12 words mnomic](https://iancoleman.io/bip39/)
```
n ls // list all available node versions
nvm install v0.4.12 // install certain version
nvm use v0.4.12 // user certain version


```


## Licence

- MIT

## Surpport Contents

### [API Design](RESTful_api/README.md)

### Nodejs:
- core components: http, fs
- nvm: node version manager
- npm
- nodejs framework: https://nordicapis.com/13-node-js-frameworks-to-build-web-apis/

### Solidity
```
// 固定长度为2的静态数组:
uint[2] fixedArray;
// 固定长度为5的string类型的静态数组:
string[5] stringArray;
// 动态数组，长度不固定，可以动态添加元素:
uint[] dynamicArray;

Person[] people;
```

old: 0xca089f8e0ed91b15c146f3d9135c7026789214f0
current add: 0x5ee292F9E1923E2856eA211204F63E65C5a4587B

current seed: direct nuclear broken speed short oppose step water divide illness fortune bicycle