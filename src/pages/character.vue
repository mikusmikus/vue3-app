<template>
  <div class="container">
    <button @click="$router.back()">Go back</button>
    <div class="row" v-if="character">
      <div class="col-xs-12 center-xs">
        <h1>{{ character.name }}</h1>
      </div>
      <div class="col-xs-4">
        <VImage :src="character.image" :alt="character.name" :aspectRatio="100" />
      </div>
      <div class="col-xs-4">
        <VImage :src="character.image" :alt="character.name" :aspectRatio="100" />
      </div>
      <div class="col-xs-4">
        <VImage :src="character.image" :alt="character.name" :aspectRatio="100" />
      </div>
    </div>
    <div class="col-xs-12 center-xs">
      <transition name="switch" mode="out-in">
        <div class="more-info" v-if="showMore">
          <button @click="showMore = !showMore">hide info</button>
          <transition-group
            tag="ul"
            @before-enter="beforeEnter"
            @enter="enter"
            mode="out-in"
            appear=""
          >
            <li v-for="(value, key, index) in filterdCharacter" :key="value" :data-index="index">
              {{ key + ": " }}{{ value }}
            </li>
          </transition-group>
        </div>
        <button v-else @click="showMore = !showMore">get More info</button>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {
  computed, defineComponent, onMounted, ref,
} from "vue";
import gsap from "gsap";
import { useRoute } from "vue-router";
import VImage from "../components/image.vue";

interface SingleCharacter {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  created: string;
  episodes: string[];
}

const Component = defineComponent({
  components: {
    VImage,
  },
  setup() {
    const character = ref<SingleCharacter>();
    const showMore = ref(false);
    const route = useRoute();
    onMounted(() => {
      const { paramsId } = route.params;
      axios.get(`https://rickandmortyapi.com/api/character/${paramsId}`).then(({ data }) => {
        const {
          id, name, image, gender, species, status, created, episodes,
        } = data;
        character.value = {
          id,
          name,
          image,
          gender,
          species,
          status,
          created,
          episodes,
        };
      });
    });
    const filterdCharacter = computed(() => {
      if (character.value) {
        const {
          gender, species, status, created,
        } = character.value;
        return {
          gender,
          species,
          status,
          created,
        };
      }
      return {};
    });

    const beforeEnter = (el: HTMLHeadingElement, done: () => void) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-300px)";
    };
    const enter = (el: HTMLHeadingElement, done: () => void) => {
      console.log(el.dataset.index);
      if (!el.dataset.index) {
        return;
      }
      gsap.to(el, {
        duration: 1,
        x: 0,
        opacity: 1,
        ease: "back",
        onComplete: done,
        delay: parseInt(el.dataset.index, 10) * 0.2,
      });
    };
    const leave = (el: HTMLHeadingElement, done: () => void) => {
      console.log("leave");
      if (!el.dataset.index) {
        return;
      }
      gsap.to(el, {
        position: "absoulute",
        duration: 2,
        x: -400,
        opacity: 0,
        ease: "back",
        onComplete: done,
        delay: parseInt(el.dataset.index, 10) * 0.1,
      });
    };
    return {
      character,
      filterdCharacter,
      showMore,
      beforeEnter,
      enter,
      // beforeLeave,
      leave,
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
  margin: 1rem 0;
}
ul{
  padding: 0;
  margin-bottom: 3rem
}
li {
  @include theme-aware("background-color", "color-dark");
  @include theme-aware("color", "color-light");
  @include hover-lift();
  cursor: pointer;
  list-style: none;
  margin: 0.2em;
  padding: 0.5em;
  font-size: 1.5rem;
}
</style>
