import type { ThemeConfig } from '~/types'

export const defaultConfig: ThemeConfig = {
  site: {
    title: '读书笔记',
    subtitle: '不那么正经的',
    author: 'BeyondXinXin',
    description: 'Unconventional Reading Notes',
    website: 'https://books.beyondxin.top/',
    pageSize: 8,
    socialLinks: [],
    navLinks: [
      {
        name: 'Posts',
        href: '/',
      },
      {
        name: 'Archive',
        href: '/archive',
      },
      // {
      //   name: 'Categories',
      //   href: '/categories',
      // },
      {
        name: 'About',
        href: '/about',
      },
    ],
    categoryMap: [],
    footer: [
      '<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023033867号</a>',
    ],
  },
  appearance: {
    theme: 'light',
    locale: 'zh-cn',
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#FFFFFF',
      background: '#232222',
    },
    fonts: {
      header:
        '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
      ui: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
    },
  },
  seo: {
    twitter: '@moeyua13',
    meta: [],
    link: [],
  },
  rss: {
    fullText: true,
  },
  comment: {
  },
  analytics: {
    googleAnalyticsId: '',
    umamiAnalyticsId: '',
  },
  latex: {
    katex: false,
  },
}

