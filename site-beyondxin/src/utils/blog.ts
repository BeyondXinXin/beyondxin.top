export function toBlogSlug(id: string) {
  const parts = id.split('/')
  const year = parts.length > 1 ? parts.shift() : undefined
  const filename = parts.join('/')
  const slug = filename
    .toLocaleLowerCase('zh-CN')
    .replace(/\s+/g, '-')
    .replace(/[^\p{Letter}\p{Number}-]/gu, '')

  return year === '2026' || !year ? slug : `${year}/${slug}`
}
