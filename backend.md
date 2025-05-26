### Backend
Backend service is responsible for adding the given values to database. Backend service is written in NodeJS, Hence we need to install NodeJS.

**Developer has chosen NodeJs, Check with developer which version of NodeJS is needed. Developer has set a context that it can work with NodeJS >20**

Install NodeJS, By default NodeJS 16 is available, We would like to enable 20 version and install this.

**You can list modules by using dnf module list**

```
dnf module disable nodejs -y
```
```
dnf module enable nodejs:20 -y
```

```
dnf install nodejs -y
```

Configure the application.

Add application User
```
useradd game_user
```
Lets setup an app directory.


```
mkdir /app
```
Download the application code from github and paste it on /app directory.

```
git clone <url>
mv /home/ec2-user/tic-tac-toe-documentation/backend/* /app/

```

Lets download the dependencies.

```
cd /app
```
```
npm install
```
We need to setup a new service in systemd so systemctl can manage this service

Setup SystemD Expense Backend Service
```
vim /etc/systemd/system/backend.service
```

```
[Unit]
Description=Backend Service
After=network.target

[Service]
User=game_user
WorkingDirectory=/app
Environment=DB_HOST="<sql_private_ip>"
ExecStart=/bin/node /app/index.js
Restart=always
SyslogIdentifier=backend
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target

```

**NOTE: Ensure you replace <MYSQL-SERVER-IPADDRESS> with IP address**

Load the service.

```
systemctl daemon-reload
```

Start the service.
```
systemctl start backend
```
```
systemctl enable backend
```

For this application to work fully functional we need to load schema to the Database.

We need to load the schema. To load schema we need to install mysql client.

To have it installed we can use

```
dnf install mysql -y
```

Load Schema

```
mysql -h <MYSQL-SERVER-IPADDRESS> -uroot -pNaveen@123 < /app/schema/backend.sql
```

Restart the service.
```
systemctl restart backend
```
