<template>
  <button :type="type" :class="class1">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Component = defineComponent({
  props: {
    type: {
      type: String,
      default: "button",
    },
    class1: {
      type: String,
    },
  },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.add__buttom {
  @include theme-aware("background-color", "color-danger");
  @include theme-aware("color", "color-secondary-dark");
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  max-width: 5em;
  width: 100%;
  font-size: 1.5rem;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}

.showButton {
  @include theme-aware("background-color", "color-secondary-light");
  @include theme-aware("color", "color-secondary-dark");
  outline: none;
  border: none;
  margin: 0.2em;
  font-size: 1rem;
  padding: 0.5em 1em;
  box-shadow: 3px 3px 8px $color-dark;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &.active {
    @include theme-aware("background-color", "color-warning");
    @include theme-aware("color", "color-secondary-dark");
  }
}
</style>
