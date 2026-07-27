// Content Collections 配置：定义 4 类内容 schema
// 改 schema 报错就是 schema 校验在工作

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Skills：技能条目（AI/Prompt skill 展示 + 技能矩阵）
const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    // 分类：ai / biotech / compliance / tooling
    category: z.enum(['ai', 'biotech', 'compliance', 'tooling', 'meta']),
    // 熟练度 1-5（用于技能矩阵可视化）
    level: z.number().min(1).max(5).default(3),
    // 触发词/场景标签
    triggers: z.array(z.string()).default([]),
    // 是否可交互工具
    interactive: z.boolean().default(false),
    // 关联 demo / 项目
    related: z.array(z.string()).default([]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

// Writing：博客文章
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    tags: z.array(z.string()).default([]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Tools：可视化 web 工具入口
const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    category: z.enum(['calculator', 'generator', 'checker', 'visualizer']),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// Projects：作品集
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    year: z.number(),
    role: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
    publishDate: z.coerce.date(),
  }),
});

export const collections = { skills, writing, tools, projects };
