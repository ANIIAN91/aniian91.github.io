import{_ as s,c as a,o as n,R as e}from"./chunks/framework.C6kDZlj-.js";const m=JSON.parse('{"title":"VitePress安装过程与遇到的问题","description":"","frontmatter":{},"headers":[],"relativePath":"learn-life/20241121.md","filePath":"learn-life/20241121.md","lastUpdated":1733709894000}'),p={name:"learn-life/20241121.md"},i=e(`<h1 id="vitepress安装过程与遇到的问题" tabindex="-1">VitePress安装过程与遇到的问题 <a class="header-anchor" href="#vitepress安装过程与遇到的问题" aria-label="Permalink to &quot;VitePress安装过程与遇到的问题&quot;">​</a></h1><h2 id="安装过程" tabindex="-1">安装过程 <a class="header-anchor" href="#安装过程" aria-label="Permalink to &quot;安装过程&quot;">​</a></h2><h3 id="python虚拟机环境安装" tabindex="-1">python虚拟机环境安装 <a class="header-anchor" href="#python虚拟机环境安装" aria-label="Permalink to &quot;python虚拟机环境安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 创建虚拟环境</span></span>
<span class="line"><span>python3 -m venv gitnote</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#启动虚拟环境</span></span>
<span class="line"><span>.\\gitnote\\Scripts\\activate</span></span></code></pre></div><h3 id="nodejs安装" tabindex="-1">nodejs安装 <a class="header-anchor" href="#nodejs安装" aria-label="Permalink to &quot;nodejs安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 安装 fnm (快速 Node 管理器)</span></span>
<span class="line"><span>winget install Schniz.fnm</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置 fnm 环境</span></span>
<span class="line"><span>fnm env --use-on-cd | Out-String | Invoke-Expression</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 下载并安装 Node.js</span></span>
<span class="line"><span>fnm use --install-if-missing 22</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 验证环境中是否存在正确的 Node.js 版本</span></span>
<span class="line"><span>node -v # 应该打印 \`v22.11.0\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 验证环境中是否存在正确的 npm 版本</span></span>
<span class="line"><span>npm -v # 应该打印 \`10.9.0\`</span></span></code></pre></div><h3 id="安装vitepress" tabindex="-1">安装vitepress <a class="header-anchor" href="#安装vitepress" aria-label="Permalink to &quot;安装vitepress&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 安装 VitePress</span></span>
<span class="line"><span>npm install -D vitepress --no-fund</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在 docs 目录下创建 VitePress 项目</span></span>
<span class="line"><span>npx create-vitepress docs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果上一步没有创建package.json，则需要运行下面的命令</span></span>
<span class="line"><span>npm init -y</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安装依赖</span></span>
<span class="line"><span>cd docs</span></span>
<span class="line"><span>npm install    //npm install --no-fund</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动服务器</span></span>
<span class="line"><span>npm run dev     //npm run docs:dev -- --force</span></span></code></pre></div><h2 id="遇到的问题" tabindex="-1">遇到的问题 <a class="header-anchor" href="#遇到的问题" aria-label="Permalink to &quot;遇到的问题&quot;">​</a></h2><h3 id="新写的文件怎么出现在vitepress上呢" tabindex="-1">新写的文件怎么出现在vitepress上呢 <a class="header-anchor" href="#新写的文件怎么出现在vitepress上呢" aria-label="Permalink to &quot;新写的文件怎么出现在vitepress上呢&quot;">​</a></h3><p>确保文件放在项目的 docs 目录或其子目录中，在站点的其他地方引用这个文件（利用markdown的链接）。或者自己偷摸看</p><h3 id="每次启动好麻烦" tabindex="-1">每次启动好麻烦 <a class="header-anchor" href="#每次启动好麻烦" aria-label="Permalink to &quot;每次启动好麻烦&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>cd E:\\notes</span></span>
<span class="line"><span>..\\gitnote\\Scripts\\activate</span></span>
<span class="line"><span>fnm env --use-on-cd | Out-String | Invoke-Expression</span></span></code></pre></div><h3 id="可能出现的缓存-重新build-重新启动" tabindex="-1">可能出现的缓存，重新build,重新启动 <a class="header-anchor" href="#可能出现的缓存-重新build-重新启动" aria-label="Permalink to &quot;可能出现的缓存，重新build,重新启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm run build</span></span>
<span class="line"><span>npm run dev</span></span></code></pre></div>`,15),l=[i];function t(c,o,r,d,h,u){return n(),a("div",null,l)}const b=s(p,[["render",t]]);export{m as __pageData,b as default};
