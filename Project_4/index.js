const express = require('express')
const bitcoinMessage = require('bitcoinjs-message')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000

const Block = require('./block')
const BlockChain = require('./simpleChain')

let blockchain = new BlockChain();


app.get('/block/:blockHeight', (req, res) => {
    let height = req.params.blockHeight;

    blockchain.getBlock(height)
        .then(response =>
            res.send(response))
        .catch(err => {
            res.status(404).json({
                "status": 404,
                "message": "Block not found"
            })
        })
})


app.post('/block', (req, res) => {
    let postody = req.body;
    if (!postody.body) {
        res.status(400).json({
            "status": 400,
            "message": "Please enter data body"
        })
    } else {
        blockchain.addBlock(new Block(postody.body))
            .then(
                async () => {
                    const height = await blockchain.getBlockHeight()
                    const response = await blockchain.getBlock(height)

                    res.status(201).send(response);
                }
            ).catch(err => res.json({
                "err": err
            }))
    }
})


let response = {
    "address": "",
    "requestTimeStamp": "",
    "message": "",
    "validationWindow": 300
}

app.post('/requestValidation', (req, res) => {
    if (!response.requestTimeStamp) {
        response.requestTimeStamp = new Date().getTime().toString().slice(0, -3);
    }

    let walletAddress = req.body.address;

    if (!walletAddress) {
        res.status(400).json({
            "status": 400,
            "message": "Please provide your wallet address"
        })
    } else {
        response.address = walletAddress;
        let newTimeStamp = new Date().getTime().toString().slice(0, -3);
        let timeDelta = newTimeStamp - response.requestTimeStamp;

        if (timeDelta >= 300) {
            response.validationWindow = 300,
                response.requestTimeStamp = new Date().getTime().toString().slice(0, -3);
        } else {
            response.validationWindow = 300 - timeDelta;
        }
        response.message = `${response.address}:${response.requestTimeStamp}:starRegistry`
        res.send(response);
    }
})



app.post('/message-signature/validate', (req, res) => {
    let walletAddress = req.body.address;
    let signature = req.body.signature;
    console.log(walletAddress, signature);
    if (!walletAddress || !signature) {
        res.status(400).json({
            "status": 400,
            "message": "Please provide your wallet address"
        })
    } else {
        let { address, requestTimeStamp, message, validationWindow, messageSignature } = response;
        let valid = bitcoinMessage.verify(message, address, signature);
        response.messageSignature = valid ? 'valid' : invalid;
        res.status(200).json({
            "registerStar": valid ? true : false,
            "status": {
                "address": address,
                "requestTimeStamp": requestTimeStamp,
                "message": message,
                "validationWindow": validationWindow,
                "messageSignature": messageSignature
            }
        })
    }
})


app.get('*', function (req, res) {
    res.status(404).send('Not Found');
});



app.listen(port, () => console.log(`API is listening on port ${port}!`))