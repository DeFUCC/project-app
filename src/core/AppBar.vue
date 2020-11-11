<template>
  <header>
    <router-link class="logo" to="/">PROJECT APP</router-link>
    <router-link to="/designs">Designs</router-link>
    <router-link to="/user">User</router-link>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.logo {
  font-weight: bold;
}
header {
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
  background-color: var(--top-bar);
}
header a {
  padding: 1em;
}
</style>