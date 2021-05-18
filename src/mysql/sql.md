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