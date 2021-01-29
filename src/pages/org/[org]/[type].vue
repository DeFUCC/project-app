<template lang="pug">
.org
  .types {{ organisations[org].title }}
    type-icon.type(
      @click="$router.push(`/org/${org}/${atype}`)",
      :class="{ active: atype == type }",
      v-for="atype in Object.keys(organisations[org].model)",
      :key="atype",
      :type="atype"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { organisations } from "../../../store/model";

const props = defineProps({
  type: String,
  org: String,
});
</script>

<style lang="stylus" scoped>
.types
  display flex
  align-items center

.type
  font-size 1.5em
  opacity 0.2
  transition all 300ms ease
  cursor pointer

.type:hover
  opacity 1

.type.active
  opacity 0.8</style>