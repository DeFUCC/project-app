<template lang="pug">
.list-holder
  items-header(
    :parent="parent",
    :type="type",
    :options="options",
    :sorted="sorted"
  )
  add-form(:type="type", :parent="parent", v-if="editable")
  ul.item-list
    transition-group(name="list")
      item-card.card(
        @click="$emit('open', item.soul)",
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
  emits: ["open"],
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
      if (!data) {
        return;
      }
      if (items[key]) {
        items[key] = null;
      }
      items[key] = { ...data };
      let item = items[key];
      item.soul = soul(data);

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
    }

    return {
      sorted,
      options,
    };
  },
});
</script>

<style lang="stylus" scoped>
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
</style>