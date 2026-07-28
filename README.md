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

## 四、部署

本项目代码完全兼容 Vercel 与 Cloudflare Pages，推荐**先 Vercel 起步**（上手快、预览域秒出），需要国内访问再迁 Cloudflare Pages。

### 路径 A：部署到 Vercel（推荐先走这条）

#### A.1 把项目推到 GitHub

```bash
cd /path/to/zhangzeyu-site

git init -b main
git add .
git commit -m "init: zhangzeyu.me"
gh repo create zhangzeyu-site --public --source=. --remote=origin --push
#   ^ 用 GitHub CLI 一条命令完成创建 + push；如果还没装 gh，
#     改用 git remote add origin <url> && git push -u origin main
```

#### A.2 在 Vercel 导入

1. 登录 https://vercel.com/new
2. 用 GitHub 账号授权（请确保是该仓库 owner 的账号，否则在 GitHub 那边的仓库 Settings → Collaborators 里邀请）
3. 在 "Import Git Repository" 里搜 `zhangzeyu-site`，点 **Import**
4. **Configure Project**：
   - **Framework Preset** 自动识别为 **Astro**
   - **Build Command** / **Install Command** / **Output Directory** 全部留空，由 `vercel.json` 接管
   - **Environment Variables**：留空（Astro 静态站零运行时变量）
5. 点 **Deploy**，等 1-3 分钟

#### A.3 拿到预览 URL

成功后 Vercel 会给你两条 URL：

- **Project URL**：`https://zhangzeyu-site.vercel.app`（每项目唯一）
- **Deployment URL**：`https://zhangzeyu-site-xxxx.vercel.app`（每次部署唯一）

两条指向同一份产物。后面要 push 重新部署时，Vercel 自动更新 Project URL。

#### A.4 ⚠ 国内访问 `*.vercel.app` 的坑

部分家庭网络运营商 DNS 会把 `*.vercel.app` 解析到污染 IP（常见是 Facebook 段 `31.13.x.x` 或 `2a03:2880::`），导致连不上。

**两种解决**：

- **换 DNS**（推荐）：电脑网络设置 → IPv4 DNS → `1.1.1.1`（首选）+ `223.5.5.5`（备用）→ `ipconfig /flushdns` → 立刻好
- **直接迁 Cloudflare Pages**：见路径 B，Cloudflare 节点对国内友好

---

### 路径 B：部署到 Cloudflare Pages（国内访问友好）

#### B.1 把项目推到 GitHub（同 A.1，跳过）

#### B.2 在 Cloudflare Pages 接仓库

1. 登录 https://dash.cloudflare.com/（用 Cloudflare 账号，没有就先注册）
2. 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选你的 GitHub 仓库（首次需要授权 Cloudflare 访问）
4. **Build settings**：
   - **Framework preset**: Astro
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Environment variables**: 添加 `NODE_VERSION=20`
5. 点 **Save and Deploy**

#### B.3 拿到预览 URL

Cloudflare Pages 给你 `https://zhangzeyu-site.pages.dev` 域名，**这个域 Cloudflare 国内解析友好**。

---

### Vercel ↔ Cloudflare Pages 切换：成本几乎为 0

两平台都接 GitHub 同一个仓库。要切换：

- **去对方平台点 Import** 同一个仓库
- 切换后**旧的部署不会被删**，可作为备份
- 唯一的代价：首次在另一个平台跑构建要 1-2 分钟

---

## 五、接自定义域名 `zhangzeyu.me`

两种托管路径都能接同一个域名。**推荐：先把域名买在 Cloudflare**（注册局价、零套路），接哪里都行。

### 1. 买 `zhangzeyu.me`

1. 登录 https://dash.cloudflare.com/
2. 左侧 **Account Home** → 右上 **Register Domains**
3. 搜索 `zhangzeyu.me`，确认未被注册后加入购物车 → 结账（~¥90/年）
4. 域名会自动进你的 Cloudflare DNS，无需额外配置

### 2. 在托管平台加自定义域

**如果你现在在 Vercel**：

1. 域名买完会自动在 Cloudflare DNS 里，但要先到 Cloudflare 控制台把 Nameservers 改成 Cloudflare 给的那两个（重要，否则域名不归 Cloudflare 管）
2. Vercel 项目 → **Settings** → **Domains** → 输入 `zhangzeyu.me` → **Add**
3. Vercel 给一条 DNS 配置提示，去 Cloudflare DNS 加：
   - `A @ → 76.76.21.21`（Vercel 的 IP，Cloudflare DNS 里"代理状态"**打开**橙色云朵）
   - 或 `CNAME www → cname.vercel-dns.com`
4. Vercel 自动签 HTTPS 证书，5-30 分钟生效

**如果你在 Cloudflare Pages**（推荐）：

1. Cloudflare Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入 `zhangzeyu.me` → Cloudflare 自动加 CNAME/A + 自动签证书
3. 因为域名本来就在 Cloudflare，**零额外配置**，几分钟内生效

### 3. 上线前最后一步：放开索引

站点默认 `noindex=true`（避免调试期被搜索引擎乱收录）。

正式上线后，编辑 `src/consts.ts`：

```ts
noindex: false,
```

把 `public/robots.txt` 改成允许抓取：

```txt
User-agent: *
Allow: /
```

提交一个改动 push，托管平台自动重新部署。

### 4. 让搜索引擎知道

- **Google Search Console**：https://search.google.com/search-console/ → 添加 `https://zhangzeyu.me` → 验证（推荐 DNS TXT 验证）→ 提交 `https://zhangzeyu.me/sitemap-index.xml`
- **Bing Webmaster**：https://www.bing.com/webmasters → 同上
- **关注 GEO 引用**：每两周在 Perplexity/Claude/GPT 里搜 `zhangzeyu`，看哪些回答引用了你

## 六、上线后建议做的事

1. **Google Search Console**：绑定域名，提交 sitemap（在 GSC 输入 `https://zhangzeyu.me/sitemap-index.xml`）
2. **Bing Webmaster**：同上
3. **监测被引用**：定期搜 `zhangzeyu` 在 Perplexity/Claude/GPT 里的引用反馈
4. **持续写**：每周至少一篇短文，是 AI 时代个人品牌最便宜的复利

## 七、目录结构

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

## 八、自定义点

| 想改 | 改哪里 |
|---|---|
| 站点名/描述/社交链接 | `src/consts.ts` |
| 导航顺序 | `src/consts.ts` 的 `NAV` |
| 颜色/字体 | `src/layouts/BaseLayout.astro` 的 CSS variables |
| 加 Schema | `src/components/SEO.astro` |
| 加新内容类型 | `src/content.config.ts` + 对应目录 |
| OG 分享图 | `public/og-default.png`（已用 dreamina 预生成 1200×630） |

## 九、用 dreamina 重新生成 OG 图

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

## 十、License

代码：MIT（你自己决定改）
内容：CC BY-NC 4.0（个人站惯例）
