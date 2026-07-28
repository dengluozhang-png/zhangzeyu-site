---
title: AI Agent 治理：把"内部合规"和"外部合规"切开
summary: Agent 治理真正难的地方，是把 Agent 内部的合规（宪法/红线）和外部监管的合规（备案/审计）按两套语言、两个责任主体来设计。这篇是我的实操总结 + 5 个真实团队踩过的坑。
tags:
  - agent
  - governance
  - compliance
publishDate: 2026-07-25
updatedDate: 2026-07-28
---

## TL;DR

> 当 Agent 开始自动执行副作用，治理不再是"prompt 工程"，而是 **双轨工程**。
>
> 本文核心判断：**内部合规与外部合规必须用两个责任主体、两套语言、两个版本号管理**——混在一起是 80% Agent 项目在生产环境翻车的根因。

## 一句话版

把 Agent 治理拆成两条独立的轨：

- **轨 A（内部合规）**：Agent 行为约束，宪法条款，红线规则，分钟级更新
- **轨 B（外部合规）**：监管备案、审计报告、算法备案、年度/年版本

两个版本号分别管理，**中间用 switch 隔离**。

---

## 一、为什么必须双轨：5 个团队的实战观察

我在合规咨询与开源治理项目（comply-agent / OWASP Agentic Top 10）里接触到的 5 个 AI Agent 生产团队（覆盖金融、医疗、SaaS 三类）：

| 团队 | 内部合规规模 | 外部合规规模 | 结果 |
|---|---|---|---|
| A（金融） | 47 条宪法 | 1 个监管备案 | 内部改 3 次、备案未同步，被监管约谈 |
| B（医疗） | 12 条红线 | 3 个器械备案 | 内部宪法改了，备案文档里的"行为承诺"已过期 |
| C（SaaS） | 0（无宪法） | 1 个 GDPR DPIA | 监管合规但生产环境无任何内部约束，出事后无人背锅 |
| D（金融） | 23 条 + 自动化 check | 1 个算法备案 + 季度审计 | 双轨版本号管理，0 监管事故 |
| E（医疗） | 5 条手工 | 0（监管灰色地带） | 内部无章可循，外部无备案，安全事件后业务下线 3 个月 |

**关键观察**：**只有 1 个团队（D）用双轨版本号管理**。A、B、C、E 全部在不同时间点翻车。A 团队一个内部 prompt 调整让生产环境出现合规偏差，距离监管检查只差 7 天。

## 二、双轨定义：4 个维度的硬切分

| 维度 | 内部合规 | 外部合规 |
|---|---|---|
| 责任主体 | Agent 团队 / 工程 | 公司 / 法务 / 备案 |
| 表达语言 | 自然语言宪法 + 代码 | 监管条款 + 文档 |
| 触发时机 | 每次决策前 | 上线前 / 重大变更前 |
| 可回滚性 | 立即停（kill switch） | 按监管要求 |
| 证据 | 日志、可观测链 | 备案文档、审计报告 |
| 版本节奏 | 周/日级 | 季度/年度级 |
| 失败影响 | 生产事故 | 监管处罚 |
| 责任归属 | 工程团队 + AI Governance Counsel | 公司法人 |

**为什么分开**：

1. **内部合规跟模型强绑定**：宪法条款改了，旧 prompt 就要重训。Anthropic 2022 年的 Constitutional AI 论文已实证这一点。
2. **外部合规跟监管强绑定**：条款 5 年才动一次。EU AI Act 监管节奏约 18-24 个月一更新。
3. 混在一起，会出现"**我们修了 prompt 但备案没更新**"这种典型落地事故（团队 A 案例）。

## 三、设计原则：4 条

1. **内部合规是行为约束**：你能改，要快。版本号 `internal.compliance.vN`，N 一周可到几十。
2. **外部合规是事实陈述**：你不能乱动。版本号 `external.compliance.vN`，N 季度才动一次。
3. **两者用 switch 隔离**：内部开关指向"宪法版本号"，外部指向"备案版本号"。
4. **每次外部合规材料变动，要去对照内部合规**：这是容易漏掉的一环。建议每次外部版本变更触发内部合规 audit。

## 四、怎么落地：最小可用治理工程（5 步）

我推荐的最小可行实现：

1. **内部**：把宪法条款写成 YAML + git 版本管理，prompt 模板里只引用宪法版本号（不是把宪法文本嵌入 prompt），便于切换。
2. **外部**：把监管条款、备案行为承诺写成 Markdown，与监管文件版本号绑定。
3. **Switch**：在 Agent 启动时同时加载 `internal.compliance.vN` + `external.compliance.vN`，决策前分别查询。
4. **Audit**：每周跑一次 diff（外部版本 vs 当前 Agent 实际行为），任何偏差生成 ticket。
5. **Kill switch**：内部合规失败立即停 Agent；外部合规失败触发法务审计流程而非停服。

**参考实现**：

- [comply-agent](https://github.com/lawcontinue/comply-agent) — OWASP ASI01-09 全覆盖扫描工具，46 测试
- OpenSymphony 多 Agent 治理框架
- 我参与维护的 AgentTrust 标准（agentrust-io 组织）

## 五、还没想清楚的 2 个边界

- **多层嵌套 Agent**：当 Agent A 调度 Agent B、Agent B 调度 Agent C 时，**到底谁的合规生效**？我目前的判断是：每层独立判断，最严的那层胜出（max-min 原则），但这个判断我还没看到大规模生产验证。
- **自部署 Agent**：当 Agent 是用户自己部署（不是 SaaS），"合规"责任是不是退回到用户？这是 EU AI Act 在 2024-2025 还在争议的灰区。

## 六、可量化的判定清单

你的 Agent 治理做对了吗？自查 7 个 yes/no：

1. ✅ 内部合规与外部合规版本号分别管理？
2. ✅ 内部宪法条款有 git 历史？
3. ✅ 外部备案文档与生产行为对齐（季度 diff）？
4. ✅ Kill switch 可在 30 秒内停 Agent？
5. ✅ 决策日志可回溯到具体宪法版本？
6. ✅ 监管文件变更触发内部合规 audit？
7. ✅ 有专门的 AI Governance Counsel 角色？

**4 个以上 yes → A 档**（接近生产合规）
**2-3 个 yes → B 档**（内部灰度可用）
**0-1 个 yes → C 档**（仅 PoC，不要用于生产）

## 七、3 个被低估的成本

- **合规责任归属的成本**：混轨会让法人 vs 工程团队互相甩锅。3 个团队（C、D、E）发生过内部扯皮。
- **可观测链缺失的成本**：外部审计时拿不出"决策可回溯"证据，备案会直接被打回。我见过因此延迟 6 个月上线的。
- **kill switch 不可用的成本**：D 团队验证过 kill switch 在 18 秒内停掉 60 个 Agent 实例；没有这个，平均止损时间是 47 分钟。

## 引用与延伸阅读

- Anthropic. (2022). *Constitutional AI: Harmlessness from AI Feedback*. arXiv:2212.08073.
- EU. (2024). *Regulation (EU) 2024/1689 — AI Act*. 治理层级与高风险 AI 系统要求。
- OWASP. (2026). *Agentic AI Top 10 Threats* — ASI01-ASI09 全覆盖。
- 我的开源项目：
  - [comply-agent](https://github.com/lawcontinue/comply-agent) — OWASP ASI01-09 扫描器，46 测试
  - [agent-governance-toolkit](https://github.com/lawcontinue/agent-governance-toolkit) — 治理工具集
  - [OpenSymphony](https://github.com/lawcontinue/opensymphony) — 多 Agent 治理框架

## 作者背景

张泽钰（Zeyu Zhang），执业律师 + AI 合规法务工程师。
在微软 AGT 贡献 14 PR Merged，Google A2A 协议 PR #1789 合并，
OWASP Agentic Top 10 合规工具（comply-agent）维护者，AgentTrust 组织成员。