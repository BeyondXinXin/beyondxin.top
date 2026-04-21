import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '~/config'
import { getUrl } from '~/utils/common'
import { getExternalBlogPosts } from '~/utils/post'

export async function GET() {
  const blog = await getCollection('blog')

  const filteredBlogitems = blog.filter((item) => !item.data.draft)
  const externalBlogItems = getExternalBlogPosts()

  const sortedBlogItems = [
    ...filteredBlogitems.map(function (item) {
      return {
        title: item.data.title,
        link: getUrl(`/blog/${item.slug}`),
        pubDate: item.data.pubDate,
        description: item.data.description
      }
    }),
    ...externalBlogItems.map(function (item) {
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: ''
      }
    })
  ].sort(function (a, b) {
    return new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
  })

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    customData: `
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <title>${SITE.title}</title>
        <url>${SITE.website}/icon-512.png</url>
        <link>${SITE.website}</link>
      </image>`,

    items: sortedBlogItems.map(function (item) {
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        author: SITE.author
      }
    }),

    stylesheet: getUrl('/rss-styles.xsl')
  })
}
