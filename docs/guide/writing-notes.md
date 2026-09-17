# 写作与新增笔记

## 新建文章

以新增一篇 Vue 学习笔记为例：

1. 在 `docs/studyNote/` 下创建文件，例如 `vue-生命周期.md`。
2. 使用 Markdown 编写内容：

````markdown
# Vue 生命周期

## 关键结论

组件从创建到销毁会经过多个生命周期阶段。

## 示例

```js
import { onMounted } from 'vue';

onMounted(() => {
  console.log('组件已挂载');
});
```
````

3. 打开 `docs/.vuepress/config.mjs`，在 `'/studyNote/'` 对应数组中添加文章路径：

```js
'vue-生命周期'
```

4. 启动本地预览：

```bash
npm run dev
```

## 分类建议

- `docs/studyNote/`：系统性技术学习笔记。
- `docs/question/`：报错、故障与排查过程。
- `docs/createblog/`：网站搭建、Markdown 与部署相关内容。
- `docs/guide/`：本站使用说明。

::: warning 注意
文件名与配置中的路径必须一致；中文文件名可以使用，但修改路径时要同步更新导航或侧边栏配置。
:::
