/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 12:47:28
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-11 18:49:46
*/
var keythereum = require("keythereum");
var Tx = require('ethereumjs-tx');
var Web3 = require("web3")
var BigNumber = require('bignumber.js');
var fs = require('fs');
var argv = require('./argv')
var web3 = new Web3(new Web3.providers.HttpProvider("http://47.104.166.51:22000"));
var keyObject = keythereum.importFromFile(argv.s, "./");
var privateKey = keythereum.recover(argv.p.toString(), keyObject);

const readline = require('readline')

const lineData = readline.createInterface({
    input: fs.createReadStream(argv.f)
});

var nonce = argv.n;
var thisIndex = 1;
// lineData.on('line', (line) => {
// 	let _nonce = nonce;
// 	let data = line.split("\t");
//     setTimeout(() => {
//     	singData(data[0],data[1],_nonce)
//     },thisIndex*50);
//     thisIndex += 1;
//     nonce ++;
// });
let receiveList = [];
let receiveIndex = 0;
console.log(argv.f);
fs.readFile("test.txt",'utf-8',function(err,data){  
    if(err){  
        console.log("error");  
    }else{  
    	data.toString().split("\n").forEach((v,i) => {
    		let _arr = v.split("\t")
    		if(_arr[0] !== ""){
    			let _obj = {
	    			address: _arr[0],
	    			value: _arr[1]
	    		}
	    		receiveList.push(_obj);
    		}
    	})
    	// console.log(receiveList);
    	// console.log(receiveList[receiveIndex].address,receiveList[receiveIndex].value)
    	// singData(receiveList[receiveIndex].address,receiveList[receiveIndex].value,nonce)
		console.log(web3);
		console.log(web3.sha3("测试"));
    }  
}); 

function singData(receiveAddr,value,_nonce){
	let rawTx;
	if(!argv.c){
		rawTx = {
		    nonce: web3.utils.fromDecimal(new BigNumber(_nonce)),
		    from: argv.s,
		    gasLimit: '0xffff',
		    to: receiveAddr,
		    value: web3.utils.fromDecimal(web3.utils.toWei(new BigNumber(value).toString()))
		}
	}else {
		rawTx = {
		    nonce: web3.utils.fromDecimal(new BigNumber(_nonce)),
		    from: argv.s,
		    gasLimit: '0xffff',
		    to: argv.c,
		    // 方法hash + 地址 + 十六进制 value
		    data: "0xa9059cbb" + jointZero(receiveAddr.substr(2)) + jointZero(web3.utils.fromDecimal(web3.utils.toWei(new BigNumber(value).toString())).substr(2)),
		}
		console.log(rawTx);
	}
	tx = new Tx(rawTx);
	tx.sign(privateKey);
	console.log("0x" + tx.serialize().toString('hex'));
	console.log("=========================\n\n\n");

	if(receiveIndex < receiveList.length - 1){
		nonce ++;
		receiveIndex ++;
		console.log(receiveList[receiveIndex].address);
		singData(receiveList[receiveIndex].address,receiveList[receiveIndex].value,nonce)
	}
}

function jointZero(str){
	let txt = '';
	for(let i = 0; i < 64 - str.length; i++){
		txt += 0;
	}
	return txt + str;
}
