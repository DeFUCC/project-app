<template>
  <section class="type-row" v-if="types.list">
    <div
      class="type"
      v-for="type in types.list"
      :key="type"
      @click="
        types.active = type;
        $emit('select', type);
      "
      :class="{ active: type == types.active }"
    >
      <IconType :type="type" />
      <span class="count">
        {{ countItems(types.count[type]) }}
      </span>
    </div>
  </section>

  <keep-alive>
    <ItemsList
      v-if="types.list.length > 0"
      @open="$emit('open', $event)"
      :key="types.active"
      :type="types.active"
      :parent="parent"
    ></ItemsList>
  </keep-alive>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { db, gun } from "../../store/gun-db";
import { model } from "../../store/model";

export default defineComponent({
  emits: ["open", "select"],
  props: {
    type: {
      type: String,
      default: "event",
    },
    active: String,
    parent: String,
  },
  setup(props) {
    const types = reactive({
      active: props.active || model[props.type]?.[0],
      list: model[props.type],
      count: {},
    });

    watchEffect(() => {
      let query;
      if (props.parent) {
        query = gun.get(props.parent);
      } else {
        query = db;
      }

      if (model[props.type]) {
        types.list = model[props.type];
        for (let type of model[props.type]) {
          types.count[type] = {};
          query
            .get(type)
            .map()
            .once((item, key) => {
              types.count[type][key] = item;
            });
        }
      }
    });

    function countItems(obj) {
      return Object.values(obj).length;
    }

    return {
      types,
      countItems,
    };
  },
});
</script>

<style scoped>
.type-row {
  display: flex;
  align-items: center;
  padding: 0.5em 0.5em 0 0.5em;
  overflow-x: scroll;
  min-height: 3em;
}
.type {
  border-radius: 0.5em 0.5em 0 0;
  font-size: 2em;
  opacity: 0.4;
  cursor: pointer;
  transition: all 300ms ease;
  display: flex;
  align-items: center;
  background-color: #ccc;
  padding: 0 0.4em 0 0;
}
.type .count {
  font-size: 18px;
  white-space: nowrap;
}
.type:hover {
  opacity: 0.7;
}
.type.active {
  opacity: 1;
}
</style>