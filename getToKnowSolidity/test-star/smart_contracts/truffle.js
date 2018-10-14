const HDwalletProvider = require('truffle-hdwallet-provider');



/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

// module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
// };


const mnemonic = 'direct nuclear broken speed short oppose step water divide illness fortune bicycle';


module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
      development: {
        host: "localhost",
        port: 8545,
        network_id: "*" // Match any network id
      },
      rinkeby: {
          provider: function(){
              return new HDwalletProvider(mnemonic,'https://rinkeby.infura.io/v3/4d94e36f580841ad825b443f32c797cb')
          },
          network_id: 1,
          gas: 4500000,
          gasPrice: 10000000000,
      }
  }
};
