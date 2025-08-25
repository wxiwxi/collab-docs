# 协同文档编辑器

## 项目简介

这是一个基于现代 Web 技术栈开发的协同文档编辑器，类似于飞书文档和 Notion。本系统支持多人实时协作编辑、块级编辑、富文本编辑等功能，为团队协作提供高效的文档编辑解决方案。

## 技术栈

### 前端
- **框架**：React 18
- **构建工具**：Vite
- **语言**：TypeScript
- **路由**：React Router DOM
- **UI 组件**：自定义 Shadcn 组件
- **状态管理**：React Query
- **协同编辑**：Yjs、Y-WebSocket
- **编辑器核心**：ProseMirror、Tiptap
- **表单处理**：React Hook Form
- **日期处理**：date-fns
- **图表可视化**：@xyflow/react、D3-force

### 后端
- **框架**：NestJS
- **数据库**：PostgreSQL
- **ORM**：TypeORM
- **身份验证**：JWT、Passport
- **API 文档**：Swagger
- **WebSocket**：@nestjs/websockets、ws
- **协同编辑服务**：Yjs、Y-protocols、Y-PostgreSQL
- **任务队列**：Bull
- **邮件服务**：Nodemailer

### 桌面应用
- **框架**：Tauri

### 开发工具
- **包管理器**：pnpm (Workspace)
- **构建系统**：Turbo
- **代码规范**：ESLint、Prettier
- **Git 钩子**：Husky
- **容器化**：Docker

## 项目结构

```
wangx-documents/
├── apps/                      # 应用程序目录
│   ├── backend/               # 后端服务
│   │   ├── server/            # NestJS 服务
│   └── frontend/
│       ├── desktop/           # Tauri 桌面应用
│       └── web/               # Web 前端应用
├── packages/                  # 共享包目录
│   ├── core/                  # 核心功能包
│   ├── react/                 # React 组件包
│   ├── shadcn/                # Shadcn UI 组件包
│   └── shadcn-shared-ui/      # 共享 UI 组件包
└── .devcontainer/             # 开发容器配置
```

## 功能特性

- ✅ 实时多人协同编辑
- ✅ 块级编辑（类 Notion）
- ✅ 富文本编辑
- ✅ 用户认证与权限管理
- ✅ 文档版本历史
- ✅ 文档分享与权限设置
- ✅ 支持 Web 端与桌面端
- ✅ 实时保存与同步

## 环境要求

- Node.js 18+
- pnpm 9.12.3+
- Docker 和 Docker Compose
- PostgreSQL (通过 Docker 提供)

## 项目启动

### 1. 安装依赖

```bash
# 安装全局依赖
pnpm install
```

### 2. 启动数据库

```bash
# 启动 PostgreSQL 容器
pnpm docker:start
```

### 3. 启动后端服务

```bash
# 启动 NestJS 服务
pnpm dev:server
```

### 4. 启动前端应用

```bash
# 启动 Web 应用
pnpm --filter @wangx-doc/web dev

# 或启动所有应用
pnpm dev
```

### 5. 启动桌面应用 (可选)

```bash
# 启动 Tauri 桌面应用
pnpm dev:desktop
```

## API 文档

启动后端服务后，可以通过以下地址访问 Swagger API 文档：

```
http://localhost:8082/doc
```

## Docker 部署

```bash
# 构建并部署
pnpm docker:build-deploy

# 停止部署
pnpm docker:deploy:stop
```

## 开发指南

本项目使用 pnpm 工作区管理多个包，使用 Turbo 进行构建优化。开发时请遵循以下规范：

1. 使用 `pnpm` 安装依赖
2. 遵循 ESLint 和 Prettier 的代码规范
3. 提交代码前运行 `pnpm lint` 和 `pnpm typecheck`
4. 使用 `pnpm commit` 进行规范化提交

