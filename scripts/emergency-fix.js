import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DOCS_DIR = path.resolve(__dirname, '../docs')

// 清理 VitePress 临时文件夹
function cleanTempFiles() {
  const tempDir = path.join(DOCS_DIR, '.vitepress', '.temp')
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true })
    console.log('已清理 VitePress 临时文件')
  }
}

// 检查并修复 Data-Transfer 目录
function fixDataTransferDir() {
  const dataTransferDir = path.join(DOCS_DIR, 'aniian', 'Data-Transfer')
  
  // 如果目录存在，尝试创建索引文件
  if (fs.existsSync(dataTransferDir)) {
    const indexPath = path.join(dataTransferDir, 'index.md')
    
    // 创建索引文件
    const content = `---
title: 数据传输
---

# 数据传输

这是数据传输模块的索引页面。
`
    fs.writeFileSync(indexPath, content)
    console.log(`已创建 Data-Transfer 索引文件`)
    
    // 备份原始内容到新目录
    const backupDir = path.join(DOCS_DIR, 'backup-data-transfer')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }
    
    // 拷贝所有文件到备份目录
    const files = fs.readdirSync(dataTransferDir)
    for (const file of files) {
      if (file !== 'index.md') {
        const srcPath = path.join(dataTransferDir, file)
        const destPath = path.join(backupDir, file)
        
        if (fs.statSync(srcPath).isFile()) {
          fs.copyFileSync(srcPath, destPath)
          console.log(`备份文件: ${file}`)
        }
      }
    }
    
    // 只保留索引文件，删除其他所有文件
    for (const file of files) {
      if (file !== 'index.md') {
        const filePath = path.join(dataTransferDir, file)
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
          console.log(`临时移除文件: ${file}`)
        }
      }
    }
  } else {
    console.log('Data-Transfer 目录不存在，创建空目录')
    fs.mkdirSync(dataTransferDir, { recursive: true })
    
    // 创建索引文件
    const indexPath = path.join(dataTransferDir, 'index.md')
    const content = `# 数据传输\n\n这是数据传输模块的索引页面。\n`
    fs.writeFileSync(indexPath, content)
  }
}

// 修复 Read/Thesis 目录
function fixReadThesisDir() {
  const thesisDir = path.join(DOCS_DIR, 'aniian', 'Read', 'Thesis')
  
  if (fs.existsSync(thesisDir)) {
    const indexPath = path.join(thesisDir, 'index.md')
    
    // 创建索引文件
    const content = `---
title: 论文阅读笔记
---

# 论文阅读笔记

这是论文阅读笔记的索引页面。
`
    fs.writeFileSync(indexPath, content)
    console.log(`已创建 Read/Thesis 索引文件`)
    
    // 确保大写的 Index.md 不存在
    const capitalIndexPath = path.join(thesisDir, 'Index.md')
    if (fs.existsSync(capitalIndexPath)) {
      fs.unlinkSync(capitalIndexPath)
      console.log(`已删除大写的 Index.md 文件`)
    }
  }
}

// 执行修复
cleanTempFiles()
fixDataTransferDir()
fixReadThesisDir()

console.log('紧急修复完成！')