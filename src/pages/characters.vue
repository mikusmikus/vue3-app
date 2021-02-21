/* eslint-disable max-len */
<template>
  <section class="characters">
    <div class="container">
      <div class="row">
        <div class="col-xs-10 col-xs-offset-2 center-xs">
          <h1>This is characters page</h1>
          <!-- <button @click="getCharacters">Get Characters</button> -->
        </div>
      </div>
      <div class="row ">
        <div class="col-xs-2 sideList">
          <transition-group appear="" @before-enter="beforeEnterNames" @enter="enterNames">
            <h3
              class="filteredNames"
              v-for="(character, index) in computedC"
              :key="character.id"
              :data-index="index"
            >
              {{ character.name }}
            </h3>
          </transition-group>
        </div>
        <div class=" col-xs-10">
          <div class="row center-xs">
            <transition-group appear="" @before-enter="beforeEnter" @enter="enter">
              <div
                class="col-xs-4 helper"
                v-for="(character, index) in characters"
                :key="character.id"
                :data-index="index"
              >
                <div class="character">
                  <div class="image-wrapper">
                    <img class="image" :src="character.image" :alt="character.name" />
                  </div>
                  <div class="content">
                    <h3>{{ character.name }}</h3>
                  </div>
                  <button class="card-button" @click="handleSingleCharacter(character.id)">
                    Read More
                  </button>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, watchEffect, onMounted,
} from "vue";
import axios from "axios";
import gsap from "gsap";
// eslint-disable-next-line import/no-cycle
import router from "@/router";

export type Character = {
  id: number;
  name: string;
  image: string;
};

const Component = defineComponent({
  setup() {
    // stopPropagation();
    // this.onclick=null to works only once
    const someText = ref("hello");
    const characters = ref<Character[]>([]);
    const whatToShow = ref({ names: false, cards: false });
    const getCharacters = async () => {
      try {
        const {
          data: { results },
        } = await axios.get("https://rickandmortyapi.com/api/character/?page=2");
        characters.value = results.map(({ id, name, image }: Character) => ({
          id,
          name,
          image,
        }));
      } catch (err) {
        throw new Error("Unable to get a data.");
      }
    };

    const computedC = computed(() => {
      if (whatToShow.value.names) {
        return characters.value.filter((character) => character.name.startsWith("A"));
      }
      return [];
    });
    const handleSingleCharacter = (id: number) => {
      router.push({ name: "character", params: { id } });
    };

    const scrollListener = () => {
      if (window.scrollY > 600) {
        whatToShow.value.names = true;
        window.removeEventListener("scroll", scrollListener);
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", scrollListener);
      getCharacters();
    });

    const beforeEnter = (el: HTMLHeadingElement) => {
      // el.style.opacity = "0";
      // el.style.transform = "translate(100px, -100px)";
    };
    const enter = (el: HTMLHeadingElement, done: () => void) => {
      // gsap timeline, use to show animations each aftter other
      // { repeat: 2, yoyo: true } to repeat animation 2times, and yoyo - animation goes back
      const tl = gsap.timeline({ yoyo: true });
      // can use gsap, to make complex animations
      if (!el.dataset.index) {
        return;
      }
      tl.from(el, {
        duration: 1,
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        opacity: 0,
        ease: "back",
        // ar onComplete funckciju pasaka on afterEnter hooks, nostrādās pēc duration...
        onComplete: done,
        // ar delay pasaka, ka katrs lista elements sāks enter pēc delay, lai nav visi reizē
        delay: parseInt(el.dataset.index, 10) * 0.1,
      });
      tl.to(
        el,
        {
          scale: 1.02,
          duration: 0.2,
        },
        "+=0.5",
      );
      tl.to(
        el,
        {
          scale: 1,
          duration: 0.2,
        },
        "+=0.2",
      );
    };
    const beforeEnterNames = (el: HTMLHeadingElement) => {
      // el.style.opacity = "0";
      // el.style.transform = "translate(-200px, 30px) rotate(-90deg)";
    };
    const enterNames = (el: HTMLHeadingElement, done: () => void) => {
      // can use gsap, to make complex animations
      if (!el.dataset.index) {
        return;
      }
      gsap.from(el, {
        duration: 0.4,
        x: "random(-1000, -500)",
        y: 0,
        opacity: 1,
        // ease: "bounce.out",
        rotation: "-30",
        // ar onComplete funckciju pasaka on afterEnter hooks, nostrādās pēc duration...
        onComplete: done,
        // ar delay pasaka, ka katrs lista elements sāks enter pēc delay, lai nav visi reizē
        delay: parseInt(el.dataset.index, 10) * 0.1,
      });
    };
    return {
      someText,
      getCharacters,
      characters,
      computedC,
      handleSingleCharacter,
      beforeEnter,
      enter,
      beforeEnterNames,
      enterNames,
    };
  },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.characters {
  padding: 30px 0;
}
h1 {
  font-size: 3rem;
}

button {
  @include button-size("medium");
  @include theme-aware("color", "color-secondary-dark");
  @include theme-aware("background-color", "color-secondary-light");
}
.helper {
  padding: 1em;
}
.character {
  @include theme-aware("background-color", "color-secondary-light");
  @include flex(column);
  box-shadow: 2px 2px 15px $color-secondary-dark;
  margin: 0.6em;
  padding: 0.6em;
  height: 100%;
  .content {
    @include flex(column);
    flex-grow: 1;
  }
  .image-wrapper {
    width: 100%;
    position: relative;
    padding-top: 100%;
  }
  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  button {
    @include button-size("small");
    @include hover-lift();
  }
}
.sideList {
  margin-top: 800px;
}
.filteredNames {
  padding: 0.6em;
  @include theme-aware("background-color", "color-warning");
  margin-bottom: 0.6em;
}
</style>
