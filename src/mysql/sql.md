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