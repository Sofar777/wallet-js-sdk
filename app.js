/*
* @Author: Mr.Sofar
* @Date:   2018-05-28 12:11:17
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-14 16:39:22
*/
var shell = require("shelljs");
var argv = require('./argv')

// 命令映射表
var commandMap = {
	/**
	 * 生成 keystore 存储文件
	 * 	执行 generate脚本文件
	 *  携带 password 参数
	*/
	generate: "node generate.js -p " +  argv.p,
	/**
	 * eth 或者 合约代币 转账
	 * 执行 sign 脚本文件
	 * 携带 sendAddress,fileName,password,nonce,log,contractAddress参数
	*/
	sign: "node sign.js -s " +  argv.s + " -f " + argv.f + " -p " + argv.p + " -n " + argv.n + " -l " + argv.l  + " -c " + argv.c,
	/**
	 * 发送rawData数据
	 * 执行脚本 send 脚本文件 携带 log 参数
	*/
	send: "node send.js -l " + argv.l,
	/**
	 * 批量合约签名
	 * 执行 batch_sign 脚本文件 携带 sendAddress,password,nonce,fileName,log,contractAddress,airdropAddress
	*/
	batch: "node batch_sign.js -s " + argv.s + "  -p " + argv.p + " -n " + argv.n + " -f " + argv.f + " -l " + argv.l + " -c " + argv.c + "  -a " + argv.a
}
console.log(commandMap[argv.e])
shell.exec(commandMap[argv.e]);
