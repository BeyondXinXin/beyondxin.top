import { access, cp, rm } from 'node:fs/promises'
import { basename, resolve } from 'node:path'

const projectRoot = process.cwd()
const source = resolve(projectRoot, '..', 'MyNote', 'Blog')
const target = resolve(projectRoot, 'src', 'content', 'blog')
const staging = resolve(projectRoot, 'src', 'content', '.blog-sync')

try {
  await access(source)
} catch {
  console.info('[blog] MyNote/Blog 不存在，使用仓库内现有内容。')
  process.exit(0)
}

await rm(staging, { recursive: true, force: true })
await cp(source, staging, {
  recursive: true,
  filter: (path) => basename(path).toLocaleLowerCase('zh-CN') !== 'untitled.md',
})
await rm(target, { recursive: true, force: true })
await cp(staging, target, { recursive: true, force: true })
await rm(staging, { recursive: true, force: true })

console.info('[blog] 已从 MyNote/Blog 同步文章。')
