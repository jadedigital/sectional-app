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
import { mapGetters } from 'vuex'
import Toolbar from './LandingPage/Toolbar'
import CustomSidebar from './CustomSection/CustomSidebar'
import CustomCanvas from './CustomSection/CustomCanvas'
import CustomProperties from './CustomSection/CustomProperties'
import Footbar from './LandingPage/Footbar'

export default {
  computed: {
    ...mapGetters({
      propertiesPane: 'propertiesPane'
    })
  },
  methods: {
    toggleResize () {
      this.$store.commit('TOGGLE_PROP_RESIZE', false)
    },
    resizeProp (e) {
      if (this.propertiesPane.resizing === true) {
        var prop = document.getElementById('properties')
        var propX = prop.getBoundingClientRect().left
        var mouseX = e.clientX
        var newWidth = this.propertiesPane.width + (propX - mouseX)
        this.$store.commit('PROP_RESIZE', newWidth)
      }
    }
  },
  created: function () {
    window.addEventListener('mouseup', this.toggleResize)
    window.addEventListener('mousemove', this.resizeProp)
  },
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
