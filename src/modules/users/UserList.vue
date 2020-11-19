<template>
  <section>
    <div
      :style="{ backgroundColor: itemColor(user.soul) }"
      class="user"
      v-for="user in items"
      :key="user.soul"
    >
      {{ user.alias }}
    </div>
  </section>
</template>

<script>
import { itemColor } from "../../use/colors.js";
import { useItems } from "../../use/useItems.js";
export default {
  setup() {
    const users = useItems({ type: "users" });
    return {
      ...users,
      itemColor,
    };
  },
};
</script>

<style scoped>
#panel {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}
.avatar {
  border-radius: 80px;
  width: 50px;
  height: 50px;
}
</style>