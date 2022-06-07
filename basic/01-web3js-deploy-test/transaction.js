const {ethers} = require('ethers');
require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY;
const infura_id = process.env.INFURA_ID;
console.log('privateKey is: ' + privateKey);
console.log('infura id is: ' + infura_id);

const provider = new ethers.providers.InfuraProvider('kovan', infura_id)


const account_from = {
    privateKey: privateKey,
};
const addressTo = '0xA6353f9f077d2CE0DAd84E1BE837f6802e5772DF';

let wallet = new ethers.Wallet(account_from.privateKey, provider);


const send = async () => {
    console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

    // send eth
    // const tx = {
    //     to: addressTo,
    //     value: ethers.utils.parseEther('0.05'),
    // };

    // send msg
    const tx = {
        to: addressTo, // value: ethers.utils.parseEther('0.05'),
        data: "0x496c6f7665457468657265756d"
    };

    // send msg or ether and configure gasLimit and gasPrice
    // const tx = {
    //     to: addressTo,
    //     value: ethers.utils.parseEther('0.01'),
    //     data: "0x496c6f7665457468657265756d",
    //     gasLimit: 21500,
    //     gasPrice: ethers.utils.parseUnits('1.5', 'gwei'),
    // };

    const createReceipt = await wallet.sendTransaction(tx);
    await createReceipt.wait();
    console.log(`Transaction successful with hash: ${createReceipt.hash}`);
    console.log(JSON.stringify(createReceipt));

    // wallet.sendTransaction(tx).then((msg) => {
    //     console.log(JSON.stringify(msg));
    //     console.log(`Transaction successful with hash: ${msg.hash}`);
    // })

};

send().catch((error) => {
    console.error(error);
    process.exit(1);
})