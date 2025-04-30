import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import { pageSchema, postSchema, projectsSchema, highlightSchema } from './schema'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: postSchema,
})

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema,
})

const highlights = defineCollection({
  type: 'content',
  schema: highlightSchema,
})

export const collections = {
  pages,
  blog,
  projects,
  highlights,
}
