<template lang="pug">
.tool-case
  h1 Tools
  button(@click="getPair()") Gen Pair
  transition(name="fade")
    .tools(v-if="pair", :key="pair")
      user-pub(:pub="pair.pub", :size="300")
      .gradient.pad(:style="{ background: pubGradient(pair.pub, 90) }")
      img(:src="qrcode", v-if="qrcode")
      .split
        .single.pad(
          v-for="sp in split",
          :key="sp",
          :style="{ backgroundColor: color.hex(sp) }"
        ) {{ sp }}
      .decode
        .bits(v-for="sp in split", :key="sp")
          .bit(
            v-for="bit in decode(sp)",
            :key="bit",
            :style="{ backgroundColor: 'hsl(0,0%,' + bit * 100 + '%)' }"
          ) 
      .pair.pad(:style="{ backgroundColor: color.hex(pair.pub) }") {{ pair.pub }}
</template>

<script setup >
import { computed, ref } from "vue";
import { sea } from "store@gun-db";
import ColorHash from "color-hash";
import QRCode from "qrcode";

const color = new ColorHash({
  saturation: [0.3, 0.4, 0.6],
  lightness: [0.6, 0.7, 0.8],
});

const pair = ref(null);
const qrcode = ref(null);
const split = computed(() => pair.value?.pub.split("."));
async function getPair() {
  pair.value = await sea.pair();
  qrcode.value = await QRCode.toDataURL(pair.value.pub, {
    errorCorrectionLevel: "Q",
    scale: 6,
  });
}
getPair();

function decode(st) {
  const symbols =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const symbolArray = symbols.split("");
  let arr = [];
  let i = 0;
  for (let letter of st) {
    arr[i++] = symbolArray.indexOf(letter) / 64;
  }
  return arr;
}

function pubGradient(pub, angle = 0) {
  let sp = pub.split(".");
  let duo = sp.map((s) => color.hex(s));
  return `linear-gradient(${angle}deg, ${duo[0]} 0%, ${duo[1]} 100%)`;
}
</script>

<style lang="stylus" scoped>
.tool-case
  padding: 1em 2em
  font-size: 8px
  color: #555

.pad
  padding: 1em
  margin: 1em 0

.gradient
  padding: 10em

.split
  display: flex
  width: 100%
  padding: 0
  justify-content: stretch

.decode
  display: flex

.bits
  display: flex
  flex-flow: row wrap
  width: 100%
  padding: 1em

.bit
  height: 32px
  flex: 1 1 32px
</style>