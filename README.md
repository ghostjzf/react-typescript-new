# react with typescript

这是一个基于 react(v16.8.5)、mobx(v5.9.0)、typescript(v3.3.333)、webpack(v4.29.6)的前端架构，并且集成了(antd-design)UI 库等等。

# react-hot-loader

由于 react-hot-loader 只会在同步加载的组件起作用，所以需要在路由级页面组件加上 hot(module)的配置

## 目录结构

```
.
├── dist  打包后文件夹
├── public
├── scripts
│   └── config
├── src
│   ├── components
│   │   ├── Echarts
│   │   ├── ErrorBox
│   │   ├── Loading
│   │   ├── Modal
│   │   ├── Portal
│   │   ├── Title
│   │   └── react-form-tool
│   ├── modules
│   │   ├── App
│   │   │   ├── layout
│   │   │   │   ├── Header
│   │   │   │   ├── Logo
│   │   │   │   ├── Menus
│   │   │   │   └── Time
│   │   │   └── modules
│   │   │       ├── Home
│   │   │       ├── Login
│   │   │       └── Test
│   │   ├── CommonToolsIntroduce
│   │   │   └── modules
│   │   │       ├── Git
│   │   │       └── TestA
│   │   └── Staff
│   │       └── modules
│   │           ├── TestA
│   │           └── TestB
│   ├── stores
│   │   ├── menus
│   │   ├── security
│   │   ├── siteUI
│   │   └── ui
│   └── utils
│       ├── asyncModule
│       ├── classlist
│       ├── createModule
│       │   └── Sider
│       ├── http
│       └── withLayout
└── static
```
