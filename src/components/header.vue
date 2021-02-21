<template>
  <div class="header">
    <div class="navbar">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/characters">Characters</router-link>
      <router-link class="link" to="/todo">Todo</router-link>
      <router-link class="link" to="/about">About</router-link>
      <router-link class="link" to="/contacts">Contacts</router-link>
    </div>
    <div class="options">
      <div class="themes">
        <select id="theme" v-model="selectedTheme" :value="selectedTheme">
          <option for="theme" v-for="theme in themes" :key="theme" :value="theme">{{
            theme
          }}</option>
        </select>
      </div>
      <div class="fontSizeList">
        <select id="fontSize" v-model="selectedFontSize" :value="selectedFontSize">
          <option for="fontSize" v-for="item in fontsize" :key="item.name" :value="item.size">{{
            item.name
          }}</option>
        </select>
      </div>
      <p>Language</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

const fontSizeArray = [
  { name: "Small", size: "0.75rem" },
  { name: "Medium", size: "1rem" },
  { name: "Large", size: "1.25rem" },
];

export default defineComponent({
  setup() {
    const themes = ref(["light", "dark"]);
    const selectedTheme = ref(themes.value[0]);
    const fontsize = ref(fontSizeArray);
    const selectedFontSize = ref(fontsize.value[1].size);

    watchEffect(() => {
      document.documentElement.className = selectedTheme.value;
      document.documentElement.style.fontSize = selectedFontSize.value;
    });
    return {
      selectedTheme,
      themes,
      fontsize,
      selectedFontSize,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/index.scss";
.header {
  min-height: 120px;
  @include theme-aware("background", "color-headingBg");
  padding: 0.6em;
  @include flex(row);
  flex-wrap: wrap;
}
.navbar {
  @include flex(row);
  .link {
    padding: 0.3em;
    margin: 0.6em;
    font-size: 1.5rem;
    text-decoration: none;
    transition: all 0.2s;
    font-weight: 700;
    &:hover {
      opacity: 0.8;
    }
  }
  .router-link-active {
    animation: navLink 0.5s forwards;
  }
  @keyframes navLink {
    50% {
      opacity: 0.5;
      transform: translateY(-10%);
    }
    100% {
      transform: scale(1.1);
      background-color: rgb(173, 173, 173);
    }
  }
  select {
    @include theme-aware("color", "color-primary-dark");
    @include theme-aware("background-color", "color-primary-light");
  }
  h6 {
    margin: 5px 14px;
  }
}
.options {
  @include flex(column);
  @media only screen and (max-width: 755px) {
    @include flex(row);
  }
}
</style>
