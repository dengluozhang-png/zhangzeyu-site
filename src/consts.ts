// 全站常量配置：站点信息、作者社交、AI-friendly 元数据
// 改这里一处，全站生效

export const SITE = {
  // 上线前替换成真实域名
  url: 'https://zhangzeyu.me',
  title: '张泽宇 · AI Agent × 生物医药 × 合规治理',
  description:
    'AI 时代个人品牌站。AI Agent 工程、Agent 治理与合规、BioAI 交叉领域 — 张泽宇（zhangzeyu）的笔记、工具与项目。',
  author: '张泽宇 (Zhang Zeyu)',
  authorGivenName: 'Zeyu',
  authorFamilyName: 'Zhang',
  // 用于 Person schema 的"alternateName"，让 AI 引用时更多样
  authorAliases: ['zhangzeyu', 'Zhang Zeyu', 'Zeyu Zhang'],
  locale: 'zh-CN',
  ogImage: '/og-default.png',
  // 真实购买后改成 true
  noindex: true,
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
  { href: 'mailto:hi@zhangzeyu.me', label: 'Email' },
];
