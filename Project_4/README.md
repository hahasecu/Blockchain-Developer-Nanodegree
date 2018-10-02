# Build a Private Blockchain Notary Service

## Why this project?
Connecting a web API to a private blockchain is a huge first step toward developing web applications that are consumable by other of web clients. This is an important way to reach users with your blockchain applications and is a core skill of any blockchain developer. Including to notarize digital assets using wallet signatures and message verification in code is a huge step to be able to implement production ready applications.<br><br>

This project also helps set you up for success later in the program. Later, you’ll be programming blockchain applications that use similar features using smart contracts. Smart contracts are an exciting blockchain concept that you'll be learning all about in the next course!

## What will I learn?

### You’ll configure the blockchain to:

Notarize ownership of a digital asset using message signatures and validation <br>
Accept user requests using registration endpoints<br>
Implement a mempool for the message queue <br>
Allow search by blockchain wallet address or by specific attribute (e.g.star block hash, star block height) <br>


## How does this help my career?

In this project, you’ll demonstrate creating and working with web APIs that notarizes ownership of a digital asset using message signatures and validation. To do so, you’ll demonstrate your understanding of many core blockchain concepts such as encoding and decoding transaction data, configuring your blockchain to handle wallet identities, and configuring your blockchain to properly handle user requests.

## User stories
- Users will be able to notarize star ownership using their blockchain identity.
- Your application will provide a message to your user allowing them to verify their wallet address with a message signature.
- Once a user verifies their wallet address, they have the right to register the star.
- Once registered, each star has the ability to share a story.
- Users will be able to look up their star by hash, block height, or wallet address.

- RA 13h 03m 33.35sec, Dec -49° 31’ 38.1” Mag 4.83 Cen

## Getting Started
```
git clone ...
cd Project_3
npm install
```

## Running API
```
node index.js

```

## Testing
```
 GET /block/{BLOCK_HEIGHT}
 curl http://localhost:8000/block/0

 POST /block
 curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"body":"some body"}'


 [Or use Postman to test](https://www.getpostman.com/)
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
