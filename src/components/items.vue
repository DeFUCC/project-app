<template>
  <div class="row">
    <div
      class="type"
      v-for="type in types.list"
      :key="type"
      @click="types.active = type"
      :class="{ active: type == types.active }"
    >
      <IconType :type="type" />
    </div>
  </div>

  <ItemsList
    @open="$emit('open', $event)"
    :key="types.active"
    :type="types.active"
  ></ItemsList>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { model } from "../store/model";

export default defineComponent({
  emits: ["open"],
  props: {
    type: {
      type: String,
      required: true,
    },
    parent: String,
  },
  setup(props) {
    const types = reactive({
      active: props.type,
      list: model[props.type],
    });
    return {
      types,
    };
  },
});
</script>

<style scoped>
</style>