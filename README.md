# AI PDF Assistant

AI PDF Assistant 是一个面向 SaaS MVP 的 AI 文档助手项目，目标是帮助用户上传 PDF、生成摘要，并围绕单个文档进行问答。

当前仓库已经完成第一轮前端重整：将原本的单文件演示代码整理为更接近企业级项目的页面结构、共享类型、静态数据层和项目文档，为后续逐步实现真实功能打基础。

更详细的项目说明见：
- [PRD](./docs/prd.md)
- [Architecture](./docs/architecture.md)
- [Frontend Baseline](./docs/frontend-baseline.md)
- [Phase 1 Plan](./docs/phase-1-plan.md)
- [Phase 2 Plan](./docs/phase-2-plan.md)
- [Phase 3 Plan](./docs/phase-3-plan.md)

## 项目简介

项目定位是一个 production-style 的 AI PDF Assistant SaaS MVP，核心价值在于：

- 用户可以通过统一的认证入口进入受保护的工作台
- 用户可以上传 PDF 并在仪表盘中查看文档状态
- 用户可以生成文档摘要并在详情页回看
- 用户可以针对单个文档进行上下文问答并保留历史记录

当前实现范围仍以“前端结构整理 + 本地前端 MVP 闭环”为主，尚未接入真实认证、文件存储、PDF 解析、数据库和 OpenAI 服务。当前已完成第一阶段工程基线、第二阶段前端应用壳层整理，并进入第三阶段文档管理前端实现：让 dashboard 上传入口、文档列表和当前文档选择在本地形成可测试闭环，同时保留原始前端 layout 作为展示基线。

## 如何运行

环境要求：
- Node.js 18+
- npm

本地启动步骤：

1. 安装依赖

```bash
npm install
```

2. 启动开发环境

```bash
npm run dev
```

3. 运行类型检查

```bash
npm run lint
```

4. 生成生产构建

```bash
npm run build
```

## 技术栈

当前仓库技术栈：

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- Motion

规划中的目标技术栈：

- Next.js
- Supabase Auth / Database / Storage
- OpenAI API
- Node.js PDF 解析库
- Vercel
