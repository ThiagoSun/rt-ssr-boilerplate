基于 [Next.js](https://github.com/zeit/next.js) 的服务端渲染(SSR)项目，由 [Create Next App](https://github.com/segmentio/create-next-app) 脚手架生成，并在其基础上增强功能。

使用SSR的主要目的之一就是SEO优化，而目前移动端H5对SEO的需求并不高，SEO需求主要集中在一些PC端的展示类网站，因此本项目里面搭配使用了 [Ant Design](https://ant.design/docs/react/introduce-cn) 。

## 目录

- [学习教程](#学习教程)
- [目录结构](#目录结构)
- [Scripts](#Scripts)
  - [npm run dev](#npm-run-dev)
  - [npm run build](#npm-run-build)
  - [npm run start](#npm-run-start)
  - [npm run analyze](#npm-run-analyze)
  - [npm run deploy](#npm-run-deploy)
- [使用CSS](#使用CSS)
- [数据请求](#数据请求)
- [数据请求的调试](#数据请求的调试)
- [自定义Server](#自定义Server)
- [部署](#部署)
- [部署到Now](#部署到Now)
- [一些问题](#一些问题)

## 学习教程

[Next.js中文文档](https://nextjs.frontendx.cn/)  
[Next.js英文文档(官方实时更新)](https://nextjs.org/)  

## 目录结构

```
.
├── .next                 // 构建目录
│   ├── [...]
├── assets                // 可存放公共css/less资源
│   ├── [...]
├── bundles               // 打包依赖分析结果
│   ├── [...]
├── components            // 与路由无关的组件目录
│   ├── head.js           // 自定义<head>标签内容
│   └── nav.js            // 一个公共组件
├── node_modules
│   ├── [...]
├── pages                 // 定义路由文件
│   └── buttonDemo        // antd button组件demo
│   └── datePickerDemo    // antd datePicker组件demo，重要、配置繁琐
│   └── fetchDemo         // 网络请求demo
│   └── urlParams         // Parameterized式路由
│   └── redirectDemo      // 重定向demo
│   └── cssModule         // cssModule例子
│   └── _app.js           // 引入了一个空less文件
│   └── index.js          // index路由
├── static                // 存放一些静态资源，可在外部直接访问
│   ├── [...]
├── utils                 // 工具包
│   ├── [...]
├── .babelrc              // babel配置
├── .editorconfig         // 编辑器配置
├── .gitignore            // git配置
├── ecosystem.config.js   // pm2生态系统文件
├── next.config.js        // 自定义 Next.js 的高级配置
├── next-less.config.js   // 修改了官方插件@zeit/next-less的默认行为，适配antd
├── package.json
├── package-lock.json
├── postcss.config.js     // postcss配置，autoprefixer
├── README.md
└── server.js             // 重写了next.js的server
```

Next.js的路由定义取决于代码的文件目录, 所以 `./pages/index.js` 
解析到 `/` 路径，`./pages/about.js` 解析到 `/about`.

`./static` 文件夹指向服务器的 `/static` 路径, 你可以在这里放置一些静态资源
 例如：图片或者编译好的CSS文件。

目前为止我们可以了解到:

- 自动打包编译 (使用 webpack 和 babel)
- 热加载
- 以 `./pages` 作为服务端的渲染和索引
- 静态文件服务. `./static/` 映射到 `/static/`

了解更多关于 [Next's Routing](https://github.com/zeit/next.js#routing)

## Scripts

在工程下，你可以执行:

### `npm run dev`

在测试环境下启动项目。<br>
在浏览器中打开 [http://localhost:3000](http://localhost:3000)

修改代码后页面会自动刷新<br>
并且出现错误时可以在console中看到。

### `npm run build`

为production环境执行build任务，并输出到 `.next` 文件夹。<br>
将生成mode为production的代码，并且压缩代码为了更好的体验。

### `npm run start`

在production模式下启动服务。需要先执行 `npm run build` 编译。

关于部署的更多信息： [deployment](https://github.com/zeit/next.js/wiki/Deployment)

### `npm run analyze`

生成打包模块依赖分析图

### `npm run deploy`

使用pm2容器启动服务

## 使用CSS

可以使用 Next.js 脚手架内置的 [`styled-jsx`](https://github.com/zeit/styled-jsx) ：

```jsx
export default () => (
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
  </div>
)
```

不过我们已经更习惯于使用 `less` 写样式，`less` 的配置项已经配好（包括 `autoprefixer`），关于 `css module` 请看示例demo。

了解更多关于 [Next's CSS features](https://github.com/zeit/next.js#css).

## 数据请求

你可以在 `pages` 文件夹下的文件中，调用组件方法 `getInitialProps` 来请求数据：

### `./pages/fetch/index.js`

```jsx
import {fetchAPI} from '../../utils/request';

static async getInitialProps({ req }) {
  const response = await fetchAPI('/admin/yjofficialwebsite/platformarticles/get', {
    method: 'POST',
    body: {
      "platformType": 4,
      "articlesStatus": 1,
      "pageNo": "-1"
    }
  });
  return {indexNews: response.vo.records};
}
```

页面初始化加载时, `getInitialProps` 只会在server端执行。
只有当路由跳转（Link组件跳转或 API 方法跳转）时，才会在client端执行`getInitialProps`

_Note: `getInitialProps` **不能** 用在子组件中，只能使用在 `pages` 页面中。_

了解更多关于 [数据请求和生命周期](https://github.com/zeit/next.js#fetching-data-and-component-lifecycle)

## 数据请求的调试

- 不同于在浏览器中开发，SSR工程的数据请求是从本地server发往目标server，
无法通过浏览器调试工具进行监听，Charles也监听不到。
- 目前只能通过在console打印网络请求信息来查看
- 关于服务端开发常用的本地断点调试：目前编辑器支持度不高，暂时只有VS Code
支持，详情请查看此issue：[https://github.com/zeit/next.js/pull/3294](https://github.com/zeit/next.js/pull/3294)

## 自定义Server

默认情况下，是通过 `next start` 命令来启动服务，现在我们增加一个 `server.js` 文件，并且引入 `express` ，方便后期扩展服务器功能，以及自定义路由。

目前路由默认是以 `pages` 文件夹做区分，但是目前可以在 `server.js` 中做修改，可以参考 `pages/urlParams` 和 `pages/newsDetailDemo` 这两个例子。

了解更多关于 [自定义Server和Routing](https://github.com/zeit/next.js#custom-server-and-routing)

## 部署

使用 `pm2` 和 `nginx` 组合部署。

`pm2` 负责进程管理以及负载均衡，配置项参照`ecosystem.config.js`文件。

`nginx` 负责做反向代理，参考配置：  
```nginx
server{
    listen 8081;
    server_name localhost;

    location / {
        # default port, could be changed if you use next with custom server
        proxy_pass http://localhost:3000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # if you have try_files like this, remove it from our block
        # otherwise next app will not work properly
        # try_files $uri $uri/ =404;
    }
}
```

## 部署到Now

[now](https://zeit.co/now) 是 `serverless` 的一种实现，提供一个零配置的、单命令的部署，直接部署服务到云端。

1.  执行 `npm install -g now` 安装 `now`

2.  在你的工程目录下执行 `now` . 你会在输出里看到一个 **now.sh** URL:

    ```
    > Ready! https://your-project-dirname-tpspyhtdtk.now.sh (copied to clipboard)
    ```

   发布完成后把这段URL拷贝到浏览器地址栏，你可以看到你的项目

访问更多细节关于 [now](https://zeit.co/now).

## 一些问题

1. 在开发环境下启动服务后，通过client route跳转，会出现样式丢失的问题，但是在构建后的正式环境下不存在该问题。**该问题目前可以通过刷新浏览器得以解决**，对于开发影响不是很大。目前了解到的原因是，开发环境和生产环境的构建方案大不相同，生产环境是**一次性构建出所有页面**，并且把css代码抽出来打包到 `style.chunk.css` 这个文件中；但是处于开发环境时，服务器只会在**接收到客户端请求后才开始该页面的第一次构建**，此时构建出的 `style.chunk.css` 文件是不完整的，并且后续访问的页面也不会向该文件中追加样式，造成后续页面的样式缺失。

2. 待完善...
