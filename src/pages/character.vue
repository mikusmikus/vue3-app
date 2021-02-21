<template>
  <div>
    <h1>Single Character</h1>
    <h1>{{ character?.name }}</h1>
    <img :src="character?.image" :alt="character?.name" />
    <button @click="$router.back()">Go back</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Character } from "./characters.vue";

const Component = defineComponent({
  setup() {
    const character = ref<Character>();
    const route = useRoute();
    onMounted(() => {
      const { id } = route.params;
      console.log(id);
      axios.get(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
        character.value = { id: data.id, name: data.name, image: data.image };
      });
    });
    return {
      character,
    };
  },
});

export default Component;
</script>
<style lang="scss" scoped>
@import "../styles/index.scss";
button {
  @include button-size("medium");
  @include theme-aware("background-color", "color-primary-dark");
  @include theme-aware("color", "color-secondary-light");
  @include hover-lift();
}
</style>
