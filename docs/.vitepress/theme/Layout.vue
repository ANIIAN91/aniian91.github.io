<template>
  <div>
    <Navbar />
    <slot/>
  </div>
  <div>
    <slot />
    <PrevNext /> <!-- 这里引入了自定义的上一页、下一页组件 -->
  </div>
  <div>
    <!-- 添加折叠按钮 -->
    <button @click="toggleSidebar">折叠侧边栏</button>

    <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Navbar } from 'vitepress/theme';
import PrevNext from './PrevNext.vue';

const isSidebarCollapsed = ref(false);  // 使用ref来定义响应式变量

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;  // 切换侧边栏状态
}
</script>
