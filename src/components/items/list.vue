<template lang="pug">
.list-holder
  .bar
    item-type(:type="type")
    h3 {{ $tc(`type.${type}`, 10) }}
    items-list-filter(
      :my="options.filterMy",
      @star="options.filterMy.star = !options.filterMy.star",
      @seen="options.filterMy.seen = !options.filterMy.seen",
      @trash="options.filterMy.trash = !options.filterMy.trash",
      v-show="sorted.total > 0"
    )
    items-list-order(
      :by="options.orderBy",
      @order="options.orderBy = $event",
      v-show="sorted.total > 0"
    )
    .spacer
    items-list-search(
      @search="options.search = $event",
      v-show="sorted.total > 3"
    )

  add-form(:type="type", :parent="parent", v-if="editable")
  ul.item-list
    transition-group(name="list")
      item-card.card(
        @click="$emit('open', item.soul); $emit('explore', { id: item.id, type })",
        v-for="item in sorted.list",
        :key="item.soul",
        :item="item"
      )
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { appPath, db, gun, soul } from "../../store/gun-db";
import { user } from "../../store/user";
import { useSorter } from "../../use/sorter";

export default defineComponent({
  name: "ItemsList",
  emits: ["open", "explore"],
  props: {
    type: {
      type: String,
      required: true,
    },
    parent: String,
    editable: Boolean,
  },

  setup(props) {
    const items = reactive({});

    let query: any;
    if (props.parent) {
      query = gun.get(props.parent);
    } else {
      query = db;
    }
    query.get(props.type).map().on(loadItem);

    const { sorted, options } = useSorter(items);

    async function loadItem(data: any, key: string) {
      if (items[key]) {
        items[key] = null;
      }
      if (data === null) return;
      items[key] = { ...data };
      let item = items[key];
      item.soul = soul(data);
      item.id = key;

      /*

      item.rated = {
        star: {},
        seen: {},
        trash: {},
      };

      item.myRate = {
        star: false,
        seen: false,
        trash: false,
      };

      db.get("user")
        .map()
        .on((userData, userId) => {
          for (let rate in item.rated) {
            gun
              .user(userId)
              .get(appPath)
              .get("rate")
              .get(rate)
              .get(soul(data))
              .on((rated: any, rateType: string) => {
                if (rated) {
                  item.rated[rate][userId] = true;
                  if (userId == user?.is?.pub) {
                    item.myRate[rate] = true;
                  }
                } else {
                  delete item.rated[rate][userId];
                  if (userId == user?.is?.pub) {
                    item.myRate[rate] = false;
                  }
                }
              });
          }
        });
        */
    }

    return {
      sorted,
      options,
    };
  },
});
</script>

<style lang="stylus" scoped>
.list-holder
  border var(--border-thin)
  border-radius var(--small-radius)
  margin-bottom 2em

.item-list
  display flex
  align-items stretch
  flex-flow row wrap
  padding 0
  margin 0
  min-height max-content

.card
  scroll-snap-align start end
  margin 0.5em

.bar
  display flex
  position sticky
  z-index 20
  top 0
  flex 0 0 60px
  min-height 3em
  flex-flow row nowrap
  align-items center
  justify-content flex-start
  padding 0.5em
  background-color var(--bar-color)
  margin 0

.tag
  font-size 0.8em
  display block
  color var(--text-light)
  white-space nowrap
</style>