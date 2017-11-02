<template>
  <footer class="toolbar toolbar-footer">
    <div class="footer-options">
      <div v-if="hoverCoord.active" class="option">x: {{hoverCoord.x}}, y: {{hoverCoord.y}}</div>
      <div class="option" v-on:click="toggleSnap">Snap to Grid: {{snap}}</div>
      <div class="option">Grid Size: {{grid.size}}px</div>
      <div class="option">Units: {{grid.units}}</div>
      <div class="option">Scale: 1:1</div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      grid: 'grid',
      hoverCoord: 'hoverCoord'
    }),
    snap () {
      var snap = ((this.grid.snap === true) ? 'On' : 'Off')
      return snap
    }
  },
  methods: {
    toggleSnap () {
      this.$store.commit('TOGGLE_SNAP')
    }
  }
}

</script>

<style lang="scss">
@import "../../styles/settings.scss";

.toolbar-footer {
  background-color: $primary-color;
  border-top: none;
  min-height: 0;
}

.footer-options {
  float: right;
  padding-right: 20px;
  .option {
    color: #fff;
    padding: 0 8px;
    cursor: pointer;
    display: inline;
    &:hover {
      background-color: $primary-color-hover;
    }
  }
}
</style>
