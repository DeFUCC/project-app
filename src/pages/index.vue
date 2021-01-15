<template lang="pug">
main.markdown
  img.logo(src="/icons/feeds.svg", alt="")
  readme
  button(v-if="installable", @click="installApp()") Install the app
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//@ts-ignore
import readme from "../pages/about/readme.md";

export default defineComponent({
  components: {
    readme,
  },
  setup() {
    let deferredPrompt;
    const installable = ref(false);
    window.addEventListener("beforeinstallprompt", function (event) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      installable.value = true;
      // Stash the event so it can be triggered later.
      deferredPrompt = event;
    });

    // Installation must be done by a user gesture! Here, the button click
    function installApp(e) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    }
    return {
      installApp,
      installable,
    };
  },
});
</script>

<style lang="stylus" scoped>
.markdown
  padding 1em 2em

.logo
  width 192px
</style>