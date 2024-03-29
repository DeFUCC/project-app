<template lang="pug">
.uploader
  form#form(enctype="multipart/form-data", novalidate="")
    .box
      .box-inner
        .dropzone(v-if="!state.isLoading")
          input.input-file(
            ref="editor",
            type="file",
            multiple="",
            accept="image/*",
            @change="handleChanges($event.target.name, $event.target.files)"
          )
          ul.box-notes
            li.first Drop
            li.second or
            li.third.link Browse an image
        .status(v-if="state.isLoading")
          span.loader
            svg(
              width="30",
              height="30",
              viewbox="0 0 30 30",
              xmlns="http://www.w3.org/2000/svg",
              data-svg="spinner"
            )
              circle(fill="none", stroke="#fd3e60", cx="15", cy="15", r="14")
  .output(v-if="state.isSuccess")
    img(:src="state.output.content", alt="")
    |
    | {{ state.output.size }}
</template>

<script setup >
import { useFileUpload } from "use@fileUpload";

import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["loaded", "close"]);

const { state, handleChanges } = useFileUpload();
watch(state, () => {
  if (state.status == 2) {
    emit("loaded", state.output);
  }
});
const editor = ref(null);
onClickOutside(editor, (ev) => {
  emit("close");
});
</script>

<style lang="stylus" scoped>
.uploader
  display: flex
  flex-flow: row wrap

.box
  padding: 10px
  flex: 1 1 400px
  position: relative

.box .box-inner
  color: #2c3e50
  position: relative
  cursor: pointer
  border-radius: 3px
  border: 2px dashed #777
  border-radius: 10px
  z-index: 100
  padding: 1em

.box .box-inner .box-notes
  list-style: none
  margin: 0
  padding: 0
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.box .box-inner .box-notes li.first
  font-weight: 600
  font-size: 18px

.box .box-inner .box-notes li.link
  color: #fff
  text-align: center
  padding: 10px
  border-radius: 5px
  background: #777
  box-shadow: 0 0 35px rgba(140, 150, 160, 0.2)
  transition: all 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95)

.box .box-inner .box-notes li:not(:last-child)
  margin-bottom: 0px

.box .loader
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  z-index: 100

.box .loader > *
  animation: rotate 1.4s linear infinite

.box .loader > * > *
  stroke-dasharray: 88px
  stroke-dashoffset: 0
  transform-origin: center
  animation: spinner 1.4s ease-in-out infinite
  animation-name: spinner
  animation-duration: 1.4s
  animation-timing-function: ease-in-out
  animation-delay: 0s
  animation-iteration-count: infinite
  animation-direction: normal
  animation-fill-mode: none
  animation-play-state: running
  stroke-width: 2
  stroke-linecap: round
  position: relative

.box::after
  content: ''
  width: 100%
  height: 100%
  border-radius: 5px
  position: absolute
  top: 0
  left: 0
  opacity: 1
  transition: all 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95)

.box:hover::after
  opacity: 0.6

.output span
  padding-top: 10px
  display: block
  text-align: initial

.output .background-img-css, .output .src-usage
  position: relative

.output pre
  background: #e5e5e5
  color: #2c3e50
  padding: 14px
  border-radius: 3px
  display: flex
  align-items: center
  justify-content: flex-start
  overflow-x: scroll

.output pre, .output pre code
  font-family: 'Source Code Pro', monospace
  max-width: 500px
  text-align: left
  white-space: nowrap
  word-spacing: normal
  word-break: break-word
  word-wrap: break-word
  line-height: 1.5
  -moz-tab-size: 4
  -o-tab-size: 4
  tab-size: 4
  -webkit-hyphens: none
  -ms-hyphens: none
  hyphens: none
  position: relative

.input-file
  display: block
  opacity: 0
  width: 100%
  height: 200px
  position: absolute
  cursor: pointer
  top: 0
  left: 0

@keyframes rotate
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(270deg)

@keyframes spinner
  0%
    stroke-dashoffset: 88px

  50%
    stroke-dashoffset: 22px
    transform: rotate(135deg)

  100%
    stroke-dashoffset: 88px
    transform: rotate(450deg)

@keyframes fadeInOut
  5%, 95%
    opacity: 1
    top: 50px

  15%, 85%
    opacity: 1
    top: 30px
</style>
