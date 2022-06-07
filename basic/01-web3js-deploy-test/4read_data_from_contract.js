const ethers = require('ethers');
const contractFile = require('./compile')

const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY;
const infura_id = process.env.INFURA_ID;
const contract_addr = process.env.CONTRACT_ADDR;

const provider = new ethers.providers.InfuraProvider('kovan', infura_id)


const account_from = {
    privateKey: privateKey,
};

// ========== if only read data from contract, no need to need wallet ==========
const incrementer = new ethers.Contract(contract_addr, abi, provider);

const get_number = async () => {
    console.log(`Making a call to contract at address: ${contract_addr}`);
    number = await incrementer.getNumber()
    console.log(`number is ${number}`);
}


get_number().catch((error) => {
    console.error(error);
    process.exit(1);
})