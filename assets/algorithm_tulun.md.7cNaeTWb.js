import{_ as a,c as r,o as t,R as l}from"./chunks/framework.C6kDZlj-.js";const p=JSON.parse('{"title":"图论概述","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/tulun.md","filePath":"algorithm/tulun.md","lastUpdated":1733709894000}'),o={name:"algorithm/tulun.md"},e=l('<h1 id="图论概述" tabindex="-1">图论概述 <a class="header-anchor" href="#图论概述" aria-label="Permalink to &quot;图论概述&quot;">​</a></h1><p>图论是计算机科学和数学中的重要分支，专注于研究图（Graph）的结构及其相关算法。图是由<strong>节点（Vertex）和边（Edge）</strong> 组成的结构，用于表示实体之间的关系。</p><hr><h2 id="核心概念" tabindex="-1">核心概念 <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念&quot;">​</a></h2><h3 id="图的类型" tabindex="-1">图的类型 <a class="header-anchor" href="#图的类型" aria-label="Permalink to &quot;图的类型&quot;">​</a></h3><ol><li><strong>无向图（Undirected Graph）</strong> 边没有方向，表示节点间是双向连接的关系。</li><li><strong>有向图（Directed Graph）</strong> 边有方向，表示节点间的单向连接。</li><li><strong>加权图（Weighted Graph）</strong> 边带有权值，表示连接的成本、距离或权重。</li><li><strong>稀疏图与稠密图</strong><ul><li>稀疏图：边数远少于节点数平方。</li><li>稠密图：边数接近完全图。</li></ul></li></ol><h3 id="基本术语" tabindex="-1">基本术语 <a class="header-anchor" href="#基本术语" aria-label="Permalink to &quot;基本术语&quot;">​</a></h3><ol><li><strong>度数（Degree）</strong> 一个节点的连接边数。有向图中分为入度（In-degree）和出度（Out-degree）。</li><li><strong>路径（Path）</strong> 从一个节点到另一个节点的边序列。</li><li><strong>简单路径</strong> 不包含重复节点的路径。</li><li><strong>环（Cycle）</strong> 起点和终点相同的路径。</li><li><strong>连通性（Connectivity）</strong> 判断图中节点是否全部连通。</li></ol><hr><h2 id="常见问题与算法" tabindex="-1">常见问题与算法 <a class="header-anchor" href="#常见问题与算法" aria-label="Permalink to &quot;常见问题与算法&quot;">​</a></h2><h3 id="_1-最短路径" tabindex="-1">1. 最短路径 <a class="header-anchor" href="#_1-最短路径" aria-label="Permalink to &quot;1. 最短路径&quot;">​</a></h3><p><strong>目标</strong>：在图中找到从起点到终点的路径，使得路径的总权值最小。<br><strong>常见算法</strong>：</p><ul><li><strong>Dijkstra算法</strong>：适用于非负权值图，通过贪心思想动态更新最短路径估计值。</li><li><strong>Bellman-Ford算法</strong>：适用于允许负权值的图，但不能有负权回路。</li><li><strong>Floyd-Warshall算法</strong>：基于动态规划求解任意两点间最短路径，适用于小规模图。</li></ul><p><strong>应用场景</strong>：地图导航、通信网络中的最优路径选择。</p><hr><h3 id="_2-最小生成树" tabindex="-1">2. 最小生成树 <a class="header-anchor" href="#_2-最小生成树" aria-label="Permalink to &quot;2. 最小生成树&quot;">​</a></h3><p><strong>目标</strong>：找到一个连通无向图的子图，使其包含所有节点，且边权值总和最小。<br><strong>常见算法</strong>：</p><ul><li><strong>Prim算法</strong>：从一个节点开始，每次选择最小的连接边扩展生成树，适合稠密图。</li><li><strong>Kruskal算法</strong>：按边权值排序，逐步加入不构成环的边，适合稀疏图。</li></ul><p><strong>应用场景</strong>：电力网设计、通信网络铺设。</p><hr><h3 id="_3-拓扑排序" tabindex="-1">3. 拓扑排序 <a class="header-anchor" href="#_3-拓扑排序" aria-label="Permalink to &quot;3. 拓扑排序&quot;">​</a></h3><p><strong>目标</strong>：对有向无环图（DAG）的节点进行线性排序，使得每条边的起点都在终点之前。<br><strong>算法</strong>：</p><ul><li>使用入度数组或深度优先搜索（DFS）记录节点的访问顺序。</li></ul><p><strong>应用场景</strong>：任务调度、编译器中的代码编译顺序。</p><hr><h3 id="_4-网络流" tabindex="-1">4. 网络流 <a class="header-anchor" href="#_4-网络流" aria-label="Permalink to &quot;4. 网络流&quot;">​</a></h3><p><strong>目标</strong>：在有向图中，找到从源点到汇点的最大流量或最小割。<br><strong>常见算法</strong>：</p><ul><li><strong>Edmonds-Karp算法</strong>：基于广度优先搜索（BFS）寻找增广路径。</li><li><strong>Dinic算法</strong>：通过分层图和分块流优化计算效率。</li></ul><p><strong>应用场景</strong>：供水网络、交通网络容量优化。</p><hr><h2 id="图论的应用" tabindex="-1">图论的应用 <a class="header-anchor" href="#图论的应用" aria-label="Permalink to &quot;图论的应用&quot;">​</a></h2><h3 id="_1-路径规划" tabindex="-1">1. 路径规划 <a class="header-anchor" href="#_1-路径规划" aria-label="Permalink to &quot;1. 路径规划&quot;">​</a></h3><ul><li>导航系统（如 Google Maps）计算两点间的最短路径。</li><li>物流网络优化路径。</li></ul><h3 id="_2-网络设计" tabindex="-1">2. 网络设计 <a class="header-anchor" href="#_2-网络设计" aria-label="Permalink to &quot;2. 网络设计&quot;">​</a></h3><ul><li>通信网络的最小生成树设计。</li><li>数据包在网络中的流量优化。</li></ul><h3 id="_3-任务调度与依赖关系" tabindex="-1">3. 任务调度与依赖关系 <a class="header-anchor" href="#_3-任务调度与依赖关系" aria-label="Permalink to &quot;3. 任务调度与依赖关系&quot;">​</a></h3><ul><li>项目管理中的任务顺序规划（拓扑排序）。</li><li>软件模块的加载顺序。</li></ul><h3 id="_4-社会网络分析" tabindex="-1">4. 社会网络分析 <a class="header-anchor" href="#_4-社会网络分析" aria-label="Permalink to &quot;4. 社会网络分析&quot;">​</a></h3><ul><li>分析用户关系网络，寻找社交圈或推荐好友。</li></ul><h3 id="_5-图像处理" tabindex="-1">5. 图像处理 <a class="header-anchor" href="#_5-图像处理" aria-label="Permalink to &quot;5. 图像处理&quot;">​</a></h3><ul><li>图像分割、纹理分析使用图的连通性或最小生成树算法。</li></ul><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>图论是一种研究实体及其关系的方法，通过图结构可以简洁地表达和求解复杂的网络、路径规划等问题。<br> 其核心算法（最短路径、最小生成树、拓扑排序、网络流）提供了强大的工具来处理实际问题，在多个领域都有重要的应用价值。</p>',44),i=[e];function n(s,h,d,g,u,c){return t(),r("div",null,i)}const b=a(o,[["render",n]]);export{p as __pageData,b as default};