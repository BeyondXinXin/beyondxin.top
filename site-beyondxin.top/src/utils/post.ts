import { getCollection } from 'astro:content'
import type { PostSchema } from '~/content/schema'

export type PostCollectionKey = 'blog' | 'changelog'

export interface RenderedHeading {
  depth: number
  slug: string
  text: string
}

export interface RenderedPostResult {
  Content: any
  headings: RenderedHeading[]
  remarkPluginFrontmatter: {
    minutesRead?: number
  }
}

export interface PostEntry {
  id: string
  slug: string
  body: string
  collection: PostCollectionKey
  data: PostSchema
  rendered?: unknown
  filePath?: string
  render(): Promise<RenderedPostResult>
}

/**
 * Retrieves filtered posts from the specified content collection.
 * In production, it filters out draft posts.
 *
 * @async
 * @param {ContentCollectionKey} contentCollectionType
 *  The type of the content collection to filter.
 * @returns {Promise<CollectionEntry<ContentCollectionKey>[]>}
 *  A promise that resolves to the filtered posts.
 */
export async function getFilteredPosts(
  contentCollectionType: PostCollectionKey
): Promise<PostEntry[]> {
  const filter = ({ data }: { data: PostSchema }) =>
    import.meta.env.PROD ? !data.draft : true

  const posts =
    contentCollectionType === 'blog'
      ? await getCollection('blog', filter)
      : await getCollection('changelog', filter)

  return posts as PostEntry[]
}

/**
 * Sorts an array of posts by their publication date in descending order.
 *
 * @param {CollectionEntry<ContentCollectionKey>[]} posts - An array of posts to sort.
 * @returns {CollectionEntry<ContentCollectionKey>[]} - The sorted array of posts.
 */
export function getSortedPosts(
  posts: PostEntry[]
): PostEntry[] {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}
