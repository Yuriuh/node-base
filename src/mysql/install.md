### 安装 mysql 镜像

```
docker pull mysql:latest
```

### 启动 mysql 进程

```
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234qwer mysql
```

### 进入 mysql 交互界面

```
docker exec -it mysql bash
```

### 以管理员身份登录

```
mysql -u root -p
```

### 查看编码

```
show variables like 'character_set\_%';
```

### 查看数据库

```
show databases;
```
