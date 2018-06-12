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
node app.js -e generate -p 定义密码

# 签名 
# -s 发币地址 
# -p 密码 
# -n nonce值 
# -f 接收地址文件 
# -c 合约地址 
# -l 定义日志文件名
node app.js -e sign -s 0x4d4210ee19a5079c60253b2c97bfc305e96b3fa8 -p 123123 -n 0 -f test.txt -l 18.log

# 发送交易
# -l 签名生成的日志文件名
node app.js -e send -l 18.log

```

### 文件目录结构介绍
```
.
├── app.js				// 项目主文件
├── README.md				// README
├── argv.js				// 命令行参数定义文件
├── generate.js				// 以太坊地址生成文件
├── keystore				// keystore 地址存放文件夹
├── package.json 
├── raw_data				// 签名日志存放文件夹
├── send.js				// 发送交易
├── sign.js				// 离线签名
├── test.js				// 测试代码
└── test.txt				// 接收地址
```

