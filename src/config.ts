import type { Site, Ui, Features } from './types'

export const SITE: Site = {
  website: 'https://www.beyondxin.top/',
  base: '/',
  title: 'Beyond欣',
  description: '个人网站，记录生活中的点滴',
  author: 'Beyond欣',
  lang: 'zh',
  ogLocale: 'zh-CN',
  imageDomains: ['cdn.bsky.app'],
}

export const UI: Ui = {
  internalNavs: [
    {
      path: '/blog',
      title: '博客',
      displayMode: 'alwaysText',
      text: '博客',
    },
    {
      path: '/projects',
      title: '作品集',
      displayMode: 'alwaysText',
      text: '作品集',
    }
  ],
  socialLinks: [
    {
      link: 'https://github.com/BeyondXinXin',
      title: 'BeyondXinXin on Github',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
    {
      link: 'https://space.bilibili.com/285016963',
      title: 'BeyondXinXin on BiliBili',
      displayMode: 'alwaysIcon',
      icon: 'i-ri:bilibili-line',
    },
  ],
  navBarLayout: {
    left: [],
    right: [
      'internalNavs',
      'hr',
      'socialLinks',
    ],
    mergeOnMobile: true,
  },
  tabbedLayoutTabs: [
    { title: '网站', path: '/projects' },
    { title: '作品集', path: '/highlights' },
  ],
  groupView: {
    maxGroupColumns: 3,
    showGroupItemColorOnHover: true,
  },
  externalLink: {
    newTab: true,
    cursorType: '',
    showNewTabIcon: false,
  },
}

export const FEATURES: Features = {
  share: [
    false,
    {
      twitter: false,
      bluesky: false,
      mastodon: false,
      facebook: false,
      pinterest: false,
      reddit: false,
      telegram: false,
      whatsapp: false,
      email: false,
    },
  ],
  toc: [
    true,
    {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'left',
      displayMode: 'content',
    },
  ],
  ogImage: [
    true,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
    },
  ],
  slideEnterAnim: [true, { enterStep: 60 }],
}
