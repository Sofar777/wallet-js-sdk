/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 12:11:17
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-08 12:47:18
*/
var shell = require("shelljs");
var argv = require('yargs')
	.option('f', {
    	alias : 'function',
    	default: 'generate',
    	type: 'string'
  	})
  	.argv;

var commandObj = {
	generate: "node " + argv.f + ".js -p " +  argv.p
}
console.log(commandObj[argv.f])
shell.exec(commandObj[argv.f]);
