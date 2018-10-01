# RESTful Web API with Express.js

## Why this project?

This project introduces you to the fundamentals of web APIs with Node.js frameworks. Using your own private blockchain to create a web API is a huge first step toward developing your own web applications that are consumable by a variety of web clients. Later in this program, you’ll be programming blockchain technologies that utilize these similar features using smart contracts.

## What will I learn?

You will learn to create and manage a web API with a Node.js framework to interact with your private blockchain. You’ll get first hand experience generating API endpoints and configuring the endpoints response that can be consumable by many types of web clients. This project helps build on the skills you’ve learned so far an allow you to apply these skills using real world technologies to get hands on with the tools used to create web APIs.


## How does this help my career?

Understanding web APIs and ways to create them will help you build user applications later in the program.

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
