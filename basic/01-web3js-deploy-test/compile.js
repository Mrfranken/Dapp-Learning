const fs = require('fs')
const solc = require('solc')

const source = fs.readFileSync('Incrementer.sol', 'utf-8');


// compile solidity
const input = {
    language: 'Solidity', sources: {
        'Incrementer.sol': {
            content: source,
        },
    }, settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};


const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

module.exports = contractFile;