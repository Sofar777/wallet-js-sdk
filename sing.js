/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 12:47:28
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-08 14:52:22
*/
var keythereum = require("keythereum");
var Tx = require('ethereumjs-tx');
var Web3 = require("web3")
var BigNumber = require('bignumber.js');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://47.104.166.51:22000"));

sendAddr = "0x19e3512fe5a6107813d5144ebeb2f47227f4f4b8";
receiveAddr = "0x19e3512fe5a6107813d5144ebeb2f47227f4f4b7";
value = 100;

function singData(receiveAddr,value){
	var keyObject = keythereum.importFromFile(sendAddr, "./");
	var privateKey = keythereum.recover("test123", keyObject);

	rawTx = {
	    nonce: 0,
	    from: sendAddr,
	    gasLimit: '0xffff',
	    to: receiveAddr,
	    value: web3.utils.fromDecimal(web3.utils.toWei(new BigNumber(value).toString()))
	}

	tx = new Tx(rawTx);
	tx.sign(privateKey);
	console.log("0x" + tx.serialize().toString('hex'));
	
}
singData();
