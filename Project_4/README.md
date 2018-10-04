# Build a Private Blockchain Notary Service

## Why this project?
Connecting a web API to a private blockchain is a huge first step toward developing web applications that are consumable by other of web clients. This is an important way to reach users with your blockchain applications and is a core skill of any blockchain developer. Including to notarize digital assets using wallet signatures and message verification in code is a huge step to be able to implement production ready applications.<br><br>

This project also helps set you up for success later in the program. Later, you’ll be programming blockchain applications that use similar features using smart contracts. Smart contracts are an exciting blockchain concept that you'll be learning all about in the next course!

## What will I learn?

### You’ll configure the blockchain to:

- Notarize ownership of a digital asset using message signatures and validation <br>
- Accept user requests using registration endpoints<br>
- Implement a mempool for the message queue <br>
- Allow search by blockchain wallet address or by specific attribute (e.g.star block hash, star block height) <br>

<!--
## How does this help my career?

In this project, you’ll demonstrate creating and working with web APIs that notarizes ownership of a digital asset using message signatures and validation. To do so, you’ll demonstrate your understanding of many core blockchain concepts such as encoding and decoding transaction data, configuring your blockchain to handle wallet identities, and configuring your blockchain to properly handle user requests. -->

## User stories

- As a user, I can requst to validate my identity with a wallet address.
- As a user，I can request access to register a star with wallet address and signature.
- As a user, I can register a star if I verify my identity successfully.
- As a user, I can look up stars with wallet address.
- As a user, I can look up stars with hash.
- As a user, I can look up stars with height.

## Getting Started
```
git clone ...
cd Project_4
npm install
```

## Running API
```
node index.js

```

## Testing
```
 POST /requestValidation
 curl -X "POST" "http://localhost:8000/requestValidation" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ"
}'


 POST /message-signature/validate
 curl -X "POST" "http://localhost:8000/message-signature/validate" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "signature": "H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU="
}'

POST /block
curl -X "POST" "http://localhost:8000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "star": {
    "dec": "-26° 29'\'' 24.9",
    "ra": "16h 29m 1.0s",
    "story": "Found star using https://www.google.com/sky/"
  }
}'

GET /stars/address:[ADDRESS]
curl "http://localhost:8000/stars/address:142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ"

GET /stars/hash:[HASH]
curl "http://localhost:8000/stars/hash:a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f"

curl "http://localhost:8000/stars/hash:491db0947b549c60bcb71efc74ec2a1130e265c9386c69fe81e297a3c2cff48d"

491db0947b549c60bcb71efc74ec2a1130e265c9386c69fe81e297a3c2cff48d

GET /block/[HEIGHT]
curl "http://localhost:8000/block/1"

```

<!--

## Deployment

- It is unnecessary to deploy this API -->


## Built With

- Javascript
- Nodejs
- LevelDB
- Crypto-js
- Experss.js
- bitcoinjs-message
- body-parser

<!--

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds -->

<!-- ## Contributing -->

<!-- Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->
<!--
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). -->

## Authors

- [Adrianacmy](http://adrianawritescode.com)

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

## License

This project is licensed under the MIT License

<!-- ## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc -->
