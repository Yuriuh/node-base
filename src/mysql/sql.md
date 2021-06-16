### 查询数据

#### 查询

- 检索单个列

```sql
SELECT prod_name FROM Products
```

- 检索多个列

```sql
SELECT prod_id, prod_name, prod_price FROM Products;
```

- 检索所有列

```sql
SELECT * FROM Products;
```

- 检索不同的值

```sql
SELECT DISTINCT vend_id FROM Products;
```

- 限制结果

```sql
SELECT prod_name FROM Products LIMIT 5;
```

```sql
SELECT prod_name FROM Products LIMIT 5 OFFSET 5;
```

#### 排序

- 按单列排序

```sql
SELECT prod_name FROM Products ORDER BY prod_name;
```

- 按多列排序

```sql
SELECT prod_id, prod_price, prod_name FROM Products ORDER BY prod_price, prod_name;
```

- 按列位置顺序

```sql
SELECT prod_id, prod_price, prod_name FROM Products ORDER BY 2, 3;
```

- 指定排序方向

```sql
SELECT prod_id, prod_price, prod_name FROM Products ORDER BY prod_price DESC;
```

```sql
SELECT prod_id, prod_price, prod_name FROM Products ORDER BY prod_price DESC, prod_name;
```

#### 过滤

##### 操作符

```
=
<> !=
<
>
<=
>=
BETWEEN
IS NULL
```

##### 基本过滤
- 检查单个值

```sql
SELECT prod_name, prod_price FROM Products WHERE prod_price < 10;
```

- 不匹配检查

```sql
SELECT vend_id, prod_name FROM Products WHERE vend_id <> 'DLL01';
```

- 范围值检查

```sql
SELECT prod_name, prod_price FROM Products WHERE prod_price BETWEEN 5 AND 10;
```

- 空值检查

```sql
SELECT prod_name FROM Products WHERE prod_price IS NULL;
```

##### 高级过滤

- AND操作符

```sql
SELECT prod_id, prod_price, prod_name FROM Products WHERE vend_id = 'DLL01' AND prod_price <= 4;
```

- OR操作符

```sql
SELECT prod_id, prod_price, prod_name FROM Products WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';
```

- 括号操作符（优先级）

```sql
SELECT prod_name, prod_price FROM Products WHERE (vend_id = 'DLL01' OR vend_id = 'BRS01') AND prod_price >= 10;
```

- IN操作符

```sql
SELECT prod_name, prod_price FROM Products WHERE vend_id IN ('DLL01','BRS01') ORDER BY prod_name;
```

- NOT操作符

```sql
SELECT prod_name, prod_price FROM Products WHERE vend_id NOT IN ('DLL01','BRS01') ORDER BY prod_name;
```

##### 通配符过滤

- LIKE操作符
  - 百分号（%）：任意字符，可多可少

```sql
SELECT prod_id, prod_name FROM Products WHERE prod_name LIKE 'Fish%';

SELECT prod_id, prod_name FROM Products WHERE prod_name LIKE '%bean bag%';
```

  - 下划线（_）：任意字符，单个

```sql
SELECT prod_id, prod_name FROM Products WHERE prod_name LIKE '__ inch teddy bear';

SELECT prod_id, prod_name FROM Products WHERE prod_name LIKE '% inch teddy bear';
```

- REGEXP操作符
  - ^[]：以列表中的某个字符开头

```sql
SELECT cust_contact FROM Customers WHERE cust_contact REGEXP '^[JM]' ORDER BY cust_contact;
```

- 技巧
  - 避免过度使用
  - 避免用在搜索模式的开始处
  - 注意通配符的位置

#### 计算

##### 计算字段

- 计算字段是运行时在`SELECT`语句内创建的

##### 拼接字段

- 定义：拼接（concatenate）：将值联结到一起构成单个值
- 例子

```sql
SELECT Concat(vend_name, ' (', vend_country, ')') FROM Vendors ORDER BY vend_name;
```

```sql
SELECT Concat(RTRIM(vend_name), ' (', RTRIM(vend_country), ')') FROM Vendors ORDER BY vend_name;
```

```sql
SELECT Concat(RTRIM(vend_name), ' (', RTRIM(vend_country), ')') AS vend_title FROM Vendors ORDER BY vend_name;
```

##### 执行算术计算

- 算术操作符
  - + - * /

- 例子

```sql
SELECT prod_id, quantity, item_price, quantity*item_price AS expanded_price FROM OrderItems WHERE order_num = 20008;
```

#### 函数

##### 问题

- 每一个DBMS都有特定的函数，SQL函数是不可移植的

##### 使用函数

- 文本处理函数
  - 常用函数
    - LEFT()
    - LENGTH()
    - LOWER()
    - LTRIM()
    - RIGHT()
    - RTRIM()
    - SUBSTRING()
    - SOUNDEX()
    - UPPER()
  - 例子：

```sql
SELECT cust_name, cust_contact FROM Customers WHERE cust_contact = 'Michael Green';
```

```sql
SELECT cust_name, cust_contact FROM Customers WHERE SOUNDEX(cust_contact) = SOUNDEX('Michael Green');
```

- 日期和时间处理函数
  - 常用函数
    - YEAR()
    - MONTH()

```sql
SELECT order_num FROM Orders WHERE YEAR(order_date) = 2020;
```

- 数值处理函数
  - 常用函数
    - ABS()：返回一个数的绝对值
    - COS()：返回一个角度的余弦
    - EXP()：返回一个数的指数值
    - PI()：返回圆周率π的值
    - SIN()：返回一个角度的正弦
    - SQRT()：返回一个数的平方根
    - TAN()：返回一个角度的正切

#### 汇总

##### 聚集函数

- 定义：对某行运行的函数，计算并返回一个值

- 常用函数
  - AVG()
  - COUNT()
  - MAX()
  - MIN()
  - SUM()