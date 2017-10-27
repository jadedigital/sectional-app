<template>
  <div class="window">
    <toolbar></toolbar>
    <div class="window-content">
      <sectioncanvas></sectioncanvas>
    </div>
  </div>
</template>

<script>
  import Toolbar from './LandingPage/Toolbar'
  import Sectioncanvas from './CustomSection/Sectioncanvas'

  export default {
    components: {
      Toolbar,
      Sectioncanvas
    },
    name: 'custom-section'
  }

</script>
