<template lang="pug">
.page(ref="page")
  .content
    item-route(:id="item.parent", @open="$emit('open', $event)")
    .main
      .info
        edit-title(
          :editable="editable",
          :text="item.title",
          @update="updateItem('title', $event)"
        )
        .data
          item-type(:type="item.type")
          user-pill(:id="item.soul.slice(1, 88)")
      edit-icon(
        :id="item.soul",
        :editable="editable",
        :icon="item.icon",
        @update="updateIcon($event.content)"
      )
    edit-team(v-if="false", :id="item.soul", :editable="editable")
    edit-subtitle(
      :text="item.subtitle",
      :editable="editable",
      @update="updateItem('subtitle', $event)"
    ) {{ $t('subtitle') }}
    .statuses
      edit-status.pad(:id="item.soul", :editable="editable")
      edit-publish(:soul="item.soul", :type="item.type")
    edit-link(
      :link="item.link",
      :editable="editable",
      @update="updateItem('link', $event)"
    )
    edit-area(:id="item.soul", v-if="false")
    .dates
      edit-date(type="start", :id="item.soul", :editable="editable")
      edit-date(type="finish", :id="item.soul", :editable="editable")
    rating-bar(:horizontal="true", :id="item.soul") 
  .lists
    edit-markdown(
      :text="item.text",
      :editable="editable",
      @update="updateItem('text', $event)"
    )
    list-items(
      :wide="false",
      v-slot="{item}",
      v-for="type in model[item.type]",
      :key="type",
      :type="type",
      :editable="editable",
      :parent="item.type == 'user' ? `~${item.pub}/${appPath}` : item.soul"
    )
      item-card.card(
        @click="$emit('open', { id: item.id, type: type, soul: item.soul })",
        :options="{ route: false }",
        :key="item.soul",
        :item="item"
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
import { useTitle } from "@vueuse/core";

const props = defineProps({
  id: String,
});

const emit = defineEmit(["open"]);
const item = reactive({
  soul: props.id,
  title: null,
  type: "design",
  pub: null,
  team: {},
});
const title = useTitle(item.title);
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

function updateIcon(content) {
  update(props.id, "icon", content);
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

watchEffect(() => {
  title.value = item.title;
});
</script>

<style lang="stylus" scoped>
.page
  display grid
  grid-template-columns 1fr
  grid-template-areas 'info' 'list' 'aside'

@media screen and (min-width 750px)
  .page
    grid-template-columns minmax(320px, 2fr) 3fr
    grid-template-areas 'info list' 'aside list'

@media screen and (min-width 1260px)
  .page
    grid-template-columns minmax(320px, 2fr) 3fr 1fr
    grid-template-areas 'info list aside'

.content
  padding 1.5em

.content .main
  display flex
  align-items center
  position sticky
  top 0
  background-color var(--background)
  z-index 30
  margin-bottom 1em

aside
  grid-area aside
  margin 1em

.lists
  margin 1em
  grid-area list

.statuses
  display flex
  margin 1em 0
  flex-flow row wrap
  align-items center

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

.pad
  padding 0.5em 0
</style>
