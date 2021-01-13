<template>
  <section class="state">
    <div
      class="status"
      :class="{ [state.status]: true }"
      @click="state.open = !state.open"
    >
      {{ $t("status." + state.status) }}
      <span v-show="editable">
        <i class="iconify" data-icon="la:pen"></i>
      </span>
    </div>
    <transition name="fade">
      <div class="choose" v-if="editable" v-show="state.open">
        <span
          v-for="st in statuses"
          :key="st"
          class="status"
          :class="{ [st]: true }"
          @click="setStatus(st)"
          v-t="'status.' + st"
        ></span>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { gun } from "../../store/gun-db";
import { statuses } from "../../store/model";

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const state = reactive({
      status: null,
      open: false,
    });
    const itemStatus = gun.get(props.id).get("status");

    itemStatus.on((data) => {
      state.status = data;
    });
    function setStatus(st) {
      itemStatus.put(st);
      state.open = false;
    }
    return {
      state,
      statuses,
      setStatus,
    };
  },
});
</script>

<style scoped>
.state {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0 8px;
  position: relative;
}
.status {
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 1em;
  background-color: #ccc;
  width: min-content;
  white-space: nowrap;
  cursor: pointer;
}
.status span {
  padding: 0 0 0 0.3em;
}
.choose {
  position: absolute;
  top: 0;
  z-index: 40;
  border-radius: 8px;
  background-color: hsla(0, 0%, 100%, 0.8);
}
.choose .status {
  margin: 4px;
}
.new {
  background-color: rgb(154, 184, 93);
}
.dev {
  background-color: #ccc;
}
.process {
  background-color: rgb(157, 219, 199);
}
.pause {
  background-color: rgb(179, 179, 179);
}
.product {
  background-color: rgb(115, 211, 152);
}
.ondemand {
  background-color: rgb(202, 143, 120);
}
.finish {
  background-color: lightblue;
}
</style>