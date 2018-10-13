const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const ganache = require('ganache-cli');

// a mnemonic could generat mutiple address
const provider = new HDwalletProvider(
    'direct nuclear broken speed short oppose step water divide illness fortune bicycle',
    'https://rinkeby.infura.io/v3/4d94e36f580841ad825b443f32c797cb'
);

const web3 = new Web3(ganache.provider());

//can not use async await outside of a function
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '6000000'});

    console.log(interface)
    console.log(result.options.address);

}

deploy();