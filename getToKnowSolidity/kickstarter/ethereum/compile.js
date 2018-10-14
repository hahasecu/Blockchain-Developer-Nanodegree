const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');


const buildPath = path.resolve(__dirname, 'build');

// remove one folder at a time
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source, 1).contracts;
// console.log(output);

// check if the dir exist, otherwise, create it
fs.ensureDirSync(buildPath);

for(let contract in output){

    // write out a json file
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}