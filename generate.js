/*
* @Author: Mr.Sofar
* @Date:   2018-06-08 19:17:40
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-19 16:42:08
*/
var keythereum = require("keythereum");
var params = { keyBytes: 32, ivBytes: 16 };
var dk = keythereum.create(params);
var fs = require('fs');
var argv = require('yargs')
  .option('p', {
      alias : 'password',
      default: '123123',
      type: 'string'
    })
    .argv;
var password = argv.p.toString();
if(!fs.existsSync(__dirname + "/keystore")){
  fs.mkdirSync(__dirname + "/keystore");
}
var options = {
  	kdf: "pbkdf2",
  	cipher: "aes-128-ctr",
  	kdfparams: {
    	c: 262144,
    	dklen: 32,
    	prf: "hmac-sha256"
  	}
};
var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
console.log(keythereum.exportToFile(keyObject,"./keystore"));


