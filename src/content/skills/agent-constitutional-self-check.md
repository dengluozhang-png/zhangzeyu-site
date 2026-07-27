---
title: Agent 自我宪法检查
summary: 让 Agent 在每次响应前自检合规边界的可复用 skill。给 AI Agent 加一道内部闸门。
category: ai
level: 4
triggers:
  - agent
  - governance
  - self-check
  - 红队
interactive: false
publishDate: 2026-07-20
updatedDate: 2026-07-25
---

## 这是什么

**Agent 自我宪法检查** 是一类 prompt skill，让 LLM Agent 在生成最终响应前，用一段固定的"宪法条款"对自身输出做一遍自检。

它不是平台规则、不是外部审计，是 **Agent 内部一道自律闸门**。

## 何时触发

- Agent 将要执行高风险操作（写文件、调外部 API、提交 PR）
- Agent 的输出会被直接暴露给最终用户
- 多 Agent 协作中，一个 Agent 即将影响另一个 Agent 的状态

## 它怎么工作

最小可用版本：

```text
[宪法]
1. 不输出未经验证的医疗/法律/财务建议
2. 不假装具有不能验证的资质
3. 涉及可执行操作前，给出回滚路径
4. 涉及外部 API/写副作用前，先报告风险等级

[流程]
- Step 1: 重新读一遍待输出内容
- Step 2: 对照宪法 4 条做 yes/no 自评
- Step 3: 任一不通过 → 修改或拒答
- Step 4: 输出前给出"通过项 / 修改项 / 拒答项"
```

## 已知边界

- 内部宪法条款越多，token 开销越大；建议控制在 4-7 条
- 自我检查 ≠ 外部检查；不能替代红队
- 在模型能力弱时，自我检查可能流于形式

## 相关材料

- Constitutional AI (Anthropic 2022)
- 自主 Agent 的元治理讨论
