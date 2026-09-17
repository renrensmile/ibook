# 学习笔记网站

基于 **VuePress 2、Vue 3 和 Vite** 搭建的个人学习笔记网站。文章使用 Markdown 编写，提交到 GitHub 后可通过 GitHub Pages 免费发布。

## 技术栈

- VuePress `2.0.0-rc.2`
- Vue 3（由 VuePress 2 提供）
- Vite（通过 `@vuepress/bundler-vite` 构建）
- GitHub Actions + GitHub Pages（自动部署）

> 原 VuePress 1 的 Webpack 主题与 Live2D 插件不兼容 VuePress 2，因此已移除；站点现在使用 VuePress 官方默认主题。

## 本地运行

### 环境要求

- Node.js 20 或更高版本
- npm 9 或更高版本

### 安装依赖与预览

```bash
npm install
npm run dev
```

命令启动后，按终端提示打开本地地址（通常为 `http://localhost:8080`）。

### 构建静态网站

```bash
npm run build
```

构建产物生成在 `docs/.vuepress/dist/`。

## 目录说明

```text
my-blog/
├── .github/workflows/deploy.yml  # GitHub Pages 自动构建与发布
├── docs/                         # 所有站点内容
│   ├── .vuepress/config.mjs      # VuePress 导航、侧边栏、主题与 Vite 配置
│   ├── guide/                    # 写作与发布说明
│   ├── studyNote/                # 前端学习笔记
│   ├── question/                 # 问题排查记录
│   └── createblog/               # 建站与部署笔记
├── package.json                  # 脚本与依赖
└── README.md                     # 本说明文档
```

## 新增学习笔记

1. 在 `docs/studyNote/`、`docs/question/` 或其他合适目录中创建一个 Markdown 文件。
2. 用 Markdown 编写内容。
3. 在 `docs/.vuepress/config.mjs` 的对应 `sidebar` 数组中加入文件路径（不带 `.md` 后缀）。
4. 执行 `npm run dev` 本地确认页面与导航。
5. 提交并推送到 GitHub。

详细写作步骤参见：[站内写作说明](docs/guide/writing-notes.md)。

## GitHub Pages 发布

本项目包含 `.github/workflows/deploy.yml` 自动发布工作流。

首次将项目推送到 GitHub 后：

1. 打开仓库 **Settings → Pages**。
2. 将 **Source** 选择为 **GitHub Actions**。
3. 推送默认分支代码，等待 Actions 中的部署工作流完成。
4. 到 **Settings → Pages** 获取访问链接。

- 用户主页仓库（`<用户名>.github.io`）发布地址：`https://<用户名>.github.io/`
- 普通仓库发布地址：`https://<用户名>.github.io/<仓库名>/`

工作流会自动识别仓库类型并配置正确的资源基础路径。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 用 Vite 启动本地开发预览 |
| `npm run build` | 用 Vite 构建静态站点 |

## 注意事项

- 不要提交 `node_modules`、`.temp` 和 `docs/.vuepress/dist`。
- 若要修改网站名称、导航、侧边栏，编辑 `docs/.vuepress/config.mjs`。
- 使用 GitHub Actions 发布时，不需要手动执行旧版 `deploy.sh`；该脚本已不再使用。
