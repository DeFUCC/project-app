<template lang="pug">
.render
  canvas(ref="plain", :height="size", :width="size")
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    pub: String,
    size: {
      type: Number,
      default: 420,
    },
  },
  setup(props) {
    const plain = ref(null);
    onMounted(() => {
      const ctx = plain.value.getContext("2d");
      const split = props.pub.split(".");
      const decoded = split.map((single) => decodeUrlSafeBase64(single));

      drawGradient(ctx, decoded[0][42], decoded[1][42], props.size);

      drawCircles(decoded[0], ctx, props.size, 250);
      ctx.globalCompositeOperation = "screen";
      drawCircles(decoded[1], ctx, props.size, 100);
    });
    return {
      plain,
    };
  },
});

function drawGradient(
  ctx: CanvasRenderingContext2D,
  top: number,
  bottom: number,
  size: number
) {
  var gradient = ctx.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, `hsl(0,0%,${top * 100}%)`);
  gradient.addColorStop(1, `hsl(0,0%,${bottom * 100}%)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
}

function drawCircles(
  data: any,
  ctx: CanvasRenderingContext2D,
  size: number,
  radius: number
) {
  const chunks = chunkIt(data, 7);
  chunks.forEach((chunk) => {
    if (chunk.length == 7) {
      let x = chunk[0] * size;
      let y = chunk[1] * size;
      let r = chunk[2] * radius;
      let h = chunk[3] * 360;
      let s = chunk[4] * 100;
      let l = chunk[5] * 100;
      let a = chunk[6];

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      ctx.fillStyle = `hsla(${h},${s}%,${l}%,${a})`;
      ctx.closePath();
      ctx.fill();
    }
  });
}

function decodeUrlSafeBase64(st) {
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
function chunkIt(list, chunkSize = 3) {
  return [...Array(Math.ceil(list.length / chunkSize))].map(() =>
    list.splice(0, chunkSize)
  );
}
</script>

<style lang="stylus" scoped>
canvas
  border-radius 100%
</style>