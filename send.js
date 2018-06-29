/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 17:10:24
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-26 19:40:07
*/
var config = require('./config')
var web3 = require('./web3')(config.nodeEnv.formal);
var argv = require('./argv')
var fs = require("fs");
var rawIndex = 0;
var rawList = [];
fs.readFile('./raw_data/' + argv.l,(err,data) => {
	if(err){
		console.log(err);
	} else {
		rawList = [];
		data.toString().split("\n").forEach((v,i) => {
			if(v !== ""){
				rawList.push(v);
			}
		});
		setTimeout(() => {
			sendRawData(rawList[rawIndex])
		},500);
	}
})


function sendRawData(rawData) {
	if(rawData === ""){
		return false;
	}
	// web3.eth.sendSignedTransaction(rawData,(err,data) => {
	// 	if(err){
	// 		console.log("============");
	// 		console.log(err);
	// 		console.log("============");
	// 	}
	// 	try{
	// 		console.log(web3.utils.sha3(rawData));
	// 		setTimeout(function(){
	// 			if(rawIndex < rawList.length -1){
	// 				rawIndex ++;
	// 				sendRawData(rawList[rawIndex]);
	// 			}else{
	// 				console.log("总共处理：" + rawList.length + "条");
	// 			}
	// 		},500)
	// 	}catch(e){
	// 		console.log("*************");
	// 		console.log(e);
	// 	}
	// })
	web3.eth.sendSignedTransaction(rawData)
		.then(data => {
			console.log(data);
		})
		.catch(err => {
			console.log("singError");
			console.log(err);
		})
	// console.log(rawData)
	console.log(web3.utils.sha3(rawData));
	if(rawIndex < rawList.length -1){
		rawIndex ++;
		setTimeout(() => {
			sendRawData(rawList[rawIndex])
		},500);
	}else{
		console.log("总共处理：" + rawList.length + "条");
	}
}


	

