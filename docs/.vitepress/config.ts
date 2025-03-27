import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs'
import markdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'

// 处理Obsidian wiki链接的自定义插件
function obsidianLinksPlugin(md) {
  // 处理内部链接 [[链接]]
  md.use(markdownItRegex, {
    name: 'obsidian-internal-link',
    regex: /\[\[(.*?)\]\]/,
    replace: (match) => {
      const linkText = match.split('|')[0].trim()
      const displayText = match.includes('|') ? match.split('|')[1].trim() : linkText
      return `[${displayText}](/aniian/${linkText.replace(/ /g, '%20')})`
    }
  })
  
  // 处理嵌入内容 ![[内容]]
  md.use(markdownItRegex, {
    name: 'obsidian-embed',
    regex: /!\[\[(.*?)\]\]/,
    replace: (match) => {
      // 处理图片
      if (/\.(png|jpe?g|gif|svg|webp)$/i.test(match)) {
        return `![](/${match.replace(/ /g, '%20')})`
      }
      // 处理其他笔记嵌入（这里简化为链接）
      return `[↗ ${match}](/aniian/${match.replace(/ /g, '%20')})`
    }
  })
}

export default defineConfig({
  // 基本配置
  title: 'Aniian 笔记集',
  description: '研究与学习笔记',
  
  // 忽略死链接（Obsidian链接可能在构建时无法解析）
  ignoreDeadLinks: true,
  
  // 自定义Markdown解析
  markdown: {
    config: (md) => {
      obsidianLinksPlugin(md)
    },
    // 允许HTML标签（Obsidian笔记中可能包含HTML）
    html: true
  },
  
  // 其他配置...
})
