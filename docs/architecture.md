# Architecture

## 技术栈选择及原因

### 当前实现技术栈

- React 19
  - 当前仓库已经基于 React 构建，适合继续完成前端结构重整和页面组件拆分
- TypeScript
  - 提高共享类型、接口边界和模块协作的可维护性
- Vite
  - 启动和构建速度快，适合当前前端整理与快速迭代阶段
- Tailwind CSS v4
  - 适合快速建立统一设计 token 和布局体系
- Lucide React
  - 用于统一图标表达，减少自定义图标维护成本
- Motion
  - 用于轻量页面切换与交互动效，保持产品演示质量

### 目标架构技术栈

- Next.js
  - 统一前后端边界，便于后续承载 route handlers、server actions 和页面级数据加载
- Supabase Auth
  - 以较低成本落地用户认证和会话管理
- Supabase PostgreSQL
  - 满足文档、消息和用户数据持久化需求
- Supabase Storage
  - 适合托管用户上传的 PDF 文件
- OpenAI API
  - 用于摘要生成与基于文档内容的问答
- PDF 解析库
  - 用于服务端提取 PDF 文本内容
- Vercel
  - 适合承载 Next.js 应用部署与演示环境

当前阶段不直接迁移到目标栈，原因是本轮工作重点是先将前端结构整理到合理基线，避免功能实现和结构重构混在一起，增加返工成本。第一阶段已补齐共享配置、环境变量约定和 API 边界占位，第二阶段已完成应用壳层整理，第三阶段已完成文档管理前端 MVP。当前代码已经把 dashboard 上传入口、文档列表和当前文档选择推进到真实可交互的本地前端闭环。当前展示层为了保持原始视觉效果，仍沿用原始视觉结构，但主入口组件已经收敛为应用壳层，页面模板、基础展示单元、应用流程编排、展示数据适配层、本地认证服务边界和本地文档服务边界都已拆到独立模块中。

## 项目目录结构

### 当前目录结构

```text
ai-pdf-assistant/
├── docs/
│   ├── architecture.md
│   ├── frontend-baseline.md
│   ├── phase-1-plan.md
│   ├── phase-2-plan.md
│   └── prd.md
├── src/
│   ├── components/
│   │   ├── chat-message.tsx
│   │   ├── doc-row.tsx
│   │   ├── feature-card.tsx
│   │   ├── insight-item.tsx
│   │   └── placeholder-button.tsx
│   ├── config/
│   │   ├── env.ts
│   │   └── routes.ts
│   ├── constants/
│   │   └── app.ts
│   ├── hooks/
│   │   ├── use-app-flow.ts
│   │   ├── use-app-screen.ts
│   │   ├── use-auth-intent.ts
│   │   ├── use-auth-session.ts
│   │   ├── use-dashboard-view-model.ts
│   │   ├── use-document-library.ts
│   │   ├── use-document-detail-view-model.ts
│   │   └── use-document-title.ts
│   ├── screens/
│   │   ├── auth-page.tsx
│   │   ├── dashboard-page.tsx
│   │   ├── document-detail-page.tsx
│   │   └── landing-page.tsx
│   ├── services/
│   │   ├── auth-session-storage.ts
│   │   ├── demo-auth-service.ts
│   │   ├── demo-document-service.ts
│   │   ├── document-storage.ts
│   │   └── document-upload-service.ts
│   ├── state/
│   │   └── demo-state.ts
│   ├── types/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── document.ts
│   │   ├── ui-state.ts
│   │   └── user-profile.ts
│   ├── vite-env.d.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 目标目录结构

```text
ai-pdf-assistant/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── document/
│   │   └── layout/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── openai/
│   │   ├── pdf/
│   │   └── validators/
│   ├── services/
│   ├── repositories/
│   ├── prompts/
│   ├── types/
│   ├── utils/
│   └── middleware.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── docs/
├── .env.local
├── package.json
└── README.md
```

## 核心模块说明

### 1. 认证模块

职责：

- 用户注册、登录、登出
- 会话管理
- 受保护页面访问控制

边界：

- 页面层只处理表单与状态展示
- 认证逻辑放在服务层
- 第三方认证客户端放在 `lib/supabase`

### 2. 文档管理模块

职责：

- PDF 上传
- 服务端校验文件类型和大小
- 创建文档记录
- 展示 dashboard 文档列表

边界：

- 上传流程编排在 service 层
- 数据读写在 repository 层
- 存储客户端封装在 `lib`

### 3. PDF 处理模块

职责：

- 解析 PDF 文本
- 对提取后的文本做基础清洗
- 将结果提供给摘要与问答模块

### 4. 摘要模块

职责：

- 构建摘要 prompt
- 调用 OpenAI 生成摘要
- 将摘要保存回文档记录

### 5. 文档问答模块

职责：

- 接收用户问题
- 构建基于文档内容的问答 prompt
- 持久化消息历史
- 返回 grounded answer

### 6. UI 组件模块

职责：

- 提供可复用的页面、表单、表格、状态展示组件
- 保持页面层只做组合而不是堆砌业务逻辑

### 7. 共享能力模块

职责：

- 类型定义
- 环境变量读取
- 校验器
- 常量
- 工具函数

## 数据模型设计

### 1. profiles

用于保存用户基础资料。

建议字段：

- `id`
- `email`
- `created_at`

### 2. documents

用于保存用户上传文档及其 AI 处理结果。

建议字段：

- `id`
- `user_id`
- `title`
- `file_path`
- `extracted_text`
- `summary`
- `created_at`

### 3. messages

用于保存围绕文档的问答消息历史。

建议字段：

- `id`
- `document_id`
- `user_id`
- `role`
- `content`
- `created_at`

### 关系设计

- 一个 `profile` 对应多个 `documents`
- 一个 `profile` 对应多个 `messages`
- 一个 `document` 对应多个 `messages`

### 安全约束

- 所有业务数据都要和 `user_id` 绑定
- 启用 Supabase Row Level Security
- 仅允许用户访问 `user_id = auth.uid()` 的记录
- OpenAI API key 仅允许服务端使用
- 文件类型和大小校验必须在服务端执行

## 代码规范

### 通用原则

- 优先可读性与可维护性，而不是技巧性写法
- 一个函数只做一件主要事情
- 页面文件只负责组合和展示，不承载重业务逻辑
- Prompt、服务编排、数据库读写必须分层

### 命名规范

- 文件名使用 `kebab-case`
  - 例如 `document-detail-page.tsx`
- React 组件使用 `PascalCase`
  - 例如 `DocumentDetailPage`
- 函数使用语义明确的动词命名
  - 例如 `generateSummary`、`getDocumentById`
- 布尔值使用 `is`、`has`、`can` 前缀
  - 例如 `isLoading`

### TypeScript 规范

- 对外部可复用函数声明显式参数类型
- 共享函数和模块导出优先写显式返回类型
- 避免 `any`
- 共享类型统一放在 `src/types`
- API 输入输出应定义独立 payload 类型

### React 规范

- 页面组件保持轻量
- 大组件及时拆分
- 本地状态仅用于界面交互
- 重用已有布局和视觉模式，避免重复实现

### 注释规范

- 只写有维护价值的注释
- 优先解释模块职责、边界和复杂分支原因
- 不写重复代码表面含义的注释

### 错误处理规范

- API 返回统一错误结构
- 区分校验失败、认证失败、权限失败、资源不存在和外部服务失败
- UI 提示面向用户，不暴露内部堆栈
