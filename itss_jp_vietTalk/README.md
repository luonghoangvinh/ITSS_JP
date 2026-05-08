# React + Vite
các thư viện cần cài

## thư viện này giúp tạo các route để chuyển đến các trang khác
npm install react-router-dom
trong terminal gõ:npm install react-router-dom
## thư viện này để có icon dùng trong project
npm install lucide-react



## cách chạy project này (frontend)
trong terminal trong đường dẫn ....\its_jp_vietTalk>

nhập: npm run dev
khi dừng chương trình, ấn tổ hợp phím Ctrl + C

# tải tailwind
https://tailwindcss.com/docs/installation/using-vite
VÌ đã có khởi tạo project rồi nên bỏ qua bước một
ở bước 4 thêm "@import "tailwindcss";" và file 


để sử dụng nestjs,react cần
Cài Node.js
Cài Nest CLI

khởi tạo project nestJS cho backend:
trong terminal gõ và ấn enter: nest new my-nest-app
sau đó chọn: npm

# khi tải nestjs thì nếu gặp lỗi dòng baseURL ở file tsconfig thì thay dòng đó bằng hai dòng này:

    "types": ["jest", "node"],
    "rootDir": "./",
    

### install mongoose
this <mongoose>library is used to connect with mongodb
install in Backend "cd Backend"
npm install @nestjs/mongoose mongoose

tạo file "vite-env.d.ts" thêm declare module "*.css" vào file và luôn mở nó, nếu mà bị lỗi import file .css


#### Cách xử lý lỗi cors khi gọi API(gọi không thành công nhưng cũng không báo lỗi)
trong file vite.config.js
bên cạnh plugin:....
thêm dòng này

server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
