# 个人博客网站

## 技术栈

### 前端
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### 后端
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- Maven

## 功能
- 响应式设计（移动端和电脑端适配）
- 用户认证（注册、登录、注销）
- 文章管理（发布、编辑、删除）
- 评论系统（发表、删除评论）
- 文章详情页

## 安装

### 前端
1. 克隆项目
```bash
git clone <repository-url>
cd blog
```

2. 安装依赖
```bash
npm install
```

3. 配置API地址
前端API调用已配置为使用 `http://backend:5000` 作为后端服务地址，与Docker容器名称对应。

4. 启动开发服务器
```bash
npm run dev
```

### 后端
1. 进入后端目录
```bash
cd blog-backend
```

2. 构建项目
```bash
mvn clean package -DskipTests
```

3. 运行项目
```bash
java -jar target/blog-backend-0.0.1-SNAPSHOT.jar
```

## 构建

### 前端
```bash
npm run build
```

### 后端
```bash
mvn clean package -DskipTests
```

## 部署

### Docker部署（推荐）
1. 确保Docker和Docker Compose已安装
2. 在项目根目录执行
```bash
docker compose up -d --build
```

3. 检查容器状态
```bash
docker ps
```

4. 访问网站
   - 前端：`http://服务器IP:3000`
   - 后端API：`http://服务器IP:5000/api`

### 环境变量配置
- 数据库连接：在 `blog-backend/src/main/resources/application.properties` 中配置
- JWT密钥：在 `blog-backend/src/main/resources/application.properties` 中配置

## 项目结构

### 前端
```
blog/
├── public/           # 静态资源
├── src/
│   ├── components/   # 组件
│   ├── context/      # 上下文管理
│   ├── pages/        # 页面
│   ├── App.tsx       # 应用入口
│   └── main.tsx      # 渲染入口
├── vercel.json       # Vercel配置
└── package.json      # 依赖配置
```

### 后端
```
blog-backend/
├── src/
│   ├── main/
│   │   ├── java/com/example/blogbackend/
│   │   │   ├── controller/          # 控制器
│   │   │   ├── config/              # 配置
│   │   │   ├── model/                # 模型
│   │   │   ├── repository/           # 数据访问
│   │   │   ├── service/              # 服务
│   │   │   ├── util/                 # 工具
│   │   │   └── BlogBackendApplication.java  # 应用入口
│   │   └── resources/
│   │       └── application.properties  # 配置文件
├── pom.xml                             # Maven配置
└── Dockerfile                           # Docker配置
```

## API接口文档

### 认证接口
- **注册**：`POST /api/auth/register`
  - 请求体：`{"username": "...", "email": "...", "password": "..."}`
  - 响应：成功返回 `201 Created`，失败返回错误信息

- **登录**：`POST /api/auth/login`
  - 请求体：`{"email": "...", "password": "..."}`
  - 响应：成功返回 `{"token": "..."}`，失败返回错误信息

- **获取当前用户**：`GET /api/auth/me?token=...`
  - 响应：成功返回用户信息，失败返回错误信息

### 文章接口
- **获取所有文章**：`GET /api/posts`
  - 响应：返回文章列表

- **获取单个文章**：`GET /api/posts/{id}`
  - 响应：返回文章详情

- **创建文章**：`POST /api/posts`
  - 请求头：`Authorization: Bearer {token}`
  - 请求体：`{"title": "...", "content": "..."}`
  - 响应：成功返回创建的文章，失败返回错误信息

- **更新文章**：`PUT /api/posts/{id}`
  - 请求头：`Authorization: Bearer {token}`
  - 请求体：`{"title": "...", "content": "..."}`
  - 响应：成功返回更新后的文章，失败返回错误信息

- **删除文章**：`DELETE /api/posts/{id}`
  - 请求头：`Authorization: Bearer {token}`
  - 响应：成功返回 `"Post deleted successfully"`，失败返回错误信息

### 评论接口
- **获取文章评论**：`GET /api/comments/post/{postId}`
  - 响应：返回评论列表

- **创建评论**：`POST /api/comments`
  - 请求头：`Authorization: Bearer {token}`
  - 请求体：`{"content": "...", "postId": "..."}`
  - 响应：成功返回创建的评论，失败返回错误信息

- **删除评论**：`DELETE /api/comments/{id}`
  - 请求头：`Authorization: Bearer {token}`
  - 响应：成功返回 `"Comment deleted successfully"`，失败返回错误信息

## 用户使用指南

### 注册和登录
1. 访问网站首页
2. 点击右上角的 "注册" 按钮
3. 填写用户名、邮箱和密码
4. 点击 "注册" 按钮
5. 注册成功后，点击 "登录" 按钮
6. 输入注册时使用的邮箱和密码
7. 点击 "登录" 按钮

### 发布文章
1. 登录后，点击导航栏中的 "管理" 链接
2. 点击 "发布文章" 按钮
3. 填写文章标题和内容
4. 点击 "发布" 按钮

### 编辑文章
1. 登录后，点击导航栏中的 "管理" 链接
2. 在文章列表中找到要编辑的文章
3. 点击文章下方的 "编辑" 按钮
4. 修改文章标题和内容
5. 点击 "更新" 按钮

### 删除文章
1. 登录后，点击导航栏中的 "管理" 链接
2. 在文章列表中找到要删除的文章
3. 点击文章下方的 "删除" 按钮
4. 确认删除操作

### 发表评论
1. 访问文章详情页
2. 登录后，在评论框中输入评论内容
3. 点击 "发表评论" 按钮

### 删除评论
1. 登录后，在文章详情页找到自己发表的评论
2. 点击评论下方的 "删除" 按钮
3. 确认删除操作

## 开发说明
- 前端使用 React 19 和 TypeScript 开发
- 前端使用 Tailwind CSS 进行样式设计
- 前端使用 React Context API 进行状态管理
- 前端使用 React Router 进行路由管理
- 前端使用 Axios 进行 API 请求
- 后端使用 Spring Boot 3.2.0 开发
- 后端使用 Spring Security 进行认证和授权
- 后端使用 Spring Data JPA 进行数据访问
- 后端使用 PostgreSQL 作为数据库
- 后端使用 JWT 进行令牌生成和验证