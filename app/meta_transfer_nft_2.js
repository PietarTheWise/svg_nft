let Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')


const abi_json = require('../build/contracts/SVGNFT.json');
// console.log()         0xea7a49Fb9411Cb22384225E876747a205BDa9288

// proper contract address here
const contractAddress = "0x1fA1BD9279614859cA1EAc2fB0b44125ee644007";


// proper contract address here
const address1 = '*****YOUR WALLET ADDRESS*****';
const privateKey1 = Buffer.from('*****YOUR PRIVATE KEY*****', 'hex');

const toAddr = '*****TO ADDRESS*****'

let contract = new web3.eth.Contract(abi_json["abi"], contractAddress);

// transferer(address _from, address _to, uint _tokenId) public
// const data = contract.methods._safeTransfer(address1, toAddr, 3, "").encodeABI();
const data = contract.methods.transferer(address1, toAddr, 3).encodeABI();


web3.eth.getTransactionCount(address1, (err, txCount) => {
	const txObject = {
		nonce: web3.utils.toHex(txCount),
		gasLimit: web3.utils.toHex(1000000), // 
		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
		to: contractAddress,
		data: data
	}
	// 5.9864

	const tx = new Tx(txObject);
	tx.sign(privateKey1);

	const serializedTX = tx.serialize()
	const raw = '0x' + serializedTX.toString('hex')

	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('err: ', err, 'txHash:', txHash)
	})

})
