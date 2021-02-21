<template>
  <VHeader />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"> </component>
    </transition>
  </router-view>
  <VFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VFooter from "./components/footer.vue";
import VHeader from "./components/header.vue";
import "./styles/index.scss";

const Component = defineComponent({
  components: {
    VHeader,
    VFooter,
  },
  setup() {
    // mounted() {
    //   console.log("aa", this.$refs.inputRef);
    //   const arr = [1, 2, 3, 4, 5];
    //   const aaa = arr.reduce((accumulator, currentValue, currentIndex, array) => {
    //     console.log(`${accumulator} ${currentValue} ${currentIndex} [${array}]`);
    //     return accumulator + currentValue;
    //   }, 0);
    // },
  },
});

export default Component;
</script>

<style lang="scss" scoped>
</style>
