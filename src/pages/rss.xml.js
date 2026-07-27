import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context) {
  const writings = await getCollection('writing', ({ data }) => !data.draft);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: writings
      .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
      .map((w) => ({
        title: w.data.title,
        description: w.data.summary,
        pubDate: w.data.publishDate,
        link: `/writing/${w.id}`,
        categories: w.data.tags,
      })),
    customData: `<language>zh-CN</language>`,
  });
}
