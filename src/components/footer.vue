<template>
  <section class="footer">
    <div class="container">
      <div class="row center-xs middle-xs">
        <div class="col-xs-6">
          <h2>content here</h2>
        </div>
        <div class="col-xs-3">
            <div class="contacts">
                <h4>somethin Here</h4>
                <h4>somethin Here</h4>
                <h4>somethin Here</h4>
            </div>
        </div>
        <div class="col-xs-3">
            <div class="about">
                <h4>somethin Here</h4>
                <h4>somethin Here</h4>
                <h4>somethin Here</h4>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "../styles/index.scss";
.footer {
  @include theme-aware("background", "color-headingBg");
  min-height: 120px;
  margin-top: auto;
   padding:20px;
}
</style>
