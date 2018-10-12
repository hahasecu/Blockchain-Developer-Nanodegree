const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 is a constructor, capitalized
const Web3 = require('web3');

// const web3 = new Web3(ganache.provider());
// ganache pre create 10 unlocked accounts for test

const provider = ganache.provider();
const web3 = new Web3(provider)

const { interface, bytecode } = require('../compile')


let accounts;
let inbox;
const INITAL_MESSAGE = 'Hi';
beforeEach(async () => {
    // get a list of accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITAL_MESSAGE] })// for initalMessage
        .send({ from: accounts[0], gas: '1000000' })

});

describe("inbox", () => {
    it('deploys a contract', () => {
        // console.log(inbox);

        // check if the address exist
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITAL_MESSAGE);
    });

    it('can change the message', async () => {
        // send a transaction to a function will get a hash back
        await inbox.methods.setMessage('World').send({
            from: accounts[0]
        });

        const newMessage = await inbox.methods.message().call();
        assert.equal(newMessage, 'World');

    })
})

