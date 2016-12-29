<template>
  <div class="window">
    <toolbar></toolbar>
    <div class="window-content">
      <div class="pane-group">
        <customsidebar></customsidebar>
        <sectioncanvas></sectioncanvas>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from './LandingPageView/Toolbar'
  import Customsidebar from './CustomSection/Customsidebar'
  import Sectioncanvas from './CustomSection/Sectioncanvas'

  export default {
    components: {
      Toolbar,
      Customsidebar,
      Sectioncanvas
    },
    name: 'custom-section'
  }

</script>