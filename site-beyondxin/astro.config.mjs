import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://beyondxin.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  redirects: {
    '/blog/2026/离职随笔3': '/blog/离职随笔3',
    '/blog/2026/2026我的ai工作流': '/blog/2026我的ai工作流',
    '/blog/2026/春节碎碎念': '/blog/春节碎碎念',
  },
})
