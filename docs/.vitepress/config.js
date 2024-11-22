import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: '/',
  title: "ANIIAN'S DIARY", // 网站标题
  description: "Record the learning of relevant deep learning, Linux, shell, etc.", // 网站描述

  themeConfig: {
    // 主题级选项
    nav: [
      { text: '首页', link: '/index' },
      { text: "Linux", link: "/linux/" },
      { text: "Shell", link: "/shell/" },
      { text: "学习生活", link: "/learn-life/" },
      { text: "认识算法", link: "/algorithm/" },
      { text: "认识模型", link: "/model/" },
      { text: "读论文", link: "/paper/" },
      { text: "理解深度学习", link: "/understanding/" },
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    pageNav: true,  // 启用上一页和下一页功能
    returnHome: true,  // 启用返回首页按钮
    sidebarCollapsible: true,  // 启用侧边栏折叠
    lastUpdated: true,
  },
})
