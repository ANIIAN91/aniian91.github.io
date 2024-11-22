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
      { text: "Linux", link: "/linux/" },    // 对应 docs/linux/index.md
      { text: "Shell", link: "/shell/" },     // 对应 docs/shell/index.md
      { text: "学习生活", link: "/learn-life/" }, // 对应 docs/learn-life/index.md
      { text: "认识算法", link: "/algorithm/" }, // 对应 docs/algorithm/index.md
      { text: "认识模型", link: "/model/" }, // 对应 docs/model/index.md
      { text: "读论文", link: "/paper/" }, // 对应 docs/paper/index.md
      { text: "理解深度学习", link: "/understanding/" }, // 对应 docs/understanding/index.md
    ],
    pageNav: true,  // 启用"上一页"和"下一页"功能
    returnHome: true,  // 启用"返回首页"按钮
  },
})
