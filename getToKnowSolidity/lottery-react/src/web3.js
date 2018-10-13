import Web3 from 'web3';

// use the web3 injected to browser by metamask
const web3 = new Web3(window.web3.currentProvider);

export default web3;