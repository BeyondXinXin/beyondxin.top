import type { Post } from '~/types'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

export async function getCategories() {
  const posts = await getPosts()
  const categories = new Map<string, Post[]>()

  for (const post of posts) {
    if (post.data.categories) {
      for (const c of post.data.categories) {
        const posts = categories.get(c) || []
        posts.push(post)
        categories.set(c, posts)
      }
    }
  }

  return categories
}

export async function getPosts(isArchivePage = false) {
  const posts = await getCollection('posts')

  posts.sort((a, b) => {
    if (isArchivePage) {
      return dayjs(a.data.pubDate).isBefore(dayjs(b.data.pubDate)) ? 1 : -1
    }

    const aDate = a.data.modDate ? dayjs(a.data.modDate) : dayjs(a.data.pubDate)
    const bDate = b.data.modDate ? dayjs(b.data.modDate) : dayjs(b.data.pubDate)

    return aDate.isBefore(bDate) ? 1 : -1
  })

  if (import.meta.env.PROD) {
    return posts.filter(post => post.data.draft !== true)
  }

  return posts
}

const parser = new MarkdownIt()
export function getPostDescription(post: Post) {
  if (post.data.description) {
    return post.data.description
  }

  let content = post.body || '';
  content = content.replace(/!\[.*?\]\(.*?\)/g, '');
  content = content.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, '');
  content = content.replace(/<img\b[^>]*>/gi, '');

  // 渲染 Markdown 为 HTML
  const html = parser.render(content);

  // 完全移除所有 HTML 标签
  const sanitized = sanitizeHtml(html, {
    allowedTags: [], // 不允许任何标签
    allowedAttributes: {} // 不允许任何属性
  });

  // 清理多余空白行和空格
  const trimmed = sanitized
    .replace(/\s+/g, ' ') // 将多个空白字符替换为单个空格
    .trim();

  return trimmed.slice(0, 400);
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export function getPathFromCategory(
  category: string,
  category_map: { name: string, path: string }[],
) {
  const mappingPath = category_map.find(l => l.name === category)
  return mappingPath ? mappingPath.path : category
}
