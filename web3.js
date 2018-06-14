var Web3 = require("web3")

function web3Env(node){
	let web3 = new Web3(new Web3.providers.HttpProvider(node));
	return web3;
}

module.exports = web3Env;