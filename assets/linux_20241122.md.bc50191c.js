import{_ as e,c as a,o as n,a as s}from"./app.5bf4d282.js";const m=JSON.parse('{"title":"\u90E8\u7F72Github Pages\u9047\u5230\u7684\u5751","description":"","frontmatter":{},"headers":[{"level":2,"title":"npx vitepress build \u548C npm run build","slug":"npx-vitepress-build-\u548C-npm-run-build","link":"#npx-vitepress-build-\u548C-npm-run-build","children":[]},{"level":2,"title":"\u7528\u6237/\u7EC4\u7EC7\u9875\u9762 \u548C \u4ED3\u5E93\u9875\u9762","slug":"\u7528\u6237-\u7EC4\u7EC7\u9875\u9762-\u548C-\u4ED3\u5E93\u9875\u9762","link":"#\u7528\u6237-\u7EC4\u7EC7\u9875\u9762-\u548C-\u4ED3\u5E93\u9875\u9762","children":[]},{"level":2,"title":"main \u548C gh-pages","slug":"main-\u548C-gh-pages","link":"#main-\u548C-gh-pages","children":[]},{"level":2,"title":"git\u64CD\u4F5C","slug":"git\u64CD\u4F5C","link":"#git\u64CD\u4F5C","children":[]}],"relativePath":"linux/20241122.md"}'),i={name:"linux/20241122.md"},t=s(`<h1 id="\u90E8\u7F72github-pages\u9047\u5230\u7684\u5751" tabindex="-1">\u90E8\u7F72Github Pages\u9047\u5230\u7684\u5751 <a class="header-anchor" href="#\u90E8\u7F72github-pages\u9047\u5230\u7684\u5751" aria-hidden="true">#</a></h1><p>\u5BF9\u4E8EGitHub Pages\u4E0D\u662F\u5F88\u719F\u6089\uFF0C\u521D\u6B21\u4F53\u9A8C\u7528\u4E86\u4E24\u5929\u6765\u719F\u6089\u5E76\u90E8\u7F72\u597D\uFF0C\u867D\u7136\u6210\u529F\u4E86\uFF0C\u4F46\u8FD8\u662F\u6709\u5F88\u591A\u5730\u65B9\u662F\u8FF7\u7CCA\u7684\uFF0C\u6682\u65F6\u628A\u9047\u5230\u7684\u4E00\u4E9B\u95EE\u9898\u8BB0\u5F55\u4E0B\u6765\uFF0C\u540E\u7EED\u53EF\u80FD\u4F1A\u7528\u5230</p><h2 id="npx-vitepress-build-\u548C-npm-run-build" tabindex="-1"><code>npx vitepress build</code> \u548C <code>npm run build</code> <a class="header-anchor" href="#npx-vitepress-build-\u548C-npm-run-build" aria-hidden="true">#</a></h2><p>npx \u662F \u4E34\u65F6\u6267\u884C \u547D\u4EE4\u7684\u5DE5\u5177\uFF0C\u800C\u4E0D\u9700\u8981\u5C06\u5305\u5168\u5C40\u5B89\u88C5\u3002 npm run build \u9700\u8981\u5728\u4F60\u7684 package.json \u6587\u4EF6\u4E2D\u5B9A\u4E49\u4E00\u4E2A build \u811A\u672C\u3002 \u867D\u7136\u770B\u8D77\u6765\u6CA1\u6709\u533A\u522B\uFF0C\u4F46\u662F\u5728\u6211\u4F7F\u7528\u7684\u8FC7\u7A0B\u4E2D\u8FD8\u662F\u6709\u533A\u522B\u7684\uFF0C\u81F3\u4E8E\u4EC0\u4E48\u533A\u522B\u4E0D\u60F3\u4E86\u89E3\uFF0C\u4F46\u662F\u5F71\u54CD\u5230\u6211\u4E86</p><h2 id="\u7528\u6237-\u7EC4\u7EC7\u9875\u9762-\u548C-\u4ED3\u5E93\u9875\u9762" tabindex="-1"><code>\u7528\u6237/\u7EC4\u7EC7\u9875\u9762</code> \u548C <code>\u4ED3\u5E93\u9875\u9762</code> <a class="header-anchor" href="#\u7528\u6237-\u7EC4\u7EC7\u9875\u9762-\u548C-\u4ED3\u5E93\u9875\u9762" aria-hidden="true">#</a></h2><p>\u7528\u6237/\u7EC4\u7EC7\u9875\u9762 \u4F7F\u7528 base: &#39;/&#39;\u3002<br> \u4ED3\u5E93\u9875\u9762 \u4F7F\u7528 base: &#39;/repo-name/&#39;\u3002 \u867D\u7136\u5177\u4F53\u4E0D\u77E5\u9053\u4EC0\u4E48\u610F\u601D\uFF0C\u800C\u4E14\u6211\u662F\u76F4\u63A5\u6CE8\u91CA\u6389\u624D\u6210\u529F\u7684\uFF0C\u6709\u5F88\u5927\u7684\u5F71\u54CD</p><h2 id="main-\u548C-gh-pages" tabindex="-1"><code>main</code> \u548C <code>gh-pages</code> <a class="header-anchor" href="#main-\u548C-gh-pages" aria-hidden="true">#</a></h2><p><code>main</code>\u7528\u4E8E\u5B58\u50A8\u548C\u5F00\u53D1\u9879\u76EE\u7684\u6E90\u4EE3\u7801\uFF0C<code>gh-pages</code>\u7528\u4E8E\u5B58\u50A8\u548C\u90E8\u7F72\u6784\u5EFA\u540E\u7684\u9759\u6001\u7F51\u7AD9\u6587\u4EF6<br> \u6B63\u5E38\u6765\u8BF4\u63A8\u9001\u6E90\u4EE3\u7801\uFF08\u8FD9\u91CC\u662Fmarkdown\u6587\u4EF6\uFF09\u5230 main \u5206\u652F\u540EGitHub Actions \u4F1A\u5C06\u6784\u5EFA\u751F\u6210\u7684\u9759\u6001\u6587\u4EF6\u63A8\u9001\u5230 gh-pages \u5206\u652F\uFF0CGitHub Pages \u4F1A\u4ECE gh-pages \u5206\u652F\u83B7\u53D6\u5E76\u90E8\u7F72\u8FD9\u4E9B\u6587\u4EF6\u3002</p><h2 id="git\u64CD\u4F5C" tabindex="-1">git\u64CD\u4F5C <a class="header-anchor" href="#git\u64CD\u4F5C" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git branch      //\u68C0\u67E5\u5206\u652F\uFF0C\u67E5\u770B\u5F53\u524D\u6240\u6709\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout main   // \u5207\u6362\u5206\u652F\uFF0C\u5207\u6362\u5230main\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;">git add .       // \u6DFB\u52A0\u5230\u7F13\u5B58\u533A\uFF0C\u5C06\u6240\u6709\u66F4\u6539\u6DFB\u52A0\u5230\u6682\u5B58\u533A</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m &quot;Commit message&quot;  // \u63D0\u4EA4\u66F4\u6539\uFF0C\u4F7F\u7528\u6307\u5B9A\u7684\u63D0\u4EA4\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin main --force    //\u5F3A\u5236\u63A8\u9001\uFF0C\u5C06\u66F4\u6539\u63A8\u9001\u5230\u8FDC\u7A0Bmain\u5206\u652F</span></span>
<span class="line"><span style="color:#A6ACCD;">git log origin/main     //\u67E5\u770B\u65E5\u5FD7\uFF0C\u67E5\u770B\u8FDC\u7A0Bmain\u5206\u652F\u7684\u63D0\u4EA4\u5386\u53F2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="test-update" tabindex="-1">test update <a class="header-anchor" href="#test-update" aria-hidden="true">#</a></h4>`,11),l=[t];function p(d,r,c,o,h,u){return n(),a("div",null,l)}const b=e(i,[["render",p]]);export{m as __pageData,b as default};