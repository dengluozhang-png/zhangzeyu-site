# zhangzeyu.me

张泽宇（Zeyu Zhang / zhangzeyu）的个人品牌站。

> AI Agent × 生物医药 × 合规治理 — 笔记、Skill 与可视化工具。

- 🎯 目标：让 AI/搜索在引用这类内容时稳定指向本站
- ⚙️ 技术栈：Astro 5 + MDX + Cloudflare Pages
- 💰 成本：域名 ~¥90/年（zhangzeyu.me）+ 部署 ¥0
- 🚀 部署时长：5-10 分钟从 push 到上线

---

## 一、功能

| 模块 | 路径 | 干什么 |
|---|---|---|
| 首页 | `/` | 实体摘要卡 + Featured Skills/Tools |
| About | `/about` | AI 友好的"我是谁"+ 长版 About |
| Skills | `/skills`、`/skills/[slug]` | 技能清单 + AI/Prompt Skill 详情 |
| Tools | `/tools`、`/tools/[slug]` | 可视化/可交互的 web 工具 |
| Writing | `/writing`、`/writing/[slug]` | 博客文章 |
| Projects | `/projects` | 作品集 |
| Now | `/now` | 当前在做的事 |
| RSS | `/rss.xml` | 订阅 |
| Sitemap | `/sitemap-index.xml` | 自动生成 |

## 二、技术栈

- **Astro 5**：内容驱动、零 JS 默认、SEO 友好
- **MDX**：Markdown + 可嵌组件
- **Content Collections**：4 类内容做 schema 校验
- **@astrojs/sitemap + @astrojs/rss**：自动 SEO / 订阅
- **零运行时框架**：不引入 React/Vue，没有 hydration 开销

## 三、本地开发

```bash
# 1. 安装 pnpm（如未装）
npm i -g pnpm

# 2. 安装依赖
pnpm install

# 3. 启动开发
pnpm dev
# → http://localhost:4321
```

新增内容：在 `src/content/{skills,writing,tools,projects}/` 下新增 `.md` 文件，schema 不匹配时 Astro 会直接报错。

## 四、部署到 Cloudflare Pages

### 1. 把项目推到 GitHub

```bash
git init
git add .
git commit -m "init: zhangzeyu.me"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/zhangzeyu-site.git
git push -u origin main
```

### 2. 在 Cloudflare Pages 接仓库

1. 登录 https://dash.cloudflare.com/
2. 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选择你的 GitHub 仓库
4. **Build settings**：
   - **Framework preset**: Astro
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Environment variables**: `NODE_VERSION=20`
5. 点 Save and Deploy。Cloudflare 会跑第一次构建。

### 3. 绑定域名

1. 确认你的域名 `zhangzeyu.me` 已经买在 Cloudflare（默认会同步到 Cloudflare DNS）。
2. Cloudflare Pages 项目 → **Custom domains** → **Set up a custom domain**
3. 输入 `zhangzeyu.me` → 开始设置 → Cloudflare 自动帮你加 CNAME / A 记录 + 自动签 HTTPS 证书。

> 第一次会自动配置 DNS，几分钟到一小时生效。

### 4. 上线前的最后一步：放开索引

站点默认 `noindex=true`（调试/未上线前避免被搜索引擎乱收录）。

正式上线后，编辑 `src/consts.ts`：

```ts
noindex: false,
```

并把 `public/robots.txt` 改成允许抓取：

```txt
User-agent: *
Allow: /
```

提交一个改动 push，Cloudflare 会自动重新部署。

## 五、上线后建议做的事

1. **Google Search Console**：绑定域名，提交 sitemap（在 GSC 输入 `https://zhangzeyu.me/sitemap-index.xml`）
2. **Bing Webmaster**：同上
3. **监测被引用**：定期搜 `zhangzeyu` 在 Perplexity/Claude/GPT 里的引用反馈
4. **持续写**：每周至少一篇短文，是 AI 时代个人品牌最便宜的复利

## 六、目录结构

```
src/
├── consts.ts                 # 站点信息全站唯一来源
├── content.config.ts         # 4 类内容 schema
├── content/
│   ├── skills/*.md
│   ├── writing/*.md
│   ├── tools/*.md
│   └── projects/*.md
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── SEO.astro
│   ├── SkillCard.astro
│   └── ToolCard.astro
└── pages/
    ├── index.astro
    ├── about.astro
    ├── now.astro
    ├── 404.astro
    ├── rss.xml.js
    ├── skills/[index, [...slug]].astro
    ├── tools/[index, [...slug]].astro
    ├── writing/[index, [...slug]].astro
    └── projects/index.astro
```

## 七、自定义点

| 想改 | 改哪里 |
|---|---|
| 站点名/描述/社交链接 | `src/consts.ts` |
| 导航顺序 | `src/consts.ts` 的 `NAV` |
| 颜色/字体 | `src/layouts/BaseLayout.astro` 的 CSS variables |
| 加 Schema | `src/components/SEO.astro` |
| 加新内容类型 | `src/content.config.ts` + 对应目录 |
| OG 分享图 | `public/og-default.png`（已用 dreamina 预生成 1200×630） |

## 八、用 dreamina 重新生成 OG 图

本地 `dreamina` CLI 已装时（`where dreamina` 应返回路径），可随时重新生成 OG 图：

```bash
python "$HOME/.agents/skills/dreamina/scripts/generate.py" \
  --subcommand text2image \
  --prompt="Minimalist personal site Open Graph share card, 1200x630, horizontal. Solid deep teal-green gradient background (top: #0b3a2e, bottom: #051f17). Centered lower-left: large sans-serif title 'zhangzeyu.me' in white, weight 700. Below it: smaller light-gray tagline 'AI Agent · BioAI · Compliance'. Tiny top-right accent dot in #5fcfac. No human figures, no photos. Clean, calm, professional." \
  --ratio=16:9 \
  --resolution_type=2k \
  --poll=60 \
  --download_dir=./.og-work

# 输出 2560x1440，再 PIL 缩到 1200x630
python -c "
from PIL import Image
import glob, os
for f in glob.glob('.og-work/*.png'):
    if '1200' in f: continue
    img = Image.open(f)
    if img.size != (1200, 630):
        img.resize((1200, 630), Image.LANCZOS).save('public/og-default.png', 'PNG', optimize=True)
        print('Updated public/og-default.png')
        break
"
```

生成后重新 `pnpm build` 生效。

## 九、License

代码：MIT（你自己决定改）
内容：CC BY-NC 4.0（个人站惯例）
