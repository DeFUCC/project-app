<template lang="pug">
.user-page
  .profile(:style="{ background: pubGradient(pub) }")
    .row
      .title {{ profile?.title }}
        span.verified(v-if="verified")
          i.iconify(data-icon="la:check")
      .spacer
      item-date(:item="profile")
    user-avatar.pic(:pic="profile?.avatar", size="large")

  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component") 
</template>

<script setup lang="ts">
import { asyncComputed } from "@vueuse/core";
import { defineProps, onMounted, reactive, ref } from "vue";
import { appPath, db, getShortHash, gun, sea, soul } from "../../store/gun-db";
import { pubGradient } from "../../use/colors";

const props = defineProps({
  id: String,
});

const profile = ref({});
const pub = ref();

const verified = asyncComputed(async () => {
  let hash = await getShortHash(pub.value);
  return props.id == hash;
});

db.get("user")
  .get(props.id)
  .once((d, k) => {
    pub.value = d.pub;
  })
  .map()
  .once((data, key) => {
    if (!data) return;
    profile.value[key] = data;
  });
</script>

<style lang="stylus" scoped>
.user-page
  display grid
  grid-template-columns minmax(300px, 1fr) 2fr
  padding 1em

@media screen and (max-width 700px)
  .user-page
    grid-template-columns 1fr

.row
  display flex

.pic
  margin 1em
  flex 1 1 100%
  align-self center

.profile
  padding 1em
  display flex
  flex-flow column
  align-self start
  position sticky
  top 0

.verified
  padding 6px
  color green

.title
  font-size 1.4em

.key
  padding 1em

.data
  padding 1em
</style>