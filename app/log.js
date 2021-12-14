const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545');

const abi_json = require('../build/contracts/SVGNFT.json');
const ABI = abi_json["abi"];

// add proper contract address
const CONTRACT_ADDRESS = "0x1fA1BD9279614859cA1EAc2fB0b44125ee644007";
const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

let options = {
    // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
};

myContract.getPastEvents('Transfer', options)
    .then(results => console.log(results))
    .catch(err => {throw err});

// 0xdf258242b78cbc51df26337d243ea14f04c08d06eea6db55f762f057d233f213
