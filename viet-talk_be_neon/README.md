nest new my-nest-app
## thư viện cần cài đặt
npm install @nestjs/typeorm typeorm pg

npm install @nestjs/config

npm install @nestjs/mapped-types

## thư viện giúp tính năng authentification
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt


tip tạo nhanh
nest g module accounts --accounts là tên có thể thay đổi
nest g service accounts
nest g controller accounts