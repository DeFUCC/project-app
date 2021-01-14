<template>
  <div class="error">
    <h1>{{ $t("404.sorry") }}</h1>
    {{ $t("404.text") }}
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.error
  padding 2em
  background-color rgb(255, 224, 224)
</style>