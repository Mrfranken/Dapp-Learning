const ethers = require('ethers');
const contractFile = require('./compile')

require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY;
console.log(1)


const provider = new ethers.providers.InfuraProvider('kovan', process.env.INFURA_ID)


const account_from = {
    privateKey: privateKey,
};
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;
console.log(1)

let wallet = new ethers.Wallet(account_from.privateKey, provider);
// let signer = provider.getSigner();

// const Deploy = async () => {
//     const factory = new ethers.ContractFactory(abi, bytecode, wallet);
//     const contractInstance = await factory.deploy(0);
//     const tx = await contractInstance.deployTransaction.wait();
//     console.log(tx);
//     contractAddress = contractInstance.address;
//     console.log('Contract deployed at address:', contractInstance.address);
// }
// Deploy();


const Trans = async () => {
    console.log('===============================1. Deploy Contract');
    console.log(`Attempting to deploy from account: ${wallet.address}`);
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    // Send Tx (Initial Value set to 5) and Wait for Receipt
    const deployedContract = await factory.deploy(
        'hello',
        'Dapp',
        1,
        100000000,
        {gasLimit: 8000000}
    );
    await deployedContract.deployed();
}
Trans()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });