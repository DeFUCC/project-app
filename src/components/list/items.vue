<template lang="pug">
.holder
  list-options(
    :open="wide",
    :class="{ wide: wide }",
    :type="type",
    :options="options",
    :sorted="options.link ? links : sorted",
    :editable="editable"
  )
    add-form(:type="type", :parent="parent", v-if="editable")
  ul.item-list
    transition-group(name="list")
      item-card.card(
        v-if="!options.link",
        @click="$emit('open', { type: type, id: item.id, soul: item.soul })",
        @del="unlinkItem(parent, type, item.id)",
        v-for="item in sorted.list",
        :deletable="!!parent",
        :showRoute="item.parent != parent",
        :key="item.soul",
        :item="item"
      )
      .more(
        ref="more",
        v-if="sorted.more",
        @click="options.limit += options.page"
      ) {{ sorted.list.length }} / {{ sorted.count }}
  ul.item-list(v-if="options.link")
    transition-group(name="list")
      item-card.link(
        v-for="item in links.list",
        :showRoute="true",
        :key="item.soul",
        :item="item"
      )
        .overlay(v-if="!isChild(parent, type, item.id)")
          button(
            v-if="isMovable(type, item.id)",
            @click="moveItem(parent, type, item.id)"
          ) 
            i.iconify(data-icon="la:arrow-right")
          button(@click="linkItem(parent, type, item.id)")
            i.iconify(data-icon="la:link")
      .more(
        ref="more",
        v-if="links.more",
        @click="options.limit += options.page"
      ) {{ links.list.length }} / {{ links.count }}
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { defineEmit, ref, watchEffect, defineProps, reactive } from "vue";
import { isMine, user } from "../../store/user";
import { gun, soul, db } from "../../store/gun-db";
import { useSorter } from "../../use/sorter";
import { useRouter } from "vue-router";

const emit = defineEmit(["open"]);
const props = defineProps({
  wide: Boolean,
  type: {
    type: String,
    required: true,
  },
  parent: String,
  editable: Boolean,
});

const options = reactive({
  orderBy: "createdAt",
  search: "",
  link: false,
  status: {
    new: true,
    dev: true,
    process: true,
    product: true,
    pause: false,
    ondemand: false,
    finish: false,
  },
  filterMy: {
    star: false,
    seen: true,
    trash: true,
  },
  limit: 5,
  page: 7,
  loading: true,
});

const links = ref({});

watchEffect(() => {
  if (!options.link) return;
  links.value = useItems(props.type);
});

function useItems(type: string, parent?: string) {
  const list = reactive({});

  const { sorted } = useSorter(list, options);
  let query: any;

  if (parent) {
    query = gun.get(parent);
  } else {
    query = db;
  }

  query
    .get(type)
    .map()
    .on((data, key) => {
      if (data === null) {
        list[key] = null;
        return;
      }
      list[key] = { ...data };
      list[key].soul = soul(data);
      list[key].id = key;
    });

  return sorted;
}

const sorted = useItems(props.type, props.parent);
const open = ref(false);
const more = ref(null);
const loading = ref(false);

function isChild(parent, type, id) {
  let child = ref(false);
  gun
    .get(parent)
    .get(type)
    .get(id)
    .once((data, key) => {
      child.value = !!data;
    });
  return child.value;
}

function isMovable(type, id) {
  let mine = ref(false);
  db.get(type)
    .get(id)
    .once((data, key) => {
      let itemSoul = soul(data);
      mine.value = isMine(itemSoul);
    });
  return mine.value;
}

function linkItem(parent, type, id) {
  let itemGun = db.get(type).get(id);
  let parentGun = gun.get(parent).get(type).get(id).put(itemGun);
  options.link = false;
  options.search = "";
}

function moveItem(parent, type, id) {
  let itemGun = db.get(type).get(id);
  itemGun.get("parent").put(parent);
  let parentGun = gun.get(parent).get(type).get(id);
  parentGun.put(itemGun);
  options.link = false;
  options.search = "";
}

function unlinkItem(parent, type, id) {
  gun.get(parent).get(type).get(id).put(null);
}

useIntersectionObserver(more, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    options.limit += options.page;
  }
});
</script>

<style lang="stylus" scoped>
.holder
  display flex
  flex-flow row wrap

.item-list
  grid-area list
  display flex
  flex 1 1 320px
  align-items stretch
  flex-flow row wrap
  padding 0
  margin 0
  min-height max-content

.tag
  font-size 0.8em
  display block
  color var(--text-light)
  white-space nowrap

.link
  opacity 0.8
  border 4px solid #333

.link .overlay
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background-color hsla(0, 0%, 100%, 0.2)
  animation blink 1200ms ease infinite

.link .overlay button
  font-size 3em
  padding 12px
  margin 12px

.more
  cursor pointer
  flex 1 1 100%
  opacity 0.6
  transition all 300ms ease
  display flex
  align-items center
  padding 3em
  justify-content center
  background-color var(--button-secondary)

.more:hover
  opacity 1

.more:active
  opacity 0.4
</style>