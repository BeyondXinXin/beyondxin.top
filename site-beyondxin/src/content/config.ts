import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import {
  pageSchema,
  postSchema,
  projectsSchema,
  highlightSchema,
  streamsSchema,
  feedSchema,
} from './schema'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const home = defineCollection({
  type: 'content',
  schema: pageSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const changelog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema,
})

const streams = defineCollection({
  type: 'data',
  schema: streamsSchema,
})

const feeds = defineCollection({
  type: 'content',
  schema: feedSchema,
})

const highlights = defineCollection({
  type: 'content',
  schema: highlightSchema,
})

export const collections = {
  pages,
  home,
  blog,
  changelog,
  projects,
  streams,
  feeds,
  highlights,
}
