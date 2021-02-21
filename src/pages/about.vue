<template>
  <section class="about">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 center-xs">
          <transition
            appear
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
          >
            <h1 v-if="showTitle">This is About Page</h1>
          </transition>
        </div>
        <div class="col-xs-12">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aperiam corporis illum
            cumque fuga, dolores a, corrupti saepe nobis commodi cupiditate distinctio iure nulla
            modi. Exercitationem qui sit corporis nobis enim, dolore porro nostrum amet maiores!
            Incidunt delectus doloremque dolores dicta perspiciatis voluptatibus deserunt saepe,
            fugit inventore dolorum nostrum corrupti?
          </p>
        </div>
      </div>
      <div class="row center-xs">
        <button @click="getAllEpisodes">Get Episodes list</button>
        <div class="col-xs-12">
          <div v-if="loading">
            <Vloader />
          </div>
          <div v-else v-for="episode in episodes" :key="episode.name">
            <p>{{ episode.name }}</p>
            <span v-for="character in episode.characters" :key="character.id">
              <img :src="character.image" loading="lazy" :alt="character.name" width="50" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import gsap from "gsap";
import type { Character } from "./characters.vue";
import Vloader from "../components/loader.vue";

type Results = {
  name: string;
  episode: string;
  characters: string[];
};

type Episode = {
  name: string;
  episode: string;
  characters: Character[];
};
export default defineComponent({
  components: {
    Vloader,
  },
  setup() {
    const episodes = ref<Episode[]>([]);
    const loading = ref(false);
    const showTitle = ref(true);

    const beforeEnter = (el: HTMLHeadingElement) => {
      console.log("beforeEnter - set initial state", el);
      // el.style.transform = "translateY(-60px)";
      // el.style.opacity = "0";
      gsap.from(el, {
        y: -60,
        scale: 2,
        opacity: 0,
        color: "red",
      });
    };
    const enter = (el: HTMLHeadingElement, done: () => void) => {
      console.log("enter", el);
      // can use gsap, to make complex animations
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "bounce.out",
        color: "green",
        onComplete: done,
      });
    };
    const afterEnter = (el: HTMLHeadingElement) => {
      gsap.to(el, {
        duration: 1,
        ease: "bounce.out",
        color: "grey",
      });
    };
    const beforeLeave = (el: HTMLHeadingElement) => {
      el.style.color = "blue";
      // console.log("beforeLeave", el);
    };
    const leave = (el: HTMLHeadingElement) => {
      // console.log("Leave", el);
    };
    const afterLeave = (el: HTMLHeadingElement) => {
      // console.log("afterLeave", el);
    };
    const getCharacters = async (charactersUrl: string[]) => {
      const promises = charactersUrl.map((characterUrl) => axios.get(characterUrl));
      return Promise.all(promises).then((values) => values.map((value) => ({
        id: value.data.id,
        name: value.data.name,
        image: value.data.image,
      })));
    };

    // with  async await
    const getAllEpisodes = async () => {
      loading.value = true;
      const {
        data: { results },
      } = await axios.get("https://rickandmortyapi.com/api/episode");
      const allEpisodes: Episode[] = await Promise.all(
        results.map(async ({ name, episode, characters }: Results) => {
          const charactersArr = await getCharacters(characters);
          return {
            name,
            episode,
            characters: charactersArr,
          };
        }),
      );
      episodes.value = allEpisodes;
      loading.value = false;
    };

    return {
      episodes,
      getAllEpisodes,
      loading,
      beforeEnter,
      enter,
      afterEnter,
      showTitle,
      beforeLeave,
      leave,
      afterLeave,
    };
    // const method1 = async () => {
    //   loading.value = true;
    //   const { data } = await axios.get("https://rickandmortyapi.com/api/episode");

    //   data.results.map(async (series: Results) => {
    //     const charactersP = series.characters.map((character: string) => axios.get(character));

    //     const characters = await Promise.all(charactersP)
    //    .then((values) => values.map((value) => ({
    //       id: value.data.id,
    //       name: value.data.name,
    //       image: value.data.image,
    //     })));

    //     const episode = {
    //       name: series.name,
    //       episode: series.episode,
    //       characters,
    //     };
    //     console.log(episode);
    //     episodes.value.push(episode);
    //     loading.value = false;
    //   });
    // };

    // const method2 = () => {
    //   loading.value = true;
    //   axios.get("https://rickandmortyapi.com/api/episode").then((res) => {
    //     res.data.results.forEach((episode: Results) => {
    //       const cPromises = episode.characters.map((characterUrl) => axios.get(characterUrl));
    //       Promise.all(cPromises)
    //         .then((response) => response.map((characterData) => characterData.data))
    //         .then((data) => {
    //           const eachEpisode = {
    //             name: episode.name,
    //             episode: episode.episode,
    //             characters: data,
    //           };
    //           episodes.value.push(eachEpisode);
    //         });
    //     });
    //     loading.value = false;
    //   });
    // };

    // // with  .then
    // const method4 = async () => {
    //   loading.value = true;
    //   const episodesResponse = await axios.get("https://rickandmortyapi.com/api/episode");
    //   Promise.all(
    //     episodesResponse.data.results.map(async ({ name, episode, characters }: Results) => ({
    //       name,
    //       episode,
    //       characters: await getCharacters(characters),
    //     })),
    //   ).then((allEpisodes) => {
    //     episodes.value = allEpisodes as Episode[];
    //     loading.value = false;
    //   });
    // };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.about {
  padding: 50px 0;
}

button {
  @include theme-aware("background-color", "color-primary-dark");
  @include theme-aware("color", "color-primary-light");
  @include hover-lift();
  @include button-size("medium");
}
h1 {
  width: auto;
  @include theme-aware("background-color", "color-primary-dark");
}
</style>
