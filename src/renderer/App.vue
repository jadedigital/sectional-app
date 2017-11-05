<template>
  <div id="app">
    <div class="link-bar">links</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'sectional-app'
  }
</script>

<style lang="scss">
@import "./styles/settings.scss";

.link-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 22px;
  max-width: 50px;
  min-width: 50px;
  background-color: $secondary-color-hover;
}
.window {
  left: 50px;
}

</style>
