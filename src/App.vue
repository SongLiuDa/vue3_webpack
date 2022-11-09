<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
