<template>
  <section class="team">
    <div class="row">Team</div>
    <div class="role">
      <UserPill
        :author="member"
        v-for="(is, member) in team"
        :key="member"
        @click.prevent="removeMember(member)"
      />
    </div>
    <form v-if="editable">
      <select name="user" @input="addMember">
        <option :value="user.pub" v-for="user in users" :key="user.alias">
          {{ user.alias }}
        </option>
      </select>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { db, gun } from "../../store/gun-db";

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const users = reactive({});
    const team = reactive({});

    db.get("user")
      .map()
      .on((data, key) => {
        users[key] = data;
      });

    const itemTeam = gun.get(props.id).get("team");

    itemTeam.map().on((data, key) => {
      team[key] = data;
    });

    watchEffect(() => {
      for (let member in team) {
        if (!team[member]) {
          delete team[member];
        }
      }
    });

    function addMember(val) {
      let pub = val.target.value;
      itemTeam.get(pub).put(true);
    }

    function removeMember(pub) {
      if (!props.editable) {
        return;
      }
      itemTeam.get(pub).put(false);
    }

    return {
      team,
      users,
      addMember,
      removeMember,
    };
  },
});
</script>

<style scoped>
.team {
  padding: 1em;
}
</style>