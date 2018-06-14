/*
* @Author: Mr.Sofar
* @Date:   2018-06-13 18:12:23
* @Last Modified by:   Mr.Sofar
* @Last Modified time: 2018-06-14 11:27:20
*/
var abi = require('ethereumjs-abi')

// returns the encoded binary (as a Buffer) data to be sent
var methodId = abi.methodID('batch', ['address', 'address', "address[]", "uint256[]"]).toString('hex')
var encoded = abi.rawEncode(["address","address",'address[]',"uint256[]"], ["0x57904bC2Cb9f63613Cce43f62976182b46A43e17","0x3AC115F79C009fdc98fBeC43DA445500A845445c",["0x19e3512fe5a6407813d5144ebeb2f47227f4f4b5","0x19e3512fe5a6407813d5144ebeb2f47227f4f4b5"],["10000000000000","100000000000000"]]).toString("hex")
console.log(methodId,encoded)