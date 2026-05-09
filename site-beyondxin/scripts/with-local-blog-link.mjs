import { spawn, spawnSync } from 'node:child_process'
import {
  existsSync,
  readFileSync,
  rmdirSync,
  statSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const blogPath = resolve(root, 'src/content/blog')
const blogTarget = resolve(root, '../MyNote/Blog')
const placeholder = '../../../MyNote/Blog'

let createdLocalLink = false

const runGit = (args) => {
  spawnSync('git', args, { cwd: root, stdio: 'ignore' })
}

const hasUsableBlogDirectory = () => {
  try {
    return statSync(blogPath).isDirectory()
  } catch {
    return false
  }
}

const prepareLocalBlogLink = () => {
  if (process.platform !== 'win32' || hasUsableBlogDirectory()) {
    return
  }

  if (!existsSync(blogTarget)) {
    throw new Error(`Blog target does not exist: ${blogTarget}`)
  }

  const current = readFileSync(blogPath, 'utf8')
  if (current !== placeholder) {
    throw new Error(`Refusing to replace unexpected blog path: ${blogPath}`)
  }

  unlinkSync(blogPath)
  symlinkSync(blogTarget, blogPath, 'junction')
  runGit(['update-index', '--skip-worktree', 'src/content/blog'])
  createdLocalLink = true
}

const restorePlaceholder = () => {
  if (!createdLocalLink) {
    return
  }

  try {
    rmdirSync(blogPath)
    writeFileSync(blogPath, placeholder)
  } finally {
    runGit(['update-index', '--no-skip-worktree', 'src/content/blog'])
  }
}

const [command, ...args] = process.argv.slice(2)

if (!command) {
  throw new Error('Missing command to run')
}

prepareLocalBlogLink()

const child = spawn(command, args, {
  cwd: root,
  shell: process.platform === 'win32',
  stdio: 'inherit',
})

const forwardSignal = (signal) => {
  child.kill(signal)
}

process.once('SIGINT', () => forwardSignal('SIGINT'))
process.once('SIGTERM', () => forwardSignal('SIGTERM'))

child.once('exit', (code, signal) => {
  restorePlaceholder()

  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
