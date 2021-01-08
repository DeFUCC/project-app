<template>
  <section>
    <div class="row" v-for="(date, key) in dates" :key="key">
      <div class="type">{{ key }}</div>
      <div class="date">
        {{ getDate(date) }}
        <span v-if="editable" @click="state.edit = !state.edit"
          ><i class="iconify" data-icon="la:pen"></i
        ></span>
        <form v-if="editable && state.edit" @submit.prevent>
          <input
            type="date"
            name="date"
            @input="setDate(key, $event)"
            :value="getValue(date)"
          />
        </form>
      </div>
    </div>
    <div class="row" v-if="editable">
      <button v-show="!state.add" @click="state.add = true">add a date</button>
      <button
        v-show="state.add"
        v-for="type in types"
        :key="type"
        @click="addDate(type)"
      >
        {{ type }}
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { gun } from "../../store/gun-db";

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const dates = reactive({});
    const types = ["start", "finish"];
    const state = reactive({
      edit: false,
      add: false,
    });
    const edit = ref(false);
    const itemDates = gun.get(props.id).get("dates");

    itemDates.map().on((data, key) => {
      if (data) {
        dates[key] = data;
      } else {
        delete dates[key];
      }
    });

    function getValue(timestamp) {
      return new Date(timestamp).toLocaleDateString("en-CA");
    }

    function getDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    }

    function setDate(type, ev) {
      let date = ev.target.value;
      console.log(date);
      let timestamp = Date.parse(date) || null;
      itemDates.get(type).put(timestamp);
    }
    function addDate(type) {
      dates[type] = null;
    }
    return {
      addDate,
      setDate,
      getDate,
      getValue,
      dates,
      types,
      state,
    };
  },
});
</script>

<style scoped>
section {
  padding: 0 2em;
}
.row {
  display: flex;
}
.row > div {
  padding: 0.5em;
}
.date {
  display: flex;
  align-items: center;
}
form {
  margin: 0 0.5em;
}
</style>