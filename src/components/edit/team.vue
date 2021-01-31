<template lang="pug">
section.team
  .row NEEDS TO BE REFACTORED
  .role
    user-pill(:author="id.slice(1, 88)")
      span.edit(v-if="editable", @click="edit = !edit")
        i.iconify(data-icon="la:plus")
      user-pill(
        :author="member",
        v-for="(is, member) in team",
        :key="member",
        @click.prevent="removeMember(member)"
      )
        i.iconify(data-icon="la:times")
  .list(v-if="editable && edit")
    user-pill(
      :author="user.pub",
      v-for="user in users",
      :key="user.alias",
      @click.prevent="addMember(user.pub)"
    )
</template>



<script setup >
import { defineProps, reactive, ref, watchEffect } from "vue";
import { db, gun, sea } from "../../store/gun-db";

const props = defineProps({
  id: String,
  editable: Boolean,
});
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
</script>

<style lang="stylus" scoped>
.team
  padding 1em
</style>