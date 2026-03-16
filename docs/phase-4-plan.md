# Phase 4 Plan

## 目标

第四阶段聚焦真实认证与数据库基线，目标是把现有 fake auth 替换为 Supabase Auth，并建立最小可用的数据库与权限模型。

## 范围

1. 接入 Supabase client
   - 增加浏览器端 Supabase client 边界
   - 将认证逻辑集中到全局 provider
   - 为后续数据库和 storage 调用复用同一基础设施

2. 替换 fake auth
   - 登录改为 `signInWithPassword`
   - 注册改为 `signUp`
   - 登出改为 `signOut`
   - 前端认证状态改为真实 session 驱动

3. 建立数据库与权限基线
   - 创建 `profiles`、`documents`、`messages` 表
   - 建立基础 RLS policy
   - 为后续文档上传、摘要、聊天落地真实数据结构

4. 补充配置与错误态
   - 为未配置 Supabase 的环境提供明确提示
   - 更新 README、Architecture 与阶段文档

## 非目标

- 不实现真实文档上传到 Storage
- 不实现真实 PDF 解析
- 不实现真实摘要生成
- 不实现真实聊天持久化

## 完成标准

- 项目中已接入 `@supabase/supabase-js`
- 登录/注册/登出链路切换为 Supabase Auth
- 缺失 Supabase 配置时界面会给出明确信息
- 仓库中存在可执行的数据库 schema / RLS 基线
- 文档与代码状态一致
