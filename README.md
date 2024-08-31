
# Frontend - 枫城在线内容平台

## 介绍
这是“枫城在线内容平台”的前端部分，使用 React.js 构建，用于用户与系统进行交互。用户可以查看地图、反馈问题、查看更新日志等，并通过登录系统与平台进行互动。

## 目录结构
```plaintext
frontend/
├── public/
├── src/
│   ├── assets/             # 静态资源 (图片、图标等)
│   ├── components/         # 可复用的组件 (Header、Footer等)
│   ├── pages/              # 各个页面的组件
│   ├── App.js              # 应用程序的主组件
│   ├── index.js            # 入口文件
│   ├── Header.css          # 页眉的样式
│   └── ...                 # 其他配置文件
└── package.json            # 依赖和脚本
```

## 安装和运行

### 先决条件
- [Node.js](https://nodejs.org/) 和 npm

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

### 构建生产环境
```bash
npm run build
```

### 部署
将 `build/` 文件夹中的内容部署到您的 Web 服务器。

## 特性
- **用户注册和登录**：用户可以使用手机号/QQ号进行注册和登录。
- **地图查看**：用户可以查看和导航到特定的地图视图。
- **工单反馈系统**：用户可以提交问题反馈，并查看和评论其他用户的反馈。
- **用户管理**：用户可以访问个人中心，并退出登录。

## 技术栈
- React.js
- Axios
- OpenSeadragon

## 环境变量
```plaintext
REACT_APP_API_URL=http://localhost:5000/api
```

## 贡献
如果您发现问题或有改进建议，请提交 Issue 或 Pull Request。

## 许可证
MIT License
