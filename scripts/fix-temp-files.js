import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 问题文件路径
const DOCS_DIR = path.resolve(__dirname, '../docs')

// 创建一个简单的索引文件
function createSimpleIndexFile() {
  const dataTransferDir = path.join(DOCS_DIR, 'aniian', 'Data-Transfer')
  
  if (fs.existsSync(dataTransferDir)) {
    const indexPath = path.join(dataTransferDir, 'index.md')
    
    // 创建简单的索引文件
    const content = `# Data Transfer\n\n这是数据传输相关的笔记。\n`
    
    try {
      fs.writeFileSync(indexPath, content)
      console.log(`已创建 Data-Transfer 索引文件`)
    } catch (error) {
      console.error(`创建索引文件失败:`, error)
    }
  } else {
    console.log(`Data-Transfer 目录不存在`)
  }
}

createSimpleIndexFile()