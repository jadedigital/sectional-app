<template>
  <div class="window">
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
      propertiesPane: 'propertiesPane',
      hoverCoord: 'hoverCoord',
      drawAlongDist: 'drawAlongDist',
      customCoords: 'customCoords'
    })
  },
  methods: {
    toggleResize () {
      if (this.propertiesPane.resizing === true) {
        this.$store.commit('TOGGLE_PROP_RESIZE', false)
      }
    },
    resizeProp (e) {
      if (this.propertiesPane.resizing === true) {
        var prop = document.getElementById('properties')
        var propX = prop.getBoundingClientRect().left
        var mouseX = e.clientX
        var newWidth = this.propertiesPane.width + (propX - mouseX)
        this.$store.commit('PROP_RESIZE', newWidth)
        this.$store.commit('REDRAW')
      }
    },
    keyups (e) {
      if (e.keyCode === 27 && this.hoverCoord.active === true) {
        if (this.drawAlongDist.active) {
          this.$store.commit('CLEAR_DRAW_DIST')
        } else {
          this.$store.commit('TOGGLE_HOVER', false)
          this.$store.commit('TOGGLE_DRAW')
        }
      }
      if (((e.which <= 57 && e.which >= 48) || (e.which <= 105 && e.which >= 96) || e.which === 190 || e.which === 110) && this.hoverCoord.active && Object.keys(this.customCoords).length) {
        this.$store.commit('ADD_DRAW_ALONG_DIST', e.key)
      }
      if (e.which === 13 && this.drawAlongDist.active) {
        this.$store.commit('DRAW_ALONG_DIST')
      }
      if (e.which === 8 && this.drawAlongDist.active) {
        this.$store.commit('DEL_DRAW_ALONG_DIST')
      }
    },
    resize () {
      this.$store.commit('REDRAW')
    }
  },
  created: function () {
    window.addEventListener('mouseup', this.toggleResize)
    window.addEventListener('mousemove', this.resizeProp)
    window.addEventListener('keyup', this.keyups)
    window.addEventListener('resize', this.resize)
  },
  destroyed: function () {
    window.removeEventListener('mouseup', this.toggleResize)
    window.removeEventListener('mousemove', this.resizeProp)
    window.removeEventListener('keyup', this.keyups)
    window.removeEventListener('resize', this.resize)
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
