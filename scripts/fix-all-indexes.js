import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 项目根目录
const DOCS_DIR = path.resolve(__dirname, '../docs')
// VitePress 临时目录
const VITEPRESS_TEMP = path.join(DOCS_DIR, '.vitepress/.temp')

/**
 * 清理 VitePress 临时目录
 */
function cleanVitepressTemp() {
  console.log('清理 VitePress 临时文件...')
  
  if (fs.existsSync(VITEPRESS_TEMP)) {
    try {
      fs.rmSync(VITEPRESS_TEMP, { recursive: true, force: true })
      console.log('已删除 VitePress 临时目录')
    } catch (error) {
      console.error('清理 VitePress 临时目录失败:', error)
    }
  }
}

/**
 * 确保目录中有索引文件
 */
async function fixAllIndexFiles() {
  console.log('开始修复所有目录的索引文件...')
  
  // 获取所有目录
  const allDirectories = [];
  
  try {
    // 使用 glob 查找所有目录
    const patterns = await glob('**/*/index.md', {
      cwd: DOCS_DIR,
      ignore: ['.vitepress/**', 'node_modules/**', '.obsidian/**']
    });
    
    // 创建已有索引的目录集合
    const dirsWithIndex = new Set();
    patterns.forEach(file => {
      const dirPath = path.dirname(file);
      dirsWithIndex.add(dirPath);
    });
    
    // 查找所有目录
    const dirs = await glob('**/*/', {
      cwd: DOCS_DIR,
      ignore: ['.vitepress/**', 'node_modules/**', '.obsidian/**']
    });
    
    let created = 0;
    
    // 检查每个目录，如果没有索引文件则创建
    for (const dir of dirs) {
      if (!dirsWithIndex.has(dir)) {
        const dirFullPath = path.join(DOCS_DIR, dir);
        const indexPath = path.join(dirFullPath, 'index.md');
        
        // 清理大写索引文件
        const capitalIndexPath = path.join(dirFullPath, 'Index.md');
        if (fs.existsSync(capitalIndexPath)) {
          try {
            fs.unlinkSync(capitalIndexPath);
            console.log(`删除了大写索引文件: ${capitalIndexPath}`);
          } catch (error) {
            console.error(`删除文件失败: ${capitalIndexPath}`, error);
          }
        }
        
        // 创建索引文件
        try {
          const dirName = path.basename(dir.slice(0, -1)); // 移除末尾的斜杠
          const content = `# ${dirName}\n\n这是 ${dirName} 目录的索引页面。\n`;
          fs.writeFileSync(indexPath, content);
          console.log(`创建了索引文件: ${indexPath}`);
          created++;
        } catch (error) {
          console.error(`创建索引文件失败: ${indexPath}`, error);
        }
      }
    }
    
    console.log(`共创建了 ${created} 个索引文件`);
  } catch (error) {
    console.error('修复索引文件时出错:', error);
  }
}

/**
 * 确保特定问题目录有索引文件
 */
function fixProblemDirectories() {
  console.log('修复已知问题目录...');
  
  // 问题目录列表
  const problemDirs = [
    'aniian/Data-Transfer',
    'aniian/Read/Thesis',
    'aniian/Read/Book'
  ];
  
  let fixed = 0;
  
  for (const dirRelative of problemDirs) {
    const dirPath = path.join(DOCS_DIR, dirRelative);
    
    if (fs.existsSync(dirPath)) {
      const indexPath = path.join(dirPath, 'index.md');
      const capitalIndexPath = path.join(dirPath, 'Index.md');
      
      // 如果存在大写索引文件但不存在小写索引文件，重命名
      if (!fs.existsSync(indexPath) && fs.existsSync(capitalIndexPath)) {
        try {
          fs.renameSync(capitalIndexPath, indexPath);
          console.log(`已重命名: ${capitalIndexPath} -> ${indexPath}`);
          fixed++;
          continue;
        } catch (error) {
          console.error(`重命名索引文件失败: ${capitalIndexPath}`, error);
        }
      }
      
      // 如果不存在索引文件，创建
      if (!fs.existsSync(indexPath)) {
        try {
          const dirName = path.basename(dirPath);
          const content = `# ${dirName}\n\n这是 ${dirName} 目录的内容索引。\n`;
          fs.writeFileSync(indexPath, content);
          console.log(`为问题目录创建索引: ${indexPath}`);
          fixed++;
        } catch (error) {
          console.error(`创建索引文件失败: ${indexPath}`, error);
        }
      }
    } else {
      console.log(`目录不存在: ${dirPath}`);
    }
  }
  
  console.log(`已修复 ${fixed} 个问题目录`);
}

// 执行所有修复步骤
async function main() {
  try {
    // 步骤1: 清理 VitePress 临时目录
    cleanVitepressTemp();
    
    // 步骤2: 修复已知问题目录
    fixProblemDirectories();
    
    // 步骤3: 确保所有目录都有索引文件
    await fixAllIndexFiles();
    
    console.log('索引文件修复完成');
  } catch (error) {
    console.error('修复过程中出错:', error);
    process.exit(1);
  }
}

main();