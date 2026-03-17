# Phase 5 Plan

## 目标

第五阶段聚焦真实文档上传与仪表盘数据，目标是把第三阶段的本地文档库替换为 Supabase Storage + `documents` 表驱动的真实用户文档链路。

## 范围

1. 接入真实文档仓储
   - dashboard 文档列表改为读取 `documents` 表
   - 当前选中文档仍保留在本地，仅用于前端页面跳转和详情联动
   - 去掉本地 `localStorage` 文档库与演示种子数据

2. 接入真实文件上传
   - PDF 上传到 Supabase Storage `documents` bucket
   - 上传成功后创建 `documents` 表记录
   - 继续保留文件类型和大小校验

3. 补齐 Storage 权限基线
   - 新增 storage bucket migration
   - 约束用户只能访问自己路径下的文件

4. 保持前端展示边界清晰
   - document detail 的 summary / chat 仍保留 demo 内容
   - 本阶段只替换文档上传和文档列表的数据来源

5. 同步项目文档
   - 更新 README、Architecture、Frontend Baseline
   - 明确第五阶段完成状态和测试前置动作

## 非目标

- 不实现真实 PDF 文本提取
- 不实现真实摘要生成
- 不实现真实文档问答
- 不引入正式 `react-router-dom`

## 完成标准

- dashboard 文档列表来自 `documents` 表
- 上传 PDF 后文件进入 Supabase Storage
- 上传成功后页面会显示真实文档记录
- 刷新页面后文档列表仍从后端读取
- 不同账号只能看到自己的文档
- 项目文档与代码状态一致

## 当前状态

第五阶段代码实现已落地到仓库：

- 文档列表已切换到 `documents` 表查询
- 上传已切换到 Supabase Storage + `documents` 表写入
- 新增 storage migration：[`supabase/migrations/0002_document_storage.sql`](../supabase/migrations/0002_document_storage.sql)

本阶段测试前，需要先在 Supabase SQL Editor 执行 `0002_document_storage.sql`，创建 bucket 和 storage policy。
