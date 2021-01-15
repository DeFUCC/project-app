<template lang="pug">
main.error
  h1 {{ $t('404.sorry') }}
  p {{ $t('404.text') }}
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.error
  padding 2em
  background-color rgb(255, 224, 224)
</style>