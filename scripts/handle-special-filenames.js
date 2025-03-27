import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Obsidian笔记目录
const DOCS_DIR = path.resolve(__dirname, '../docs')

// 递归重命名目录，从深层目录开始
async function handleDirectoriesWithSpaces() {
  console.log('处理包含空格的目录名...')
  
  // 获取所有目录（深度优先排序，确保先处理最深的目录）
  const directories = [];
  
  // 递归获取所有目录
  function getAllDirectories(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = path.join(dirPath, item.name);
        const relPath = path.join(relativePath, item.name);
        
        // 先递归处理子目录
        getAllDirectories(fullPath, relPath);
        
        // 然后添加当前目录到列表
        directories.push({
          fullPath,
          relativePath: relPath
        });
      }
    }
  }
  
  // 从根目录开始收集所有目录
  getAllDirectories(DOCS_DIR);
  
  // 从深到浅处理目录（反转数组，最深的目录在前面）
  let renamedDirs = 0;
  
  for (const dir of directories) {
    const dirName = path.basename(dir.fullPath);
    
    // 检查目录名是否包含空格
    if (dirName.includes(' ')) {
      const parentDir = path.dirname(dir.fullPath);
      const newDirName = dirName.replace(/\s+/g, '-');
      const newDirPath = path.join(parentDir, newDirName);
      
      try {
        fs.renameSync(dir.fullPath, newDirPath);
        console.log(`已重命名目录: ${dirName} -> ${newDirName}`);
        renamedDirs++;
      } catch (error) {
        console.error(`重命名目录失败: ${dirName}`, error);
      }
    }
  }
  
  console.log(`共处理 ${renamedDirs} 个目录名`);
}

// 处理文件名中的空格
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
    if (path.basename(file).includes(' ')) {
      // 创建新的文件名 - 将空格替换为连字符
      const dir = path.dirname(file)
      const basename = path.basename(file).replace(/\s+/g, '-')
      const newFileName = path.join(dir, basename)
      const newFilePath = path.join(DOCS_DIR, newFileName)
      
      try {
        // 确保父目录存在
        if (fs.existsSync(path.dirname(filePath))) {
          // 重命名文件
          fs.renameSync(filePath, newFilePath)
          console.log(`已重命名: ${file} -> ${newFileName}`)
          renamed++
        }
      } catch (error) {
        console.error(`重命名文件失败: ${file}`, error)
      }
    }
  }
  
  console.log(`共处理 ${renamed} 个文件名`)
}

// 先处理目录名，再处理文件名
async function main() {
  await handleDirectoriesWithSpaces()
  await handleSpecialFilenames()
}

main().catch(err => {
  console.error('处理文件名出错:', err)
  process.exit(1)
})