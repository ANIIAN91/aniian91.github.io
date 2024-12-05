import { defineConfig } from 'vitepress'
import { writeFileSync } from 'fs';
import { resolve } from 'path'; // 确保引入 resolve
import mathjax3 from 'markdown-it-mathjax3'
const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
  'mjx-container',
  'mjx-assistive-mml',
];

export default defineConfig({
  base: '/',
  title: "ANIIAN'S DIARY", // 网站标题
  description: "Record the learning of relevant deep learning, Linux, shell, etc.", // 网站描述
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },

  pageNav: true,  // 启用上一页和下一页功能
  returnHome: true,  // 启用返回首页按钮
  sidebarCollapsible: true,  // 启用侧边栏折叠
  lastUpdated: true,
  themeConfig: {
    // 主题级选项
    nav: [
      { text: '首页', link: '/index' },
      { text: "生活", link: "/learn-life/" },
      { text: "算法", link: "/algorithm/" },
      { text: "模型", link: "/model/" },
      { text: "论文", link: "/paper/" },
      { text: "理解深度学习", link: "/understanding/" },
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

  },
  buildEnd() {
    const cnamePath = resolve(__dirname, './dist/CNAME');
    writeFileSync(cnamePath, 'www.aniian.site');
    console.log('CNAME file has been created at:', cnamePath);
  }
})
