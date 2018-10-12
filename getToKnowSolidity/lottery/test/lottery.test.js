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
let lottery;

beforeEach(async () => {
    // get a list of accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });

});

describe("lottery contract", () => {
    it('deploys a contract', () => {
        // console.log(inbox);

        // check if the address exist
        assert.ok(lottery.options.address);
        // console.log(lottery.options.address);
    });

    it('allow an account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.002', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it("allows mutiple accounts to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.002', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.002', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.002', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[1], players[1]);
        assert.equal(3, players.length);
    });

    it("require a mini amount of ether to enter", async () => {

        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false); // if above code dosen't throw an err, this one fire
        } catch (err) {
            assert(err); // ensure err exist
        }
    });

    it("only allow a manager to call pickWinner", async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initalBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({from: accounts[0]});
        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const diff = finalBalance - initalBalance;
        console.log(finalBalance - initalBalance);

        assert(diff > web3.utils.toWei('1.8', 'ether'));
        const players = await lottery.methods.getPlayers().call({from: accounts[0]});
        assert.equal(0, players.length);
    })
});

