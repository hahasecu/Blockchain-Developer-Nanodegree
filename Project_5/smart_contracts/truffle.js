// var HDWalletProvider = require('truffle-hdwallet-provider');

// var mnemonic = 'direct nuclear broken speed short oppose step water divide illness fortune bicycle';

// module.exports = {
//   networks: {
//     development: {
//       host: '127.0.0.1',
//       port: 8545,
//       network_id: "*"
//     },
//     rinkeby: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/586768cf16e2421c90a6ccad4f88ad3c')
//       },
//       network_id: 4,
//       gas: 19800000,
//       gasPrice: 10000000,
//     }
//   }
// };

var HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'direct nuclear broken speed short oppose step water divide illness fortune bicycle';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/586768cf16e2421c90a6ccad4f88ad3c'),
      network_id: 4,
      gas : 6800000,
      gasPrice : 10000000000
    },
  }
};