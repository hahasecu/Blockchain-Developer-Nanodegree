const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// a mnemonic could generat mutiple address
const provider = new HDwalletProvider(

    'mnemonic',
    'endpoint'
);

const web3 = new Web3(provider);

//can not use async await outside of a function
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi']})
    .send({from: accounts[0], gas: '10000000'});

    console.log(result.options.address);

}

deploy();