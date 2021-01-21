<template lang="pug">
.page(ref="page")
  .content
    item-route(:id="item.parent", @open="$emit('explore', $event)")
    .main
      edit-icon(:id="item.soul", :editable="editable", :icon="item.icon")
      .info
        edit-title(
          :editable="editable",
          :text="item.title",
          @update="updateItem('title', $event)"
        )
        .data
          item-type(:type="item.type")
          edit-status(:id="item.soul", :editable="editable")
          user-pill(:id="item.soul.slice(1, 88)")

    edit-team(v-if="false", :id="item.soul", :editable="editable")
    edit-subtitle(
      :text="item.subtitle",
      :editable="editable",
      @update="updateItem('subtitle', $event)"
    ) {{ $t('subtitle') }}
    edit-link(
      :link="item.link",
      :editable="editable",
      @update="updateItem('link', $event)"
    )
    .dates
      edit-date(type="start", :id="item.soul", :editable="editable")
      edit-date(type="finish", :id="item.soul", :editable="editable")
    edit-markdown(
      :text="item.text",
      :editable="editable",
      @update="updateItem('text', $event)"
    )
    edit-publish(:soul="item.soul", :type="item.type")
    rating-bar(:horizontal="true", :id="item.soul") 
  .lists
    items-list(
      v-for="type in model[item.type]",
      @open="$emit('open', $event)",
      @explore="$emit('explore', $event)",
      :key="type",
      :type="type",
      :editable="editable",
      :parent="item.type == 'user' ? `~${item.pub}/${appPath}` : item.soul"
    )
  aside
    comment-list(:id="item.soul")
    page-log(:id="item.soul", :editable="editable")
</template>

<script setup lang="ts">
import {
  ref,
  defineProps,
  watchEffect,
  computed,
  reactive,
  onMounted,
  defineEmit,
} from "vue";
import { isEditable, update } from "../../store/item";
import { model } from "../../store/model";
import { user } from "../../store/user";
import { itemColor } from "../../use/colors";
import { appPath, gun } from "../../store/gun-db";

const props = defineProps({
  id: String,
});

const emit = defineEmit(["open", "explore", "close", "renamed"]);
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
</script>

<style lang="stylus" scoped>
.page
  display grid
  grid-template-columns 1fr
  grid-template-areas 'info' 'list' 'aside'

@media screen and (min-width 791px)
  .page
    grid-template-columns minmax(320px, 2fr) 3fr
    grid-template-areas 'info list' 'aside list'

@media screen and (min-width 1260px)
  .page
    grid-template-columns minmax(320px, 2fr) 3fr 1fr
    grid-template-areas 'info list aside'

.content .main
  display flex
  align-items center
  position sticky
  top 0
  background-color var(--background)
  z-index 30
  margin 0

.content > div
  margin 0 2em

aside
  grid-area aside
  margin 1em

.lists
  margin 1em
  grid-area list

.data
  font-size 0.75em
  display flex
  flex-flow row wrap
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
</style>
