// Setup libraries
const bitcoin = require('bitcoinjs-lib')
const bitcoinMessage = require('bitcoinjs-message')


// Verify a Bitcoin message
const address = '18zFbe7GP8z7e7p66M7hyEZ83DzsrZfYnh'

const signature = 'IPUAUjXuWJJrIQkQPERAtxDf4ysipMj542V/GJ/olNP8Oxw2l4BQ2Y90KnybDKok1fp7guHmnP3q7WhnLyOZUqs='

const message = '18zFbe7GP8z7e7p66M7hyEZ83DzsrZfYnh: Udacity rocks!'

console.log(bitcoinMessage.verify(message,address,signature));//true