import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Obsidian笔记目录
const OBSIDIAN_DIR = path.resolve(__dirname, '../docs/aniian')
// 输出目录页面
const OUTPUT_FILE = path.resolve(__dirname, '../docs/directory.md')

// 忽略的文件和目录
const IGNORE_PATTERNS = ['.obsidian', '.trash', '.git', 'node_modules', '.DS_Store']

// 修改 generateDirectoryMarkdown 函数，添加目录树结构
function generateDirectoryMarkdown(dir, basePath = '', level = 0) {
  let result = ''
  
  try {
    const items = fs.readdirSync(path.join(OBSIDIAN_DIR, dir))
      .filter(item => !IGNORE_PATTERNS.some(pattern => item.includes(pattern)))
      .sort((a, b) => {
        // 目录优先
        const aIsDir = fs.statSync(path.join(OBSIDIAN_DIR, dir, a)).isDirectory()
        const bIsDir = fs.statSync(path.join(OBSIDIAN_DIR, dir, b)).isDirectory()
        if (aIsDir && !bIsDir) return -1
        if (!aIsDir && bIsDir) return 1
        return a.localeCompare(b)
      })

    for (const item of items) {
      const itemPath = path.join(dir, item)
      const fullPath = path.join(OBSIDIAN_DIR, itemPath)
      const stat = fs.statSync(fullPath)
      const indent = '  '.repeat(level)
      
      if (stat.isDirectory()) {
        // 处理目录 - 添加可折叠的结构
        const folderId = `folder-${itemPath.replace(/[^\w-]/g, '-')}`;
        result += `${indent}<details class="directory-folder">\n`
        result += `${indent}  <summary><strong>${item}</strong></summary>\n`
        const nestedContent = generateDirectoryMarkdown(itemPath, `${basePath}/${item}`, level + 1)
        if (nestedContent) {
          result += nestedContent
        }
        result += `${indent}</details>\n`
      } else if (item.endsWith('.md')) {
        // 处理Markdown文件
        const fileTitle = getFileTitle(fullPath) || item.replace('.md', '')
        
        const relativePath = `/aniian/${itemPath}`
          .replace(/\\/g, '/')  
          .replace(/\.md$/, '')
          .replace(/\s+/g, '-'); // 将空格替换为连字符

        const encodedPath = relativePath.split('/')
          .map(part => encodeURIComponent(part.replace(/\s+/g, '-'))) // 确保所有部分都没有空格
          .join('/')
        
        result += `${indent}<div class="file-item">${indent}- <a href="${encodedPath}" class="file-link">${fileTitle}</a></div>\n`
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error)
  }
  
  return result
}

function getFileTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: fileContent } = matter(content)
    
    // 优先使用YAML front matter中的title
    if (data.title) return data.title
    
    // 否则尝试从内容中提取第一个标题
    const titleMatch = fileContent.match(/^#\s+(.*)$/m)
    if (titleMatch) return titleMatch[1]
    
    return null
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

// 修改 generateDirectory 函数
function generateDirectory() {
  console.log('Generating directory listing...')
  
  const content = `# Aniian笔记目录

<div class="directory-container">
  <div class="directory-header">
    <h2>目录导航</h2>
    <p>这里列出了所有Obsidian笔记的结构，点击链接可直接访问对应内容。</p>
  </div>

  <div class="directory-content">
${generateDirectoryMarkdown('')}
  </div>

  <div class="directory-footer">
    <p><em>本目录自动生成于 ${new Date().toLocaleString()}</em></p>
  </div>
</div>

<style>
.directory-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.directory-header {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.directory-content {
  overflow-x: auto;
}

.directory-content a {
  text-decoration: none;
  transition: color 0.2s;
}

.directory-content a:hover {
  color: #4CAF50;
  text-decoration: underline;
}

.directory-content strong {
  color: #333;
  font-size: 1.1em;
}

.directory-footer {
  margin-top: 20px;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}
</style>
`

  fs.writeFileSync(OUTPUT_FILE, content)
  console.log(`Directory generated at ${OUTPUT_FILE}`)
}

generateDirectory()