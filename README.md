# react with typescript

这是一个基于 react(v16.8.5)、mobx(v5.9.0)、typescript(v3.3.333)、webpack(v4.29.6)的前端架构，并且集成了(antd-design)UI 库等等。

```
.
├── LICENSE
├── README.md
├── dist
├── global.d.ts
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── scripts
│   ├── build.js
│   ├── config
│   │   ├── eslintrc.js
│   │   ├── path.js
│   │   └── tslintrc.json
│   └── start.js
├── src
│   ├── components
│   │   └── Title
│   │       └── index.tsx
│   ├── index.tsx
│   ├── modules
│   │   └── App
│   │       ├── App.tsx
│   │       ├── index.tsx
│   │       ├── layout
│   │       │   └── Header
│   │       │       └── index.tsx
│   │       ├── modules
│   │       │   ├── Home
│   │       │   ├── Login
│   │       │   │   └── index.tsx
│   │       │   └── Test
│   │       └── style.scss
│   ├── stores
│   │   ├── menus
│   │   │   └── index.tsx
│   │   ├── security
│   │   │   └── index.ts
│   │   └── ui
│   │       └── index.ts
│   └── utils
│       └── withLayout
│           └── index.tsx
├── static
├── tree.text
├── tsconfig.json
└── tslint.json
```
