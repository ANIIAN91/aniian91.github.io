import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// VitePress 临时目录
const VITEPRESS_TEMP = path.resolve(__dirname, '../docs/.vitepress/.temp')
// Data Transfer 目录
const DATA_TRANSFER_DIR = path.resolve(__dirname, '../docs/aniian/Data-Transfer')

function cleanVitepressTemp() {
  console.log('清理 VitePress 临时文件...')
  
  if (fs.existsSync(VITEPRESS_TEMP)) {
    try {
      // 递归删除整个临时目录
      fs.rmSync(VITEPRESS_TEMP, { recursive: true, force: true })
      console.log('已删除 VitePress 临时目录')
    } catch (error) {
      console.error('清理 VitePress 临时目录失败:', error)
    }
  }
}

function checkAndFixIndexFiles() {
  console.log('检查索引文件...')

  // 检查 Data-Transfer 目录
  if (fs.existsSync(DATA_TRANSFER_DIR)) {
    const indexPath = path.join(DATA_TRANSFER_DIR, 'index.md')
    const indexCapitalPath = path.join(DATA_TRANSFER_DIR, 'Index.md')
    
    // 如果同时存在 index.md 和 Index.md，保留一个
    if (fs.existsSync(indexPath) && fs.existsSync(indexCapitalPath)) {
      try {
        fs.unlinkSync(indexCapitalPath)
        console.log('删除重复的 Index.md 文件')
      } catch (error) {
        console.error('删除重复索引文件失败:', error)
      }
    }
    
    // 如果不存在索引文件，创建一个
    if (!fs.existsSync(indexPath) && !fs.existsSync(indexCapitalPath)) {
      try {
        const content = `# Data Transfer\n\n这是 Data Transfer 目录的索引页面。\n`
        fs.writeFileSync(indexPath, content)
        console.log('创建了新的 index.md 文件')
      } catch (error) {
        console.error('创建索引文件失败:', error)
      }
    }
  }
  
  // 查找项目中所有目录，确保每个目录都有索引文件
  function ensureIndexInAllDirs(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      if (item.isDirectory() && !item.name.startsWith('.') && !item.name.startsWith('node_modules')) {
        const dirPath = path.join(dir, item.name)
        const indexPath = path.join(dirPath, 'index.md')
        
        // 确保每个目录都有 index.md
        if (!fs.existsSync(indexPath)) {
          try {
            const content = `# ${item.name}\n\n这是 ${item.name} 目录的索引页面。\n`
            fs.writeFileSync(indexPath, content)
            console.log(`为目录 ${item.name} 创建了 index.md 文件`)
          } catch (error) {
            console.error(`为目录 ${item.name} 创建索引文件失败:`, error)
          }
        }
        
        // 递归处理子目录
        ensureIndexInAllDirs(dirPath)
      }
    }
  }
  
  // 从 docs/aniian 开始处理所有目录
  const aniianDir = path.resolve(__dirname, '../docs/aniian')
  if (fs.existsSync(aniianDir)) {
    ensureIndexInAllDirs(aniianDir)
  }
}

// 执行清理和修复
cleanVitepressTemp()
checkAndFixIndexFiles()