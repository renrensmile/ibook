import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';

const base = process.env.BASE_PATH && process.env.BASE_PATH !== '/'
  ? process.env.BASE_PATH
  : '/';

// 显式声明文章菜单：进入任意文章时，VuePress 会在该文章下自动展开标题大纲。
const pageLink = (text, link) => ({ text, link });

export default defineUserConfig({
  base,
  lang: 'zh-CN',
  title: '学习笔记',
  description: '记录学习、实践与问题排查过程',
  head: [
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['link', { rel: 'icon', href: `${base}image/logo_smile.png` }]
  ],
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/image/logo_smile.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '开始记录', link: '/guide/' },
      { text: '前端笔记', link: '/studyNote/' },
      { text: '问题排查', link: '/question/' },
      { text: '建站与部署', link: '/createblog/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始记录',
          children: [
            pageLink('开始记录', '/guide/'),
            pageLink('写作与新增笔记', '/guide/writing-notes.html'),
            pageLink('GitHub Pages 使用与自动化部署', '/guide/github-pages.html')
          ]
        }
      ],
      '/studyNote/': [
        {
          text: '前端笔记',
          children: [
            pageLink('前端笔记', '/studyNote/'),
            pageLink('JS语法基础', '/studyNote/JS语法基础.html'),
            pageLink('JS进阶语法', '/studyNote/JS进阶语法.html'),
            pageLink('ES6', '/studyNote/ES6.html'),
            pageLink('Web API', '/studyNote/webAPI.html'),
            pageLink('Ajax 笔记整理', '/studyNote/Ajax%20笔记整理.html'),
            pageLink('jQuery 常用语法', '/studyNote/jQuery常用语法.html'),
            pageLink('Node.js', '/studyNote/nodejs.html'),
            pageLink('Git 学习', '/studyNote/git学习.html'),
            pageLink('常用数组方法整理', '/studyNote/常用数组方法整理.html')
          ]
        }
      ],
      '/question/': [
        {
          text: '问题排查',
          children: [
            pageLink('问题排查', '/question/'),
            pageLink('Element UI 中遇到的问题', '/question/elementUI中遇到的问题.html'),
            pageLink('JS、C# 常见问题', '/question/js，cs常见问题.html'),
            pageLink('报错处理合集', '/question/报错处理合集.html'),
            pageLink('GitHub 公钥配置', '/question/github公钥配置.html')
          ]
        }
      ],
      '/createblog/': [
        {
          text: '建站与部署',
          children: [
            pageLink('建站与部署', '/createblog/'),
            pageLink('Markdown 常用语法', '/createblog/markDown语法.html'),
            pageLink('VuePress 踩坑', '/createblog/vuepress踩坑.html'),
            pageLink('域名解析问题', '/createblog/域名解析问题.html')
          ]
        }
      ]
    },
    sidebarDepth: 2,
    lastUpdated: true,
    lastUpdatedText: '最后更新'
  })
});
