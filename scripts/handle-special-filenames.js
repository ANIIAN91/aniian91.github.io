import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'  // 修改这行，使用命名导入而不是默认导入

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Obsidian笔记目录
const DOCS_DIR = path.resolve(__dirname, '../docs')

async function handleSpecialFilenames() {
  console.log('处理特殊文件名...')
  
  // 查找所有包含空格的Markdown文件
  const files = await glob('**/*.md', { 
    cwd: DOCS_DIR, 
    nodir: true,
    ignore: ['node_modules/**', '.vitepress/**']
  })
  
  let renamed = 0
  
  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file)
    
    // 检查文件名是否包含空格
    if (file.includes(' ')) {
      // 创建新的文件名 - 将空格替换为连字符
      const newFileName = file.replace(/\s+/g, '-')
      const newFilePath = path.join(DOCS_DIR, newFileName)
      
      try {
        // 重命名文件
        fs.renameSync(filePath, newFilePath)
        console.log(`已重命名: ${file} -> ${newFileName}`)
        renamed++
        
        // 如果存在同名的 .js 文件，也重命名它
        const jsFile = filePath.replace(/\.md$/, '.js')
        const newJsFile = newFilePath.replace(/\.md$/, '.js')
        if (fs.existsSync(jsFile)) {
          fs.renameSync(jsFile, newJsFile)
          console.log(`已重命名相关JS文件: ${jsFile} -> ${newJsFile}`)
        }
      } catch (error) {
        console.error(`重命名文件失败: ${file}`, error)
      }
    }
  }
  
  console.log(`共处理 ${renamed} 个文件名`)
}

handleSpecialFilenames()