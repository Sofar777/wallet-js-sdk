## WALLET JS SDK
Author: [Mr.Sofar](http://sofar.top)
### 功能
- 生成钱包地址
- 离线签名
- 广播交易

### 安装使用
```
# 进入文件目录
cd /your/path

# 安装依赖
npm i

# 生成新地址
# -p 密码
node app.js -e generate -p 123

# 签名 
# -s 发币地址 
# -p 密码 
# -n nonce值 
# -f 接收地址文件 
# -c 合约地址 
# -l 定义rawData生成日志文件名
node app.js -e sign -s 0x4d4210ee19a5079c60253b2c97bfc305e96b3fa8 -p 123 -n 0 -f test.txt -l 18.log

# 签名 批量发币
# -s 发币地址 
# -p 密码 
# -n nonce值 
# -f 接收地址文件 
# -c 合约地址 
# -l 定义rawData生成日志文件名
# -a 空投智能合约地址 
node batch_sign.js -s 0x3AC115F79C009fdc98fBeC43DA445500A845445c  -p 123 -n 71 -f test.txt -l 18.log -c 0x57904bC2Cb9f63613Cce43f62976182b46A43e17  -a 0x7249fF07af7c324Ff74a1991A67d2689A4480230


# 发送交易
# -l 签名生成的日志文件名
node app.js -e send -l 18.log
```

### 文件目录结构介绍
```
.
├── raw_data                // 签名日志存放文件夹
├── keystore                // keystore 地址存放文件夹
├── app.js                  // 项目主文件
├── argv.js                 // 命令行参数定义文件 
├── batch_sign.js           // 批量发币合约签名
├── generate.js             // 以太坊地址生成文件
├── sign.js                 // 离线签名
├── send.js                 // 发送交易
├── README.md               // README
├── package.json  
├── test.js                 // 测试代码
└── test.txt                // 接收地址
```
### 工具
[input data 生成器](https://abi.hashex.org/)

