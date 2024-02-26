# Incentive Management Module

### Tech Used - 
- Frontend - HTML, Css, Javascript, React
- Backend - Nodejs
- Database - Mysql

### Database -
To create and initialize database run the sql commands provided in [backend/index.sql](https://github.com/rajesh-kumar-rout/incentive-management/blob/main/backend/index.sql) file.

### To run the backend app follow the steps -
* Update .env file
  ```
  PORT=3001

  DB_NAME=incentive_management
  DB_USERNAME=root
  DB_PASSWORD=
  DB_HOST=localhost
  
  MAIL_SERVER=gmail
  MAIL_HOST=smtp.gmail.com
  MAIL_PORT=587
  MAIL_HTTPS=false
  MAIL_FROM=john@example.com
  MAIL_PASSWORD=some password
  ```
* Run following command
  ```
  npm install
  npm run dev
  ```

### Seeding database -
* To seed database hit "/admin/seed" route of backend.
* To seed sales table hit "/admin/seed?action=sales" route of backend.

### To run the react app follow the steps - 
* Update .env file
  ```
  VITE_API_URL=http://localhost:3001/admin
  ```
* Run following command
  ```
  npm install
  npm run dev
  ```

### To login as admin use below credentials - 
```
email - admin@example.com
password - 123456
```

### To login as employee use below credentials - 
```
email - jane.smith@example.com
password - 123456
```

