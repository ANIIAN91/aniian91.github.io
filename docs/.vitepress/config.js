import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: '/',
  title: "ANIIAN'S DIARY", // 网站标题
  description: "Record the learning of relevant deep learning, Linux, shell, etc.", // 网站描述

  themeConfig: {
    // 主题级选项
    nav: [
      { text: '首页', link: '/index' }, // 对应 docs/about.md
      {
        text: '记录',
        items: [
          { text: "Linux", link: "/linux/" },    // 对应 docs/linux/index.md
          { text: "Shell", link: "/shell/" },     // 对应 docs/shell/index.md
          { text: "深度学习", link: "/depp-learning/" }, // 对应 docs/deep-learning/index.md
        ]
      }
    ],
  },
})
