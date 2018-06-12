/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 15:07:15
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-11 18:51:04
*/

var argv = require('yargs')
	// 方法
	.option('e', {
    	alias : 'execute',
    	default: 'generate',
    	type: 'string'
  	})
  	//转账地址
  	.option('s', {
    	alias : 'sendAddress',
    	type: 'string'
  	})
  	//合约地址
  	.option('c', {
    	alias : 'contractAddress',
    	type: 'string'
  	})
  	// 文件名称
  	.option('f', {
    	alias : 'fileName',
    	type: 'string'
  	})
    // nonce
    .option('n', {
      alias : 'nonce',
      type: 'string'
    })
    // log
    .option('l', {
      alias : 'log',
      type: 'string'
    })
    .argv;
module.exports = argv;