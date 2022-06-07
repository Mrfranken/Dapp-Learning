const {ethers} = require('ethers');
require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY;
const infura_id = process.env.INFURA_ID;
console.log('privateKey is: ' + privateKey);
console.log('infura id is: ' + infura_id);

const provider = new ethers.providers.InfuraProvider('kovan', infura_id)

const addressFrom = '0x998ede1C7B8d2F8099F0fBde395f30e76AeC7BDd';
const addressTo = '0xA6353f9f077d2CE0DAd84E1BE837f6802e5772DF';

provider.getBalance(addressFrom).then(
    (result) => {
        g = ethers.utils.formatEther(result);
        console.log(g)
    }
)


const balances = async () => {
    const balanceFrom = ethers.utils.formatEther(await provider.getBalance(addressFrom));

    const balanceTo = ethers.utils.formatEther(await provider.getBalance(addressTo));

    console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH`);
    console.log(`The balance of ${addressTo} is: ${balanceTo} ETH`);
};

balances();