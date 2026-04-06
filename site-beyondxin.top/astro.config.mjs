import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import unocss from '@unocss/astro'
import astroExpressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import { remarkPlugins, rehypePlugins } from './plugins/index.mjs'

const SITE = {
  website: 'https://www.beyondxin.top/',
  base: '/',
}

export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  integrations: [
    sitemap(),
    robotsTxt(),
    unocss({ injectReset: true }),
    astroExpressiveCode(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },
  experimental: {
    contentIntellisense: true,
  },
  vite: {
    build: { chunkSizeWarningLimit: 1200 },
  },
})
