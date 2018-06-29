/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 12:47:28
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-26 19:48:46
*/
var keythereum = require("keythereum");
var Tx = require('ethereumjs-tx');
var BigNumber = require('bignumber.js');
var fs = require('fs');
var abi = require('ethereumjs-abi');
var argv = require('./argv')
var config = require('./config')
var web3 = require('./web3')(config.nodeEnv.formal);
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
let SCRIPT_STATUS = false;
let logFilePath = "./raw_data/" + argv.l;
console.log(argv);
fs.readFile(argv.f,'utf-8',function(err,data){  
    if(err){  
        console.log("error");  
    }else{  
    	var _arr = [[],[]];
    	// console.log(data.toString())
    	let lineData = data.toString().split("\r");
    	lineData.forEach((v,i) => {
    		let item = v.split("\t")
    		if(item[0] !== ""){
    			_arr[0].push(item[0]);
    			_arr[1].push(web3.utils.toWei(item[1]));
    		}
    		if(((i+1)%100 === 0 && i !== 0) || i === lineData.length-1){
    			if(_arr[0].length > 0){
    				receiveList.push(_arr);
    				_arr = [[],[]];
    			}
    		}
    	})
    	console.log(receiveList)
    	singData(receiveList[receiveIndex],nonce)
    }  
});
function singData(arr,_nonce){
	let rawTx = {
		nonce: web3.utils.fromDecimal(new BigNumber(_nonce)),
	    from: argv.s,
	    // gasLimit: '0x6ddd00', //720000
	    gasLimit: web3.utils.toHex(7200000), //5000000
	    gasPrice: '0x012a05f200' //5Gwei
	}
	if(argv.a !== "undefined"){
		// 合约代币批量
		rawTx.to = argv.a;
		// 方法hash + 地址 + 十六进制 value
		// console.log(jointData(arr));
		rawTx.data = jointData(arr);

		let tx = new Tx(rawTx);
		tx.sign(privateKey);
		console.log("0x" + tx.serialize().toString('hex'));
		console.log("=========================\n\n\n");
		if(!SCRIPT_STATUS){
			if(fs.existsSync(logFilePath)){
				fs.unlinkSync(logFilePath);
			}
			SCRIPT_STATUS =  true;
		}
		appendFile(tx);
	} else {
		console.log("请携带空投合约参数");
	}
}
// 写入文本
function appendFile(tx){
	fs.appendFile(logFilePath,"0x" + tx.serialize().toString('hex') + "\n",function(err,data){
		if(err){
			console.log(err);
		}else{
			if(receiveIndex < receiveList.length - 1){
				nonce ++;
				receiveIndex ++;
				singData(receiveList[receiveIndex],nonce)
			}
		}
	})
}
function jointData(arr){
	let methodId = abi.methodID('batch', ['address', "address[]", "uint256[]"]).toString('hex')
	let encoded = abi.rawEncode(["address",'address[]',"uint256[]"], [argv.c,arr[0],arr[1]]).toString("hex")
	return "0x" + methodId + encoded;
}

