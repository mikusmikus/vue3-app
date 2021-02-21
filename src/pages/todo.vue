<template>
  <section class="todo">
    <div class="container">
      <transition name="fade">
        <h1 v-if="showHeading">This is TODO LIST</h1>
      </transition>
      <transition name="toast">
        <Toast v-if="showToast" />
      </transition>
      <Todos @badValue="triggerToast" />
      <button @click="showHeading = !showHeading">Toggle Heading</button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Todos from "../components/todos.vue";
import Toast from "../components/toast.vue";

const Component = defineComponent({
  components: {
    Todos,
    Toast,
  },

  setup() {
    const showHeading = ref(true);
    const showToast = ref(false);
    const triggerToast = () => {
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
        return true;
      }, 2000);
    };
    return {
      showToast,
      triggerToast,
      showHeading,
    };
  },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.todo {
  padding: 50px;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.3) 10%,
      rgb(255, 255, 255, 0.8)
    ),
    // url(https://images6.alphacoders.com/909/thumb-1920-909641.png);
    url(https://cdn.wallpapersafari.com/53/72/cMIO9o.jpg);
  // min-height: 90vh;
  min-height: calc(100vh - 260px);
  background-position: left top;
  background-size: cover;
  background-repeat: no-repeat;
}
h1 {
  text-align: center;
}
</style>
