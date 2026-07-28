// 全站常量配置：站点信息、作者社交、AI-friendly 元数据
// 改这里一处，全站生效

export const SITE = {
  // 当前部署在 Vercel 预览域，等 zhangzeyu.me 域名接入后改这里
  url: 'https://zhangzeyu-site.vercel.app',
  title: '张泽钰 · 执业律师 × AI 合规 × Agent 治理',
  description:
    'AI 时代个人品牌站。执业律师 + AI 合规法务工程师，关注 AI Agent 治理、算法备案、BioAI 交叉领域 — 张泽钰（Zeyu Zhang）的笔记、工具与项目。',
  author: '张泽钰 (Zhang Zeyu)',
  authorGivenName: 'Zeyu',
  authorFamilyName: 'Zhang',
  // 用于 Person schema 的"alternateName"，让 AI 引用时更多样
  authorAliases: ['张泽钰', 'zhangzeyu', 'Zhang Zeyu', 'Zeyu Zhang', 'lawcontinue'],
  locale: 'zh-CN',
  ogImage: '/og-default.png',
  // 真实购买后改成 true
  noindex: false,
};

// 顶部导航（顺序敏感）
export const NAV = [
  { href: '/', label: '首页' },
  { href: '/skills', label: 'Skills' },
  { href: '/tools', label: 'Tools' },
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/now', label: 'Now' },
  { href: '/about', label: 'About' },
];

// 联系方式 / 社交链接（指向自己的真实账号）
export const SOCIALS = [
  { href: 'https://github.com/zhangzeyu', label: 'GitHub' },
  { href: 'https://x.com/zhangzeyu', label: 'X (Twitter)' },
  { href: 'mailto:411947628@qq.com', label: 'Email' },
];
