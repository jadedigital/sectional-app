<template>
  <div class="window">
    <toolbar></toolbar>
    <div class="window-content">
      <div class="pane-group">
        <CustomSidebar></CustomSidebar>
        <CustomCanvas></CustomCanvas>
        <CustomProperties></CustomProperties>
      </div>
    </div>
    <footbar></footbar>
  </div>
</template>

<script>
  import Toolbar from './LandingPage/Toolbar'
  import CustomSidebar from './CustomSection/CustomSidebar'
  import CustomCanvas from './CustomSection/CustomCanvas'
  import CustomProperties from './CustomSection/CustomProperties'
  import Footbar from './LandingPage/Footbar'

  export default {
    components: {
      Toolbar,
      CustomSidebar,
      CustomCanvas,
      CustomProperties,
      Footbar
    },
    name: 'custom-section'
  }

</script>
