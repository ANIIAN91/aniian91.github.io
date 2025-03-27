import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 目录文件路径
const DIRECTORY_FILE = path.resolve(__dirname, '../docs/directory.md')

function cleanDirectoryFile() {
  console.log('Cleaning directory file...')
  
  if (fs.existsSync(DIRECTORY_FILE)) {
    try {
      let content = fs.readFileSync(DIRECTORY_FILE, 'utf8')
      
      // 清理所有奇怪的符号
      content = content.replace(/}\)/g, '')
      
      // 确保所有链接格式正确
      content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // 移除.md扩展名
        const cleanUrl = url.replace(/\.md$/, '')
        return `[${text}](${cleanUrl})`
      })
      
      fs.writeFileSync(DIRECTORY_FILE, content)
      console.log('Directory file cleaned.')
    } catch (error) {
      console.error('Error cleaning directory file:', error)
    }
  } else {
    console.log('Directory file not found, skipping cleaning.')
  }
}

cleanDirectoryFile()