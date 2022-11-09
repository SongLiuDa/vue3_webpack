<template>
  <div class="title">
    home
  </div>
  <div>state:{{ state.token }}</div>
  <div>getters:{{ getters.token }}</div>
  <el-button>123</el-button>
  <svg-icon icon-class="demo" />
</template>
<script setup>

import { useGetters, useState } from '@/store/hooks'
import { a } from '@api/user'
const state = useState('user', ['token'])
const getters = useGetters(['token'])
console.log(a)
</script>

<script>
export default { name: 'Home' }
</script>
<style scoped lang="scss">
.title {
  color: $color;
}
</style>
