# site-beyondxin

Beyond欣的个人网站，使用 Astro、TypeScript 与原生 CSS 独立维护。

## 本地开发

```sh
pnpm install
pnpm dev
```

提交前运行：

```sh
pnpm check
pnpm build
```

站点内容分工：

- `beyondxin.com`：个人介绍、博客与作品集
- `notes.beyondxin.com`：技术笔记与项目长文
- `github.com/BeyondXinXin`：公开源码

博客由 `src/content/blog` 中的 Markdown 动态生成。执行 `pnpm build` 时，如果仓库同级存在
`MyNote/Blog`，会先同步最新文章；GitHub Actions 更新 `MyNote` 子模块后即可直接构建。
