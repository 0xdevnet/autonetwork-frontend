import Web3 from "web3";
import { ETH_SENDER_CONTRACT_ADDRESS, FEE, ZERO_ADDRESS } from "./constants";
import BigNumber from "bignumber.js";


export const getCallData = (time: any, recipient: string, senderContract: any) => {
    const timestamp = Math.floor((new Date()).valueOf() / 1000 + time * 60);
    try {
        const callData = senderContract.methods.sendEthAtTime(timestamp, recipient).encodeABI();
        return callData;
    } catch (e) {
        return -1;
    }
}

export const newReq = async (time: any, recipient: any, amount: string, registryContract: any, senderContract: any, web3: any) => {
    const callData = getCallData(time, recipient, senderContract);
    const amount_wei = Web3.utils.toWei(amount, 'ether');
    const fee  = Web3.utils.toWei(FEE, 'ether');
    const big_amount = new BigNumber(amount_wei);
    const big_fee = new BigNumber(fee);
    const total_amount = big_amount.plus(big_fee);
    const accounts = await web3.eth.getAccounts();
    
    console.log(accounts[0]);
    try {
        const res = registryContract.methods.newReq(
            ETH_SENDER_CONTRACT_ADDRESS,
            ZERO_ADDRESS,                  
            callData,
            amount_wei,                     
            false,                          
            false,              
        )
        .send({from: accounts[0], value: total_amount})
        .on('error', (e: any) => console.error('error!!!', e))
        .on('transactionHash', () => console.info('Your transaction has been recorded'))
        .on('confirmation', () => console.info('You have successfully claimed your airdrop'));

        console.info('The result of newReq()', res);
    } catch (error) {
        console.error("call newReq()", error);
    }
}
