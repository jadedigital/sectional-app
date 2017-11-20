<template>  
  <div id="properties" class="pane properties" v-on:mousedown.self="toggleResize(true)" v-bind:style="{ maxWidth: propertiesPane.width + 'px'}">
    <div class="properties-overlay">  
      <div class="form-group">
        <div class="header" title="Testing">Properties</div>
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
@import "../../styles/settings.scss";
.pane.properties {
  padding-left: 5px;
  border-left: 0;
  box-shadow: -2px 2px 3px rgba(18, 18, 18, 0.1), 0 0 0 1px rgba(18, 18, 18, 0.1);
  cursor: ew-resize;
}

.properties-overlay {
  width: 100%;
  height: 100%;
  .nav-group-item {
    color: $secondary-color-hover;
  }
  .header {
    margin-left: -5px;
  }
}

</style>
