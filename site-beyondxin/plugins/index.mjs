import { visit } from 'unist-util-visit'
import remarkDirective from 'remark-directive'
import remarkDirectiveSugar from 'remark-directive-sugar'
import remarkImgattr from 'remark-imgattr'
import remarkMath from 'remark-math'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeCallouts from 'rehype-callouts'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const UI = {
  externalLink: {
    newTab: true,
    cursorType: '',
    showNewTabIcon: false,
  },
}

export const remarkPlugins = [
  remarkDirective,
  [
    remarkDirectiveSugar,
    {
      badge: {
        presets: {
          n: { text: 'NEW' },
          a: { text: 'ARTICLE' },
          v: { text: 'VIDEO' },
        },
      },
      link: {
        faviconSourceUrl:
          'https://www.google.com/s2/favicons?domain={domain}&sz=128',
        imgProps: (node) => {
          const props = {
            'aria-hidden': 'true',
          }
          if (node.attributes?.class?.includes('github'))
            props.src =
              'https://www.google.com/s2/favicons?domain=github.com&sz=128'

          return props
        },
      },
      image: {
        stripParagraph: false,
      },
    },
  ],
  remarkImgattr,
  remarkMath,
]

export const rehypePlugins = [
  rehypeHeadingIds,
  rehypeKatex,
  [
    rehypeCallouts,
    {
      theme: 'vitepress',
    },
  ],
  [
    rehypeExternalLinks,
    {
      rel: UI.externalLink.newTab ? 'noopener noreferrer' : [],
      content: (el) => {
        if (!UI.externalLink.newTab || !UI.externalLink.showNewTabIcon)
          return null

        let hasImage = false
        visit(el, 'element', (childNode) => {
          if (childNode.tagName === 'img') {
            hasImage = true
            return false
          }
        })
        if (hasImage) return null

        return {
          type: 'text',
          value: '',
        }
      },
      contentProperties: (el) => {
        if (!UI.externalLink.newTab || !UI.externalLink.showNewTabIcon)
          return null

        let hasImage = false
        visit(el, 'element', (childNode) => {
          if (childNode.tagName === 'img') {
            hasImage = true
            return false
          }
        })
        if (hasImage) return null

        return {
          'u-i-carbon-arrow-up-right': true,
          className: ['new-tab-icon'],
          'aria-hidden': 'true',
        }
      },
      properties: (el) => {
        const props = {}
        const href = el.properties.href

        if (!href || typeof href !== 'string') return props

        if (UI.externalLink.newTab) {
          props.target = '_blank'
          props.ariaLabel = 'Open in new tab'
          if (
            UI.externalLink.cursorType.length > 0 &&
            UI.externalLink.cursorType !== 'pointer'
          ) {
            props.className = Array.isArray(el.properties.className)
              ? [...el.properties.className, 'external-link-cursor']
              : ['external-link-cursor']
          }
        }

        return props
      },
    },
  ],
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: (el) => {
        let content = ''
        visit(el, 'text', (textNode) => {
          content += textNode.value
        })
        return {
          class: 'header-anchor',
          'tab-index': 0,
          'aria-hidden': 'false',
          'aria-label': content ? `Link to ${content}` : undefined,
          'data-pagefind-ignore': true,
        }
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
]
