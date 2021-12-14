const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545');

const abi_json = require('../build/contracts/SVGNFT.json');
const ABI = abi_json["abi"];

// add the proper contract address here
const CONTRACT_ADDRESS = "0x1fA1BD9279614859cA1EAc2fB0b44125ee644007";
const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

// change here the address of wallet that has nft's
const checkAddr = '0x93413CBa9DB3B8A345338676B647291ad64E8c2D';

// const checkAddr = '0xD5b7afaA470ef9553Ced3C5d605c40B39aFF61Ab';

// const data = myContract.methods.balanceOf('0x93413CBa9DB3B8A345338676B647291ad64E8c2D').call().then(results => console.log(results));

// const doto = myContract.methods.ownerOf(0).call().then(results => console.log(results)).catch(console.log("waiting waiting"));

// let variable;

// const diti = myContract.methods.tokenCounter.call().call().then(results => console.log(results));

async function tester()
{
	try {
		const data = await myContract.methods.tokenCounter.call().call()
		const data2 = await myContract.methods.balanceOf(checkAddr).call()
		console.log("complete: ", data);
		console.log("complete: ", data2);
		
		let uriArr = []

		for(let i = 0; i < data; i++)
		{
			let ownerAddr = await myContract.methods.ownerOf(i).call()
			if (ownerAddr == checkAddr)
			{
				const uri = await myContract.methods.tokenURI(i).call()
				uriArr.push(uri)
			}
		}
		// uriArr.forEach(arr => console.log(arr))
		// console.log(uriArr)
		return uriArr;
	} catch (err)
	{
		console.log("LOGGING ERROR: ", err);
	}
}
// tester();

const funker = async () => {
	const a = await tester();
	console.log(a);
  };
funker();
// console.log(diti)
// const data = contract.methods.balanceOf('0xD5b7afaA470ef9553Ced3C5d605c40B39aFF61Ab').encodeABI();

// Fetch data from remote website

