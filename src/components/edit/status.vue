<template lang="pug">
.state
  .status(:class="{ [status]: true }", @click.stop="open = !open")
    | {{ $t('status.' + status) }}
    span(v-show="editable")
      i.iconify(data-icon="la:pen")
  transition(name="fade")
    .choose(v-if="editable", v-show="open")
      span.status(
        v-for="st in statuses",
        :key="st",
        :class="{ [st]: true }",
        @click.stop="setStatus(st)",
        v-t="'status.' + st"
      )
</template>

<script setup >
import { defineProps, reactive, ref } from "vue";
import { gun } from "store@gun-db";
import { statuses } from "store@model";

const props = defineProps({
  id: String,
  editable: Boolean,
});

const status = ref("new");
const open = ref(false);

const statusGun = gun.get(props.id).get("status");

statusGun.on((data) => {
  status.value = data;
});
function setStatus(st) {
  statusGun.put(st);
  open.value = false;
}
</script>

<style lang="stylus" scoped>
.state
  display: flex
  flex-flow: row wrap
  align-items: center
  margin: 0 8px
  position: relative

.status
  display: flex
  align-items: center
  padding: 0px 8px
  border-radius: 4px
  font-size: 1em
  width: min-content
  white-space: nowrap
  cursor: pointer
  color: #333

.status span
  padding: 0 0 0 0.3em

.choose
  position: absolute
  top: 0
  z-index: 40
  border-radius: 8px
  background-color: hsla(0, 0%, 100%, 0.8)

.choose .status
  margin: 4px
</style>