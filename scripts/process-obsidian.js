import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Obsidian笔记目录
const OBSIDIAN_DIR = path.resolve(__dirname, '../docs/aniian')

async function processObsidianFiles() {
  console.log('Processing Obsidian files...')
  
  // 获取所有Markdown文件
  const files = await glob('**/*.md', { cwd: OBSIDIAN_DIR })
  
  for (const file of files) {
    try {
      const filePath = path.join(OBSIDIAN_DIR, file)
      let content = await fs.readFile(filePath, 'utf8')
      
      // 1. 处理常规Markdown链接，正确编码URL
      content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // 只处理内部链接
        if (url.startsWith('/aniian/') || url.startsWith('./aniian/')) {
          // 移除.md扩展名
          const cleanUrl = url.replace(/\.md$/, '')
          
          // 对路径中的每一部分进行编码，但保留斜杠
          const encodedUrl = cleanUrl.split('/')
            .map(part => encodeURIComponent(part))
            .join('/')
          
          return `[${text}](${encodedUrl})`
        }
        return match
      })
      
      // 2. 处理Obsidian内部链接 [[链接]]
      content = content.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
        const linkParts = p1.split('|')
        const link = linkParts[0].trim()
        const text = linkParts.length > 1 ? linkParts[1].trim() : link
        
        // 移除.md扩展名并编码链接
        const cleanLink = link.replace(/\.md$/, '')
        const encodedLink = encodeURIComponent(cleanLink)
        
        return `[${text}](/aniian/${encodedLink})`
      })
      
      // 3. 处理嵌入内容 ![[内容]]
      content = content.replace(/!\[\[(.*?)\]\]/g, (match, p1) => {
        if (/\.(png|jpe?g|gif|svg|webp)$/i.test(p1)) {
          // 处理图片，确保URL编码
          return `![](/aniian/assets/${encodeURIComponent(p1)})`
        }
        // 其他嵌入内容转为链接
        return `[↗ ${p1}](/aniian/${encodeURIComponent(p1.replace(/\.md$/, ''))})`
      })
      
      // 写回文件
      await fs.writeFile(filePath, content, 'utf8')
      console.log(`Processed: ${file}`)
    } catch (error) {
      console.error(`Error processing ${file}:`, error)
    }
  }
  
  console.log('Obsidian files processing completed!')
}

processObsidianFiles()