<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div class="window">
    <toolbar></toolbar>
    <div class="window-content">
      <div class="pane-group">
        <sidebar></sidebar>
        <sectiontable></sectiontable>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from './LandingPageView/Toolbar'
  import Sidebar from './LandingPageView/Sidebar'
  import Sectiontable from './LandingPageView/Sectiontable'

  export default {
    components: {
      Toolbar,
      Sidebar,
      Sectiontable
    },
    name: 'landing-page'
  }

</script>
