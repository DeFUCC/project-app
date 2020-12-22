<template>
  <div class="card" v-if="item">
    {{ item.type }} - {{ item.title }} - {{ item.createdAt }}
  </div>
</template>

<script>
import { gun } from "../../store/gun-db";
export default {
  props: ["id"],
  async setup(props) {
    let item = await gun.get(props.id);
    return {
      item,
    };
  },
};
</script>

<style scoped>
.card {
  padding: 1em;
}
</style>