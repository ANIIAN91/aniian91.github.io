<template>
  <div>
    <Navbar />
    <slot/>
  </div>
</template>

<script setup>
import { Navbar } from 'vitepress/theme'
</script>
