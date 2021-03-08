<template>
  <div class="image-wrapper" :style="stylesObject">
    <img class="image" :src="src" :alt="alt" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, toRefs, watch,
} from "vue";

export default defineComponent({
  name: "VImage",
  props: {
    aspectRatio: {
      type: Number,
      default: 50,
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const stylesObject = ref({ paddingTop: `${props.aspectRatio}%` });
    // const { aspectRatio } = toRefs(props);

    watch(
      () => props.aspectRatio,
      // (before, after) => {
      () => {
        stylesObject.value = {
          paddingTop: `${props.aspectRatio}%`,
        };
      },
    );

    return {
      stylesObject,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/index.scss";
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.image {
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
