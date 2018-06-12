/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 17:10:24
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-12 12:47:16
*/
var Web3 = require("web3")
var web3 = new Web3(new Web3.providers.HttpProvider("http://47.104.166.51:22000"));
var argv = require('./argv')
var fs = require("fs");
var rawIndex = 0;
var rawList = [];
fs.readFile('./raw_data/' + argv.l,(err,data) => {
	if(err){
		console.log(err);
	} else {
		rawList = data.toString().split("\n");
		sendRawData(rawList[rawIndex]);
	}
})


function sendRawData(rawData) {
	if(rawData === ""){
		return false;
	}
	web3.eth.sendSignedTransaction(rawData,(err,data) => {
		setTimeout(function(){
			if(rawIndex < rawList.length){
				rawIndex ++;
				sendRawData(rawList[rawIndex]);
			}else {
				console.log("任务完成，总发出"+ rawList.length + "条");
			}
		},500)
		console.log(web3.utils.sha3(rawData));
		console.log("==========================================")
	})
	
	
}

	

