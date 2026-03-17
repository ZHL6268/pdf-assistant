# Phase 7 Plan

## 目标

第七阶段聚焦真实文档问答，目标是让用户围绕单个 PDF 提问，并把问答历史持久化到 `messages` 表中。

## 范围

1. 建立文档问答后端
   - 新增 Supabase Edge Function `chat-document`
   - 校验当前用户是否拥有目标文档
   - 从 Storage 下载 PDF，并结合最近消息上下文调用 OpenAI Responses API
   - 持久化 `user / assistant` 消息

2. 建立前端聊天链路
   - detail 页加载真实消息历史
   - 用户可发送新问题并看到真实回答
   - 页面刷新后仍能回看同一文档的消息历史

3. 完善数据访问性能
   - 为 `messages` 表补充文档问答查询所需索引

4. 更新项目文档
   - 同步 README、Architecture、Frontend Baseline
   - 写清楚第七阶段新增的部署前置条件

## 非目标

- 不引入向量检索
- 不实现跨文档对话
- 不实现聊天消息编辑、删除、清空

## 完成标准

- detail 页可以围绕当前文档发起真实问答
- `messages` 表保存真实 user / assistant 历史
- 刷新 detail 页后能看到既有对话
- 问答失败时前端能看到真实错误，而不是静默失败
- 项目文档与代码状态一致
