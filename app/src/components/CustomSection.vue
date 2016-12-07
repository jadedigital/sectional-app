<template>
  <div class="window">
    <toolbar></toolbar>
    <div class="window-content">
      <div class="pane-group">
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from './LandingPageView/Toolbar'

  export default {
    components: {
      Toolbar
    },
    name: 'custom-section'
  }

</script>