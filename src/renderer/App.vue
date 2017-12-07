<template>
  <div id="app">
    <div class="link-bar">
      <router-link class="btn btn-default" to="/" title="Section Database">
        <span class="fa fa-database"></span>
      </router-link>
      <router-link class="btn btn-default" to="/custom" title="Build Custom Section">
        <span class="fa fa-edit"></span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'navier'
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
  text-align: center;
  padding-top: 22px;
  .btn {
    text-decoration: none;
    font-size: 1.6em;
    border: none;
    border-radius: 0;
    background-color: transparent;
    background-image: none;
    box-shadow: none;
    color: $off-white;
    padding-top: 9px;
    padding-bottom: 9px;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: #fff;
      color: $primary-color;
    }
  }
  span {
    cursor: pointer;
  }
  .router-link-exact-active {
    background-color: $secondary-color;
  }
}
.window {
  left: 50px;
}

</style>
