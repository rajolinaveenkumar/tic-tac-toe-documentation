# MYSQL

Install MySQL Server 8.0.x

```
dnf install mysql-server -y
```
Start MySQL Service
```
systemctl start mysqld
```
```
systemctl enable mysqld
```
Next, We need to change the default root password in order to start using the database service. Use password ExpenseApp@1 or any other as per your choice.

```
 mysql_secure_installation --set-root-pass Naveen@123
```

## Verification

We can check data by using client package called mysql.

Usually command to connect mysql server is

```
mysql -h <host-address> -u root -p<password>
```

But if your client and server both are in a single server, you can simply issue.

```
mysql
```

Once you got mysql prompt, you can use below command to check schemas/databases exist.

```
show databases;
```

Once you are in particular schema, you can get the list of tables.

```
show tables;
```

You can get entries of a table using

```
select * from <table_name>;
```
