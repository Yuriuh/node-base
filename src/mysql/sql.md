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

- 操作符

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

