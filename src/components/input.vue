<template>
  <div>
    <label for="">{{ label }}</label>
    <input
      class="inputText"
      type="text"
      :value="inputValue"
      :placeholder="placeholder"
      @input="$emit('update:inputValue', $event.target.value)"
      ref="inputRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

const Component = defineComponent({
  setup() {
    const inputRef = ref<HTMLInputElement>();

    onMounted(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });

    return {
      inputRef,
    };
  },
  props: {
    inputValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  // mounted() {
  //   // this.$refs.inputRef.$el.focus();
  // },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.inputText {
  @include theme-aware("background-color", "color-light");
  @include theme-aware("color", "color-dark");
  display: block;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 24px;
  border: none;
  outline: none;
  height: 50px;
}
</style>
