<template>  
  <div id="properties" class="pane properties" v-on:mousedown.self="toggleResize(true)" v-bind:style="{ maxWidth: propertiesPane.width + 'px'}">
    <div class="properties-overlay">  
      <div class="form-group">
        <div class="header">Properties</div>
        <span ><a class="nav-group-item">Area: {{customProp.area}} mm<sup>2</sup></a></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      customProp: 'customProp',
      propertiesPane: 'propertiesPane'
    })
  },
  methods: {
    toggleResize (bool) {
      this.$store.commit('TOGGLE_PROP_RESIZE', bool)
    }
  }
}
</script>

<style lang="scss">
.pane.properties {
  border-left-width: 2px;
  cursor: ew-resize;
}

.properties-overlay {
  width: 100%;
  height: 100%;
}

</style>
