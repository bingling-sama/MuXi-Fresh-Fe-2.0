本项目由 Vite + React + TypeScript + Less + Yarn 搭建

本地预览 `git clone https://github.com/Muxi-X/MuXi-Fresh-Fe-2.0.git && cd MuXi-Fresh-Fe-2.0 && yarn && yarn dev`

本地 server `yarn build && yarn preview`

# 项目目录

```
├── .husky              # husky的配置文件
├── dist               	# 打包后的代码和资源文件
├── node_modules        # 依赖库和模块
├── src
│   ├── assets          # 静态资源
│   ├── components      # 公共组件
│   ├── pages           # 页面
│   ├── type            # 全局类型声明
│   ├── utils           # 工具函数
│   ├── App.tsx
│   ├── fetch.ts        # 网络请求
│   ├── main.tsx
│   ├── router.tsx      # 路由配置信息
│   └── vite-env.d.ts
├── .commitlintrc.cjs	# commitlint的配置文件
├── .eslintignore
├── .eslintrc.cjs       # ESLint的配置文件
├── .gitignore
├── .prettierignore
├── .prettierrc.cjs     # Prettier的配置文件
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

**pages 下也会有 type 和 components 目录，对应相应页面独有的类型和组件**

# 项目规范

执行 `yarn lint` 会通过**Prettier**和**ESlint**进行代码的规范检查和自动调整，配置VSCode和WebStorm等IDE可达到保存后自动进行规范

### commit 规范

在 `git commit` 前会通过**husky**自动进行**ESlint**代码规范检查

然后通过**commitlint**进行提交规范的检查，`git commit -m "<type>(<scope>): <subject>"`

[commit规范](https://juejin.cn/post/7091276495972204580)

