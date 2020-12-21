<template>
  <router-link :to="'/users/' + user.pub" class="card">
    <h3 class="alias">{{ user.alias }}</h3>
    <UserAvatar size="medium" :pic="data.profile.avatar" />
    {{ data.rates }}
  </router-link>
</template>

<script>
import { computed, reactive } from "vue";
import { loadUser } from "../../store/user";
export default {
  props: ["user"],
  setup(props) {
    const data = reactive({
      profile: {},
      info: {},
      rating: {},
      rates: computed(() => {
        return Object.entries(data.rating).length;
      }),
    });
    loadUser(data, props.user.pub);
    return {
      data,
    };
  },
};
</script>

<style scoped>
.card {
  padding: 2em;
}
</style>