<template>
  <div>
    <!-- 折叠功能 -->
    <button @click="toggleCollapse">点击展开/收起内容</button>

    <!-- 折叠内容 -->
    <div v-show="isCollapsed">
      <slot />
    </div>
    
    <!-- 上一页、下一页和返回首页按钮 -->
    <PrevNext />
  </div>
</template>

<script>
import PrevNext from './PrevNext.vue'

export default {
  components: {
    PrevNext
  },
  data() {
    return {
      isCollapsed: false  // 初始状态为展开
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
  padding: 8px;
  background-color: #007acc;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #005fa3;
}

div {
  margin-top: 10px;
}
</style>
