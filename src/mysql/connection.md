### 安装 mysql2

```
npm i mysql2 -S
```

### 连接 mysql

```javascript
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '1234qwer',
  database: 'test'
});

// simple query
connection.query(
  'SELECT prod_name, prod_price FROM Products WHERE prod_price BETWEEN 5 AND 10;',
  function(err, results, fields) {
    if (err) console.log('err', err)
    console.log(results);
  }
);

connection.end()
```