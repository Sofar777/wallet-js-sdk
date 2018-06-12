## WALLET JS SDK

### 功能
1、生成钱包地址
2、离线签名
3、广播交易

### 安装
```
# 进入文件目录
cd /your/path

# 安装依赖
npm i

# 生成新地址
node app.js -e generate -p 密码

# 签名 
node app.js -e signEth -s 7cb1ae12d905ece79a4666b4dc5a04d9e312564d -p 123123 -n 0 -f test.txt
```

### 文件目录结构介绍
.
├── README.md
├── app.js 					# 主文件
├── generate.js 			# 生成以太坊地址
├── keystore 				# keystore存储文件
├── package-lock.json
├── package.json 			
├── raw_data 				# 离线签名数据
├── sing-eth.js 			# ETH转账 离线签名
└── test.js 				# 测试文件

### 使用命令
```
node app.js -g
```

