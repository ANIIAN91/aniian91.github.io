import { defineConfig } from 'vitepress'
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import mathjax3 from 'markdown-it-mathjax3'
import linkTransformPlugin from '../../plugins/link-transform.js'

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
  title: 'Aniian 笔记集',
  description: '个人研究笔记和学习资料',
  ignoreDeadLinks: true, // 忽略死链接
  
  // 简化导航
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '目录', link: '/directory' }
    ],
    
    sidebar: 'auto'
  },
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
  buildEnd() {
    const cnamePath = resolve(__dirname, './dist/CNAME');
    writeFileSync(cnamePath, 'www.aniian.site');
    console.log('CNAME file has been created at:', cnamePath);
  },
  // 添加自定义路径别名
  vite: {
    resolve: {
      alias: {
        '/aniian/': resolve(__dirname, '../aniian/')
      }
    },
    // 处理URL编码问题
    server: {
      fs: {
        allow: [resolve(__dirname, '../')]
      }
    },
    plugins: [linkTransformPlugin()]
  },
  // 自定义路由别名 - 修改为正确的格式
  rewrites: {
    '/books/:book/:chapter': '/aniian/Read/Book/:book/:chapter'
  }
})
