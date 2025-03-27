export default function linkTransformPlugin() {
  return {
    name: 'vitepress-plugin-link-transform',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return code
      
      // 1. 清理奇怪的})符号
      code = code.replace(/}\)/g, '')
      
      // 2. 处理常规Markdown链接
      code = code.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // 只处理内部链接
        if (url.includes('/aniian/') || url.startsWith('./aniian/')) {
          // 移除.md扩展名
          const cleanUrl = url.replace(/\.md$/, '')
          
          // 对路径中的每一部分进行编码，但保留斜杠
          const parts = cleanUrl.split('/')
          const encodedParts = parts.map(part => {
            // 跳过已经编码的部分
            if (/%[0-9A-F]{2}/.test(part)) return part
            return encodeURIComponent(part)
          })
          const encodedUrl = encodedParts.join('/')
          
          return `[${text}](${encodedUrl})`
        }
        return match
      })
      
      // 3. 优化未转换为超链接的路径文本
      // 查找常见的文件路径模式并转换为链接
      code = code.replace(/(\n\s*)(\/aniian\/[^\s\n]+\.md)(\s*\n)/g, (match, before, path, after) => {
        const cleanPath = path.replace(/\.md$/, '')
        const fileName = path.split('/').pop().replace(/\.md$/, '')
        return `${before}[${fileName}](${cleanPath})${after}`
      })
      
      return code
    }
  }
}