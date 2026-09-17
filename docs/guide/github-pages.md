# GitHub Pages 使用与自动化部署

GitHub Pages 可以把静态网站直接发布到 GitHub 提供的访问地址，不需要购买服务器。本笔记站使用 **GitHub Actions** 自动构建和发布：本地只提交源码，GitHub 负责安装依赖、构建 VuePress 并部署网站。

## 一、部署方式说明

当前项目采用 GitHub Pages 官方推荐的 **Actions Artifact 发布方式**：

```text
本地修改 Markdown / 配置
        ↓
git push 到 main 或 master
        ↓
GitHub Actions 自动执行 npm ci
        ↓
GitHub Actions 自动执行 npm run build
        ↓
上传 docs/.vuepress/dist 构建产物
        ↓
GitHub Pages 发布网站
```

这种方式的特点：

- 源码只放在主分支（`main` 或 `master`）。
- 构建结果不需要提交到 Git，也不需要维护 `gh-pages` 分支。
- 每次推送代码都会自动发布。
- GitHub Pages 使用的是 Actions 上传的构建产物，不是仓库根目录的 `README.md`。

> `https://github.com/用户名/仓库名` 是代码仓库页面，通常显示根目录 README；构建后的网站地址是 `https://用户名.github.io/仓库名/`。

## 二、项目中的自动部署文件

自动部署配置位于：

```text
.github/workflows/deploy.yml
```

当前工作流的核心配置如下：

```yaml
name: 部署 VuePress 到 GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write
```

含义：

- 向 `main` 或 `master` 推送时自动执行。
- `workflow_dispatch` 允许在 GitHub 的 Actions 页面手动点击运行。
- `contents: read` 允许工作流读取仓库源码。
- `pages: write` 和 `id-token: write` 是部署 GitHub Pages 必需的权限。

后续步骤会执行：

```yaml
- run: npm ci
- run: npm run build
  env:
    BASE_PATH: ${{ steps.pages.outputs.base_path }}
```

其中：

- `npm ci` 按 `package-lock.json` 安装固定版本依赖，保证云端和本地安装结果一致。
- `npm run build` 执行 VuePress 构建。
- `BASE_PATH` 由 GitHub Pages 自动提供，普通项目仓库会自动适配 `/仓库名/` 路径，不需要手工修改站点 `base`。

## 三、首次发布操作

### 1. 在 GitHub 创建仓库

打开 GitHub，点击右上角：

```text
+ → New repository
```

填写仓库名，例如：

```text
my-blog
```

建议：

- 仓库选择 **Public**。
- 如果本地项目已有 README，创建仓库时不要勾选 **Add a README file**，避免首次推送时产生两套提交历史。

### 2. 初始化并推送本地代码

进入项目根目录：

```bash
cd E:\blog\my-blog
```

如果尚未初始化 Git：

```bash
git init
git add .
git commit -m "初始化学习笔记站"
```

将默认分支统一为 `main`：

```bash
git branch -M main
```

添加 GitHub 仓库地址。将下面地址替换成实际仓库地址：

```bash
git remote add origin https://github.com/<GitHub用户名>/<仓库名>.git
git push -u origin main
```

首次推送成功后，后续只需要使用 `git push`。

### 3. 启用 GitHub Pages 的 Actions 发布

打开 GitHub 仓库，依次进入：

```text
Settings → Pages
```

找到 **Build and deployment**，将 **Source** 设为：

```text
GitHub Actions
```

设置完成后，不要选择 `Deploy from a branch`，也不需要创建 `gh-pages` 分支。

### 4. 查看自动构建结果

打开仓库的：

```text
Actions
```

找到工作流：

```text
部署 VuePress 到 GitHub Pages
```

绿色对勾表示构建和部署成功。首次部署通常需要几分钟。

完成后回到：

```text
Settings → Pages
```

页面会显示正式网站地址。

## 四、网站访问地址

GitHub 仓库地址和网站地址不同：

| 类型 | 示例 |
| --- | --- |
| 代码仓库 | `https://github.com/用户名/仓库名` |
| GitHub Pages 网站 | `https://用户名.github.io/仓库名/` |

例如用户名为 `renrensmile`、仓库名为 `meihua`，网站通常是：

```text
https://renrensmile.github.io/meihua/
```

只有仓库名恰好是 `<用户名>.github.io` 时，网站地址才没有仓库名这一层路径：

```text
https://<用户名>.github.io/
```

## 五、日常更新与自动发布

修改笔记或配置后，在项目根目录执行：

```bash
cd E:\blog\my-blog
git add .
git commit -m "新增 GitHub Pages 使用笔记"
git push
```

推送完成后：

1. GitHub Actions 自动开始构建。
2. 在 GitHub 仓库的 **Actions** 页面查看执行状态。
3. 绿色对勾后，刷新 GitHub Pages 网站即可看到更新。

日常发布不需要执行以下操作：

```text
不需要手动上传 dist
不需要提交 docs/.vuepress/dist/
不需要切换 gh-pages 分支
不需要在 GitHub 网页中手动构建
```

本地的 `npm run build` 只用于发布前自行检查，GitHub 云端仍会再构建一次。

## 六、发布前本地检查

在项目根目录执行：

```bash
npm install
npm run build
```

构建成功时会输出类似：

```text
success VuePress build completed
```

构建结果位于：

```text
docs/.vuepress/dist/
```

该目录是自动生成文件，已经被 `.gitignore` 忽略：

```text
不要手工修改
不要提交到 main
不要作为笔记源码保存
```

## 七、常见问题排查

### 1. Actions 页面显示的是旧记录

Actions 页面会保留历史运行记录。确认是否有新运行时，可以检查：

- 最近一条记录关联的提交说明是否是刚刚推送的内容；
- 分支是否为 `main` 或 `master`；
- 工作流文件 `.github/workflows/deploy.yml` 是否已经推送到该分支。

也可以进入 Actions 工作流后，点击 **Run workflow** 手动执行一次。

### 2. 工作流提示 `Invalid workflow file`

这是 YAML 格式或字段值错误。重点检查 `permissions`：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

特别注意：`id-token` 的值必须是 `write`，不能写成占位符或其他文本。

修复后提交并推送：

```bash
git add .github/workflows/deploy.yml
git commit -m "修复 Pages 工作流配置"
git push
```

### 3. Actions 在 `npm ci` 失败

常见原因是 `package.json` 和 `package-lock.json` 不一致。

本地执行：

```bash
npm install
git add package-lock.json
git commit -m "同步依赖锁文件"
git push
```

然后等待新的工作流运行。

### 4. 网站打开 404 或样式丢失

普通项目仓库的网站地址带仓库名路径，例如：

```text
https://用户名.github.io/仓库名/
```

本项目的 `docs/.vuepress/config.mjs` 使用 `BASE_PATH` 自动适配该路径。不要把 `base` 固定写成 `/`，也不要在 Markdown 中把站内资源路径写死为没有仓库前缀的完整外部地址。

### 5. 推送时报 GitHub 连接或证书错误

例如：

```text
Failed to connect to github.com port 443
SEC_E_UNTRUSTED_ROOT
```

这通常是当前网络、代理、HTTPS 扫描或系统证书链问题，不是 Git 仓库内容问题。处理顺序：

1. 确认浏览器能正常打开 GitHub。
2. 切换到可访问 GitHub 的网络，或启用已有代理。
3. 检查代理、VPN 或安全软件是否拦截 HTTPS。
4. 网络恢复后重新执行：

   ```bash
   git push
   ```

不要因为网络错误反复创建远程仓库或重复执行 `git init`。

### 6. 首次推送提示远程有提交，无法直接推送

如果创建 GitHub 仓库时勾选了 README，远程会先有一次提交。可以先合并远程历史：

```bash
git pull origin main --allow-unrelated-histories
```

处理完成后：

```bash
git push -u origin main
```

如果出现冲突，先确认需要保留本地还是远程的 README 内容，再完成合并。

## 八、维护清单

每次发布前检查：

1. 笔记和配置已经保存。
2. `git status` 中没有误加入 `node_modules`、`.cache`、`dist` 等生成目录。
3. 有需要时先执行 `npm run build`。
4. 使用 `git add`、`git commit`、`git push` 推送源码。
5. 在 GitHub Actions 确认最新一次运行是绿色对勾。
6. 从 GitHub Pages 网站地址验证更新内容。
