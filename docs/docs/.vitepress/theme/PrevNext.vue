<template>
  <div class="prev-next-buttons">
    <!-- 上一页按钮 -->
    <div v-if="prevPage" class="prev">
      <router-link :to="prevPage">← 上一页</router-link>
    </div>
    
    <!-- 下一页按钮 -->
    <div v-if="nextPage" class="next">
      <router-link :to="nextPage">下一页 →</router-link>
    </div>

    <!-- 返回首页按钮 -->
    <div class="home">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    prevPage() {
      return this.$page.prev || null;  // 获取上一页的链接
    },
    nextPage() {
      return this.$page.next || null;  // 获取下一页的链接
    }
  }
}
</script>

<style scoped>
.prev-next-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.prev, .next {
  font-size: 16px;
}

.home {
  text-align: center;
  margin-top: 10px;
}
</style>
