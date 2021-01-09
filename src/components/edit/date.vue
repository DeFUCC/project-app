<template>
  <section>
    <div class="row">
      <div class="type">
        {{ type }}
        <span @click="addDate()" v-if="!date"
          ><i class="iconify" data-icon="la:plus"></i
        ></span>
      </div>
      <div class="date" v-if="date">
        {{ getDate(date) }}
        <span v-if="editable" @click="edit = !edit"
          ><i class="iconify" data-icon="la:pen"></i
        ></span>
        <span @click="removeDate()"
          ><i class="iconify" data-icon="la:trash"></i
        ></span>
        <form v-if="editable && edit" @submit.prevent>
          <input
            type="date"
            name="date"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            @input="setDate($event)"
            :value="getValue(date)"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { gun } from "../../store/gun-db";

export default defineComponent({
  props: {
    id: String,
    type: {
      type: String,
      default: "start",
    },
    editable: Boolean,
  },
  setup(props) {
    const date = ref();
    const edit = ref(false);
    let key = `date-${props.type}`;
    const itemDate = gun
      .get(props.id)
      .get(key)
      .on((d) => {
        date.value = d;
      });

    function getValue(timestamp) {
      return new Date(timestamp).toLocaleDateString("en-CA");
    }

    function getDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    }

    function addDate() {
      itemDate.put(Date.now());
    }

    function removeDate() {
      itemDate.put(null);
    }

    function setDate(ev) {
      let newDate = ev.target.value;
      let timestamp = Date.parse(newDate) || null;
      itemDate.put(timestamp);
      edit.value = false;
    }
    return {
      setDate,
      addDate,
      getDate,
      getValue,
      removeDate,
      date,
      edit,
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