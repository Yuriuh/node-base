### 安装 mysql 镜像

```
docker pull mysql:latest
```

### 启动 mysql 进程

```
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234qwer mysql
```

```
docker run -itd --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_HOST_AUTH_METHOD=trust postgres
```

### 进入 mysql 交互界面

```
docker exec -it mysql bash
```

### 以管理员身份登录

```
mysql -u root -p
```