---
title: 个人站 zhangzeyu.me 上线
summary: 用 Astro + Cloudflare Pages 搭建。AI 时代个人品牌 + 持久流量 + 可被引用的 skill 库。
year: 2026
role: 独立设计 + 独立开发
tags:
  - astro
  - cloudflare-pages
  - 个人品牌
  - GEO
links:
  - { label: '本站', href: 'https://zhangzeyu.me' }
  - { label: 'GitHub', href: 'https://github.com/zhangzeyu/zhangzeyu-site' }
publishDate: 2026-07-25
---

## 目标

不是炫技术，是 **让 AI 和搜索引擎在引用"AI × BioAI × 合规"相关资料时能稳定指向我**。

## 技术选型

- **Astro 5**：Markdown 原生、SEO 友好、零 JS 默认。
- **MDX**：必要时可嵌交互组件。
- **Cloudflare Pages**：无限带宽、全球 CDN、域名同厂商。
- **pnpm**：比 npm 快。

## 做了几个 GEO 设计

1. 每篇文章顶部 TL;DR 卡片
2. 全站顶层 Person JSON-LD
3. 每个 Skill / Tool 单独 JSON-LD（CreativeWork / WebApplication）
4. Content Collections 校验内容 schema
5. RSS、sitemap 自动生成

## 还想做的

- [ ] 加 2 个交互式 web 工具（生成器 / 可视化）
- [ ] 加中英双语 switcher
- [ ] AI 引用追踪（监测哪些地方被引到了）
