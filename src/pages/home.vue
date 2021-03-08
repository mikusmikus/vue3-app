<template>
  <div class="home">
    <section>
      <div class="container">
        <div class="hero">
          <div class="row">
            <div class="col-xs-12">
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quia.
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo alias illo eum
                voluptatem et est? Mollitia reprehenderit quidem dignissimos assumenda soluta,
                explicabo cumque, nobis ipsum pariatur enim, magnam odit veniam et alias nostrum
                fugiat ea officia possimus ipsa est. Dolorem fuga dolores eum illo, sapiente dicta
                vel assumenda quia natus facilis ratione laboriosam! Suscipit delectus veritatis
                labore fugit nesciunt sed omnis reprehenderit eius ipsum dignissimos ab laudantium
                eveniet culpa corporis aperiam laborum, ratione error asperiores porro temporibus
                qui perferendis? Perspiciatis consectetur, eos eum molestiae expedita aliquid. Ad
                tenetur incidunt explicabo sapiente quidem modi dolore voluptas impedit quas dolor
                cum dicta aut doloribus alias provident nisi iure eum enim deleniti, perspiciatis
                consequuntur quasi, accusamus recusandae mollitia. Iure, excepturi! Dolore ducimus
                atque cumque aliquam? Libero saepe necessitatibus ducimus eius repudiandae
                reprehenderit blanditiis amet tempora pariatur quia. Sapiente vero nulla dicta
                reprehenderit ratione! Rem alias quidem architecto soluta ipsa cumque commodi,
                quisquam adipisci inventore ullam quia aspernatur a. Itaque omnis dolores
                voluptatibus illo unde fugit debitis beatae nam alias accusantium tempora incidunt
                excepturi dolore, in enim? Esse voluptas ullam debitis architecto iste
                necessitatibus nam a omnis reprehenderit. A tempore voluptas sapiente maxime quae
                minus quaerat delectus voluptatibus placeat praesentium repellat eius,
                necessitatibus tempora!
              </p>
            </div>
          </div>
        </div>
        <div class="about">
          <div class="row">
            <div class="col-xs-6">
              <h2>Lorem ipsum dolor.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla est velit rem
                expedita necessitatibus sequi sed, architecto distinctio molestiae optio atque
                laudantium, ea quo dolorem!
              </p>
              <VButton class='large'> Read More</VButton>
            </div>
            <div class="col-xs-6">
              <VImage src="https://picsum.photos/700/400" alt="img1" :aspectRatio="60" />
            </div>
          </div>
        </div>
        <div class="about">
          <div class="row">
            <div class="col-xs-6">
              <VImage src="https://picsum.photos/800/400" alt="img1" />
            </div>
            <div class="col-xs-6">
              <h2>Lorem ipsum dolor.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla est velit rem
                expedita necessitatibus sequi sed, architecto distinctio molestiae optio atque
                laudantium, ea quo dolorem!
              </p>
              <button>Read More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <transition appear @enter="enterAdvert">
      <section class="advert">
        <div class="container">
          <div class="row center-xs middle-xs">
            <div class="col-xs-12">
              <transition appear @beforeEnter="headingAnimation">
                <h1 class="advert-heading">
                  Lorem ipsum dolor sit amet consectetur.
                </h1>
              </transition>
              <button class="join">Join Now</button>
              <button class="more">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </transition>
    <section>
      <div class="container">
        <div class="cards">
          <transition-group appear="" @before-enter="beforeImagesEnter" @enter="imagesEnter">
            <div
              :class="'image-wrapper' + index"
              v-for="(image, index) in imageCards"
              :key="image"
              :data-index="index"
            >
              <img class="image" :src="image.image" :alt="image.name" loading="lazy" />
              <p class="text">{{ image.text }}</p>
            </div>
          </transition-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import gsap from "gsap";
import images from "../data/home-images";
import VImage from "../components/image.vue";
import VButton from "../components/button.vue";

interface Image {
  text: string;
  image: string;
}

const Component = defineComponent({
  components: {
    VImage,
    VButton,
  },
  name: "Home",
  setup() {
    // const showImages = ref(false);
    const imageCards = ref<Image[]>([]);
    console.log(images);
    const enterAdvert = (el: HTMLHeadingElement) => {
      console.log("enter");
      // gsap timeline, use to show animations each aftter other
      // { repeat: 2, yoyo: true } to repeat animation 2times, and yoyo - animation goes back,
      // ja repeat liekas pa 2
      const tl = gsap.timeline({ yoyo: true });
      // can use gsap, to make complex animations
      gsap.from(el, {
        duration: 1,
        x: "random(-600, -800)",
        opacity: 0,
        ease: "expo.out",
        // ar onComplete funckciju pasaka on afterEnter hooks, nostrādās pēc duration...
        delay: 0.4,
        // ar delay pasaka, ka katrs lista elements sāks enter pēc delay, lai nav visi reizē
      });
    };
    const headingAnimation = (el: HTMLHeadingElement) => {
      console.log(el);
      gsap.to(el, {
        duration: 1,
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        ease: "power2.out",
        delay: 1.4,
        repeat: -1,
        yoyo: true,
      });
    };
    const imagesEnter = (el: HTMLHeadingElement, done: () => void) => {
      if (!el.dataset.index) {
        return;
      }
      gsap.from(el, {
        duration: 1,
        x: "random(-300, -700)",
        opacity: 0,
        onComplete: done,
        delay: parseInt(el.dataset.index, 10) * 0.2,
      });
    };

    const onImageEnter = () => {
      console.log("aaa");
    };

    const scrollListener = () => {
      if (window.scrollY > 350) {
        imageCards.value = images;
        // showImages.value = true;
        window.removeEventListener("scroll", scrollListener);
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", scrollListener);
    });
    return {
      imageCards,
      enterAdvert,
      headingAnimation,
      imagesEnter,
      onImageEnter,
    };
  },
});

export default Component;
</script>
<style lang="scss" scoped>
@import "../styles/index.scss";
.home {
  min-height: 200vh;
}
section {
  margin-bottom: 100px;
}
.hero {
  margin-bottom: 3rem;
}
.about {
  h2,
  p {
    @include theme-aware("color", "color-light");
  }
  @include theme-aware("background-color", "color-dark");
  padding: 20px;
  margin-bottom: 20px;
}

.advert {
  @include theme-aware("background-color", "color-danger");
  width: 100%;
  min-height: 300px;
  padding: 1rem 0 2rem 0;
}
.advert-heading {
  position: relative;
  font-weight: 900;
  background-image: url("https://images6.alphacoders.com/909/thumb-1920-909641.png");
  background-clip: text;
  font-size: 4rem;
  color: rgba(0, 0, 0, 0.2);
}
.join,
.more {
  @include theme-aware("background-color", "color-primary-dark");
  @include theme-aware("color", "color-primary-light");
  @include hover-lift();
  @include button-size("medium");
}
.more {
  @include theme-aware("background-color", "color-warning");
  @include theme-aware("color", "color-primary-dark");
}
.cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1 1 100%;
  gap: 1rem;
}
div[class^="image-wrapper"] {
  position: relative;
  overflow: hidden;
  &:hover {
    filter: grayscale(60%);
  }
  &:hover .text {
    transition: opacity 0.8s, transform 0.3s;
    transform: translateX(0);
    opacity: 1;
  }
}
.image-wrapper0,
.image-wrapper1 {
  flex-basis: 40%;
  padding-top: 40%;
}
.image-wrapper3 {
  flex-basis: 60%;
  padding-top: 60%;
}
.image-wrapper4 {
  flex-basis: 30%;
  padding-top: 60%;
}
.image-wrapper2,
.image-wrapper5,
.image-wrapper6 {
  flex-basis: 100%;
  padding-top: 30%;
  overflow: hidden;
  object-fit: center center;
}
.image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
  transition: all 0.3s;
}
.text {
  @include theme-aware("color", "color-light");
  position: absolute;
  bottom: 10px;
  left: 10%;
  width: 80%;
  background-color: rgba($color: $color-danger, $alpha: 0.8);
  padding: 0.3em 0.7em;
  font-size: 1.5rem;
  transform: translateX(-100px);
  opacity: 0;
}
</style>
