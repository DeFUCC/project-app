<template>
  <section class="state" v-if="state.status">
    <div
      class="status"
      :class="{ [state.status]: true }"
      @click="state.open = !state.open"
    >
      {{ state.name }}
      <span v-if="editable">
        <i class="iconify" data-icon="la:pen"></i>
      </span>
    </div>
    <transition name="fade">
      <div class="choose" v-if="state.open && editable">
        <span
          v-for="(status, s) in statuses"
          :key="status"
          class="status"
          :class="{ [s]: true }"
          @click="setStatus(s)"
          >{{ status }}</span
        >
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
      edit: false,
      name: computed(() => {
        return statuses[state.status];
      }),
    });
    const itemStatus = gun.get(props.id).get("status");

    itemStatus.on((data) => {
      state.status = data;
    });
    function setStatus(status) {
      itemStatus.put(status);
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
  padding: 4px 8px;
  border-radius: 2em;
  font-size: 0.9em;
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
.ondemand {
  background-color: rgb(202, 143, 120);
}
.finish {
  background-color: lightblue;
}
</style>