# Phase 6 Plan

## 目标

第六阶段聚焦 PDF 文本提取与真实摘要生成，目标是让上传后的文档从“仅有文件记录”推进到“可提取文本并生成真实 summary”。

## 范围

1. 建立文档处理后端
   - 新增 Supabase Edge Function `process-document`
   - 从 Storage 下载 PDF
   - 调用 OpenAI Responses API 直接基于 PDF 生成摘要

2. 建立前端处理触发链路
   - 上传文档后自动调用文档处理函数
   - `documents.processing_status` 反映 `uploaded / processing / complete / failed`
   - detail 页优先显示真实 summary

3. 保持当前 UI 结构稳定
   - insight cards / chat 仍保留 demo 内容
   - 本阶段只把 summary 替换为真实数据

4. 更新项目文档
   - 同步 README、Architecture、Baseline
   - 写清楚新增加的部署前置条件

## 非目标

- 不实现真实文档问答
- 不引入向量检索
- 不迁移到正式 router

## 完成标准

- 上传 PDF 后 `documents` 状态会进入处理链路
- 处理完成后 `summary` 写回数据库
- detail 页优先显示真实 summary
- 处理失败时 dashboard 能看到失败状态
- 项目文档与代码状态一致
