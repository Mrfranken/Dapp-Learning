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

let wallet = new ethers.Wallet(account_from.privateKey, provider);
// ========== interact with contract, need to provide wallet ==========
const incrementer = new ethers.Contract(contract_addr, abi, wallet);

let _value = 15

const increment = async () => {
    console.log(`Calling the increment by ${_value} function in contract at address: ${contract_addr}`);
    const createReceipt = await incrementer.increment(_value);
    await createReceipt.wait();
    console.log(`Tx successful with hash: ${createReceipt.hash}`);

    number = await incrementer.getNumber()
    console.log(`current number is ${number}`);
}


increment().catch((error) => {
    console.error(error);
    process.exit(1);
})