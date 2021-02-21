<template>
  <div class="contact">
    <h1>Contact</h1>
    <transition-group tag="ul" appear="" @before-enter="beforeEnter" @enter="enter">
      <li v-for="(icon, index) in icons" :key="icon.name" :data-index="index">
        <span class="material-icons">{{ icon.name }}</span>
        <div>{{ icon.text }}</div>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import gsap from "gsap";

const Component = defineComponent({
  setup() {
    const icons = ref([
      { name: "alternate_email", text: "by email" },
      { name: "local_phone", text: "by phone" },
      { name: "local_post_office", text: "by post" },
      { name: "local_fire_department", text: "by smoke signal" },
    ]);
    const beforeEnter = (el: HTMLHeadingElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(100px)";
    };
    const enter = (el: HTMLHeadingElement, done: () => void) => {
      // can use gsap, to make complex animations
      if (!el.dataset.index) {
        return;
      }
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "bounce.out",
        // ar onComplete funckciju pasaka on afterEnter hooks, nostrādās pēc duration...
        onComplete: done,
        // ar delay pasaka, ka katrs lista elements sāks enter pēc delay, lai nav visi reizē
        delay: parseInt(el.dataset.index, 10) * 0.2,
      });
    };
    return {
      icons,
      beforeEnter,
      enter,
    };
  },
});

export default Component;
</script>
<style lang="scss" scoped>
@import "../styles/index.scss";
h1 {
  text-align: center;
}
.contact {
  ul {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    max-width: 500px;
    margin: 60px auto;
  }
  li {
    @include theme-aware("background-color", "color-secondary-light");
    @include theme-aware("color", "color-secondary-dark");
    list-style-type: none;
    padding: 2em;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    line-height: 1.5em;
  }
}
</style>
