let Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')

const fs = require("fs");

const abi_json = require('../build/contracts/SVGNFT.json');
// console.log()
const contractAddress = "*****YOUR CONTRACT ADDRESS*****";

const address1 = '*****YOUR WALLET ADDRESS*****';
const privateKey1 = Buffer.from('*****YOUR PRIVATE KEY*****', 'hex');

let contract = new web3.eth.Contract(abi_json["abi"], contractAddress);
// find out which function to use and convert it to data that w can use in txObject
// web3.eth.defaultAccount = web3.eth.accounts[0];
let svg = fs.readFileSync("../img/triangle.svg", {encoding: "utf8"});
const data = contract.methods.create(svg).encodeABI();

web3.eth.getTransactionCount(address1, (err, txCount) => {
	const txObject = {
		nonce: web3.utils.toHex(txCount),
		gasLimit: web3.utils.toHex(1000000), // 
		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
		to: contractAddress,
		data: data
	}

	const tx = new Tx(txObject);
	tx.sign(privateKey1);

	const serializedTX = tx.serialize()
	const raw = '0x' + serializedTX.toString('hex')

	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('err: ', err, 'txHash:', txHash)
	})

})

