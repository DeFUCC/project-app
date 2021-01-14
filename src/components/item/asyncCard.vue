<template lang="pug">
.card(v-if="item && item.title")
  | {{ item.type }} - {{ item.title }} - {{ item.createdAt }}
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

<style lang="stylus" scoped>
.card
  padding 1em
</style>