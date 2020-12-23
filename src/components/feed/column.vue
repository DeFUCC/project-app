<template>
  <section
    ref="column"
    class="column bordered"
    :style="{
      borderColor: itemColor(feed.parent),
    }"
  >
    <div :style="{ backgroundColor: itemColor(feed.id) }" class="sticky bar">
      <IconType :type="feed.type" />
      <div class="title">{{ feed.title }}</div>
      <div class="spacer"></div>
      <div class="close" @click="$emit('close')"><IconClose /></div>
    </div>

    <AddItem
      v-if="feed.view == 'add'"
      :parent="feed.id"
      :type="feed.type"
      :key="feed.id"
      @added="$emit('close')"
    />

    <PageView
      v-if="feed.view == 'page'"
      @open="$emit('open', $event)"
      @close="$emit('close')"
      :key="feed.id"
      :id="feed.id"
    >
    </PageView>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { itemColor } from "../../tools/colors";

export default defineComponent({
  emits: ["open", "close"],
  props: {
    feed: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const column = ref(null);
    const mounted = ref(false);
    watchEffect(() => {
      if (props.feed && mounted.value) {
        column.value.scrollIntoView({ behavior: "smooth" });
      }
    });
    onMounted(() => {
      mounted.value = true;
    });
    return { itemColor, column };
  },
});
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
}
.bar {
  font-size: 0.8em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.5em;
}
.close {
  font-size: 1.4em;
}
.bordered {
  border-left: 6px solid #eee;
}
.column {
  scroll-snap-align: start;
  display: flex;
  flex: 1 0 360px;
  flex-flow: column nowrap;
  max-width: 960px;
  min-width: 360px;
  overflow-x: hidden;
}

.column:last-child {
  scroll-snap-align: end;
}
</style>