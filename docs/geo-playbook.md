# GEO 优化作战手册

本文档定义张泽钰（Zeyu Zhang）个人站 **「AI 时代 GEO 闭环」** 的完整工作流。

## 什么是 GEO 闭环

```
   写文章           评分           优化           发布           监控
	src/ ──→ g-score ──→ 改文 ──→ pnpm build ──→ Vercel ───→ Plausible/Umami
writing/*.md                                                     │
                                                                  ↓
                                                       手工监控 AI 引用
                                                       (Perplexity/Claude/GPT)
```

5 个环节，每两周循环一次。

---

## 第一步：写文章

每篇文章必须包含：

| 必备元素 | 作用 | 怎么做 |
|---|---|---|
| **TL;DR 段**（顶部 50-100 字） | AI 直接抓取引用 | 第一段就是 TL;DR |
| **可量化数据点**（每段 3+ 个） | 提升 G-score Insight | 用数字、案例、时间 |
| **结构化表格**（至少 1 个） | 提升结构分、生成 rich results | 用 Markdown 表格 |
| **引用源**（URL 或正式文献） | 提升 Authority 分 | 写到 ## 引用与延伸阅读 |
| **关键概念单一idea段落** | Claude 偏好 | 每段一个核心判断 |

参考模板：`src/content/writing/agent-governance-2026.md`

## 第二步：评分

```bash
# 默认：以中文 perplexity 视角跑所有 writing/*.md
bash scripts/g-score.sh

# 改参数
LANGUAGE=en ENGINE=claude bash scripts/g-score.sh
```

**目标**：每篇 G-score ≥ 0.5（入门槛）；少数标杆文章 ≥ 0.7（高引用）。

每跑一次都会在 `docs/geo-reports/` 留下一份时间戳报告，便于回溯。

## 第三步：优化（针对评分反馈）

### G-score 主要扣分项的处理

| 推荐动作 | 加分估计 | 例子 |
|---|---|---|
| 加 **storytelling**（案例 / 故事） | +0.38 | "5 个团队的实战观察" |
| 加 **minimalist**（精简语言） | +0.20 | 删除冗词 |
| 加 **technical**（深入技术语言） | +0.12 | 用专业术语精确表达 |
| 加 **data point**（数据点） | 决定 Insight | "47 条宪法 / 18 秒 / 6 个月" |

### 监控 AI 爬虫访客

部署后看 Plausible 面板：

- Dashboard → **Filter by Bot** → 选中 `GPTBot`、`ClaudeBot`、`Google-Extended`、`PerplexityBot`、`CCBot`
- 这些是 AI 爬虫的 User-Agent；它们访问说明你的内容被 AI 索引了
- 真实 AI 引用（"Perplexity 引用了你的哪个 url"）**Plausible 抓不到**——要靠手工监控

### 手工监控 AI 引用（每周一次）

每隔 1-2 周：

1. 去 https://www.perplexity.ai → 搜 `zhangzeyu` / `Agent 治理 合规` / `comply-agent` / `OWASP Agentic AI`
2. 看 5-10 个结果，每次记录哪个域名被引用
3. 去 https://claude.ai → 同样搜
4. 去 https://chatgpt.com → 同样搜
5. 记到 `docs/geo-reports/ai-citations-YYYYMMDD.md`（你手写）

## 第四步：发布

```bash
git add .
git commit -m "feat(writing): add new article '题'"
git push origin main
# Vercel 自动部署，30 秒内上线
```

## 第五步：监控

每周日做：

1. 打开 Plausible Dashboard
2. 看：
   - 访客总数（≥ 1 人是真实访问）
   - 哪个页面被访问最多
   - AI 爬虫（GPTBot/ClaudeBot）访问次数
3. 对比上周

## 工具链

| 工具 | 用途 | 状态 |
|---|---|---|
| `scripts/g-score.sh` | 一键评分 | 启用 |
| Plausible | 流量 + AI 爬虫监控 | 启用（待你注册账号） |
| `docs/geo-reports/` | 评分历史 + 引用记录 | 启用 |
| 手工 AI 搜索 | 真实引用追踪 | 持续 |

## 升级路径

| 时机 | 升级 |
|---|---|
| 域名接入后 | Plausible → 自部署 Umami（Cloudflare Workers + D1） |
| 站点文章 ≥ 10 篇 | 加 Content Hub / tag 页面提升内部链接 |
| 每月手工监控 ≥ 3 次 | 写专属 cron 脚本自动化报告 |
| 流量 ↑↑ 后 | 考虑 SEO 工具（Ahrefs / SEMrush） |

## 关键概念

- **G-score ≥ 0.7** → AI 引用率提升 4.2x（来自 GEO-16 框架研究）
- **Hits at Band 2+ ≥ 12 / 16** → 同样效果
- **Insight 分数** 是最大短板——一篇文章缺 1 个可量化数据点，Insight ≈ 0
- **AI 爬虫访客 ≠ AI 引用**——爬虫来了说明被索引，引用还要看内容本身

## 月度复盘

每个月最后一个周日做：

1. 看本月 G-score 趋势（`docs/geo-reports/` 内的报告）
2. 看 Plausible 访客趋势
3. 看 AI 手工引用记录
4. 决定下月重点：
   - 文章质量 < 分数 → 加 content
   - 引用率低 → 调整 schema / headline
   - 爬虫访问少 → 检查 robots.txt / sitemap