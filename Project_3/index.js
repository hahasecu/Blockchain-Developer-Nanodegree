const express = require('express')
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

app.get('*', function (req, res) {
    res.status(404).send('Not Found');
});



app.listen(port, () => console.log(`API is listening on port ${port}!`))