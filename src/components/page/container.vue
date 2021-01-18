<template lang="pug">
.page(ref="page")
  page-bar(
    @close="$emit('close')",
    @open="$emit('open', $event)",
    :id="item.soul",
    :parent="item.parent"
  )
  .content
    .main
      edit-icon(:id="item.soul", :editable="editable", :icon="item.icon")
      .info
        edit-title(
          :editable="editable",
          :type="item.type",
          :text="item.title",
          @update="updateItem('title', $event)"
        )

        .data
          edit-status(:id="item.soul", :editable="editable")
          user-pill(:id="item.soul.slice(1, 88)")
          item-date(:item="item")
        edit-publish(:soul="item.soul", :type="item.type")
    edit-team(v-if="false", :id="item.soul", :editable="editable")
    edit-description(
      :text="item.description",
      :editable="editable",
      @update="updateItem('description', $event)"
    ) {{ $t('description') }}
    edit-markdown(
      :text="item.text",
      :editable="editable",
      @update="updateItem('text', $event)"
    )
    .dates
      edit-date(type="start", :id="item.soul", :editable="editable")
      edit-date(type="finish", :id="item.soul", :editable="editable")
  rating-bar(:horizontal="true", :id="item.soul") 
  items-list(
    v-for="type in model[item.type]",
    @open="$emit('open', $event)",
    :key="type",
    :type="type",
    :editable="editable",
    :parent="item.type == 'user' ? `~${item.pub}/${appPath}` : item.soul"
  )
  comment-list(:id="item.soul")
  page-log(:id="item.soul", :editable="editable")
</template>

<script lang="ts">
import { ref, watch, watchEffect, computed, reactive, onMounted } from "vue";
import { isEditable, truncate, update } from "../../store/item";
import { model } from "../../store/model";
import { user } from "../../store/user";
import { itemColor } from "../../use/colors";
import { appPath, gun } from "../../store/gun-db";
import { notify } from "../../store/history";

export default {
  props: ["id"],
  emits: ["open", "close", "renamed"],
  setup(props) {
    const item = reactive({
      soul: props.id,
      title: null,
      type: "design",
      pub: null,
      team: {},
    });

    const gunItem = gun.get(props.id);

    gunItem.map().on((data: any, key: string) => {
      item[key] = data;
    });

    const edit = reactive({
      icon: false,
      title: false,
      description: false,
    });

    function updateItem(field: string, content: string) {
      update(props.id, field, content);
    }

    const editable = computed(() => {
      return isEditable(item);
    });

    const page = ref(null);
    const mounted = ref(false);
    watchEffect(() => {
      if (mounted.value) {
        setTimeout(() => {
          page.value?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    });
    onMounted(() => {
      mounted.value = true;
    });

    return {
      itemColor,
      editable,
      appPath,
      updateItem,
      model,
      item,
      edit,
      page,
    };
  },
};
</script>

<style lang="stylus" scoped>
.page
  overflow-y scroll
  overflow-x hidden
  display flex
  flex-flow column nowrap

.main
  display flex
  align-items center

.data
  font-size 0.75em
  display flex
  align-items center

.pill
  margin 4px
  padding 0 8px 0 4px

.link
  font-size 1.4em

.info
  display flex
  align-items flex-start
  flex-flow column nowrap
  padding 4px
  flex 1 1 360px

.dates
  display flex

.content
  padding 0 2em 2em 2em
</style>
