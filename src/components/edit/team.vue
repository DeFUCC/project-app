<template>
  <section class="team">
    <div class="row">Team</div>
    <div class="role">
      <UserPill :author="id.slice(1, 88)" />
      <span v-if="editable" class="edit" @click="edit = !edit"
        ><i class="iconify" data-icon="la:plus"></i
      ></span>
      <UserPill
        :author="member"
        v-for="(is, member) in team"
        :key="member"
        @click.prevent="removeMember(member)"
        ><i class="iconify" data-icon="la:times"></i>
      </UserPill>
    </div>
    <div class="list" v-if="editable && edit">
      <UserPill
        :author="user.pub"
        v-for="user in users"
        :key="user.alias"
        @click.prevent="addMember(user.pub)"
      >
      </UserPill>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { db, gun, sea } from "../../store/gun-db";

export default defineComponent({
  props: {
    id: String,
    editable: Boolean,
  },
  setup(props) {
    const users = reactive({});
    const team = reactive({});
    const edit = ref(false);

    if (props.editable) {
      db.get("user")
        .map()
        .on((data, key) => {
          if (key == props.id.slice(1, 88)) {
            return;
          }
          users[key] = data;
        });
    }

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

    async function addMember(pub) {
      let path = "^" + props.id.slice(89) + ".*";
      let cert = await sea.certify(pub, path, gun.user().pair());
      console.log(cert);
      itemTeam.get(pub).put(cert);
    }

    function removeMember(pub) {
      if (!props.editable) {
        return;
      }
      itemTeam.get(pub).put(false);
    }

    return {
      edit,
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