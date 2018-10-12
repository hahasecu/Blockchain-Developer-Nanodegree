


<!--


public: anyone can call this function
private: only this contract can call this function
view|constant: the function returns data without modify contract's data
pure: will not modify or even read the contract's data
payable: when someone call this function they might send ether along


External account to create contract transaction

nonce
to: - if it is empty is an contract
data
value
gasPrice
startGas/gasLimit
v
r
s

changeing anything on the blockchain, have to submit a transaction and wait it to be proved

Running contract functions
calling a function: free to do, instantly, return not change data, eg. getters
sending a transaction to a function: modify contract's data, takes time, return the transation hash, casts money, eg, setters

gas costs
12 word mnemonic => BIP39 mnemonic algorithm

npm install --save solc: sol compiler


web3 versioning
v0.x.x: primitive interface-only callbacks for async code
v1.x.x: support for promises, async/await

Mocha functions
function:
    it:
    describe:
    beforeEach:


endpoint: https://rinkeby.infura.io/v3/4d94e36f580841ad825b443f32c797cb
-->