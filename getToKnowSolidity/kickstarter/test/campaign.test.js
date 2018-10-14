const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 is a constructor, capitalized
const Web3 = require('web3');

// const web3 = new Web3(ganache.provider());
// ganache pre create 10 unlocked accounts for test

const provider = ganache.provider();
const web3 = new Web3(provider)

const comipledFactory = require('../ethereum/build/CampaignFactory.json');
const comipledCampaign = require('../ethereum/build/Compaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
    // get a list of accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    factory = await new web3.eth.Contract(JSON.parse(comipledFactory.interface))
        .deploy({ data: comipledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    // will return a hash
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // view, not change any data, call()
    // const addresses = await factory.methods.getDeployedCampaigns().call();
    // campaignAddress = addresses[0]
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    // es6 destructuring

    campaign = await new web3.eth.Contract(
        JSON.parse(comipledCampaign.interface),
        campaignAddress
    )

});


describe('Campaign', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as a manager', async () => {
        // manager is public, auto added manager() function
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it("allow people to contribut money and marked as contributor", async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        // approvers is a public field, auto added approvers()  a getter
        const isContributor = await campaign.methods.approvers(accounts[1]);
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: 50
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allows a manager to request a payment', async () => {
        await campaign.methods.createRequest(
            'buy pc', '100', accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });

        // requests is public, get a auto getter
        const request = await campaign.methods.requests(0).call();
        assert.equal('buy pc', request.description);
    });

    it('process a request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });
        await campaign.methods
            .createRequest('dd', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        await campaign.methods.approveRequst(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 100)
    })

})



























