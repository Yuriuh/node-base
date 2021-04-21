### 生成 CA 私钥
openssl genrsa -des3 -out ca-pri-key.pem 1024

password: 1234qwer

### 生成 CA 公钥
openssl req -new -key ca-pri-key.pem -out ca-pub-key.pem

password: 1234qwer

### 生成 CA 证书
使用 x.509 证书标准，通过证书请求 ca-pub-key.pem 生成证书，并使用私钥 ca-pri-key.pem 加密，然后把证书保存到 ca-cert.crt 文件中

openssl x509 -req -in ca-pub-key.pem -signkey ca-pri-key.pem -out ca-cert.crt

### 生成服务器私钥
openssl genrsa -out server-key.pem 1024

### 生成服务器公钥
openssl req -new -key server-key.pem -out server-scr.pem

### 生成服务器证书
openssl x509 -req -CA ca-cert.crt -CAkey ca-pri-key.pem -CAcreateserial -in server-scr.pem -out server-cert.crt