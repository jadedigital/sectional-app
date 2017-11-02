<template>
  <footer class="toolbar toolbar-footer">
    <div class="footer-options">
      <div v-if="hoverCoord.active" class="option">x: {{hoverCoord.x}}, y: {{hoverCoord.y}}</div>
      <div class="option" v-on:click="toggleSnap">Snap to Grid: {{snap}}</div>
      <div class="dropdown option">
        <div class="menu" v-on:click="showDropdown.size = !showDropdown.size">Grid Size: {{grid.size}}px</div>
        <ul class="dropdown-menu" v-show="showDropdown.size">
          <li><a v-on:click="gridSize(5)">5px</a></li>
          <li><a v-on:click="gridSize(10)">10px</a></li>
          <li><a v-on:click="gridSize(15)">15px</a></li>
          <li><a v-on:click="gridSize(20)">20px</a></li>
          <li><a v-on:click="gridSize(25)">25px</a></li>
        </ul>
      </div>
      <div class="dropdown option">
        <div class="option" v-on:click="showDropdown.units = !showDropdown.units">Units: {{grid.units}}</div>
        <ul class="dropdown-menu" v-show="showDropdown.units">
          <li><a>mm</a></li>
          <li><a>in</a></li>
        </ul>
      </div>
      <div class="dropdown option">
        <div class="option" v-on:click="showDropdown.scale = !showDropdown.scale">Scale: {{grid.scale}}{{grid.units}}:1px</div>
        <ul class="dropdown-menu" v-show="showDropdown.scale">
          <li><a v-on:click="gridScale(10)">10:1</a></li>
          <li><a v-on:click="gridScale(5)">5:1</a></li>
          <li><a v-on:click="gridScale(2)">2:1</a></li>
          <li><a v-on:click="gridScale(1)">1:1</a></li>
          <li><a v-on:click="gridScale(0.5)">0.5:1</a></li>
          <li><a v-on:click="gridScale(0.25)">0.25:1</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      showDropdown: {size: false, units: false, scale: false}
    }
  },
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
    },
    gridSize (size) {
      this.showDropdown.size = false
      this.$store.commit('GRID_SIZE', size)
    },
    gridScale (scale) {
      this.showDropdown.scale = false
      this.$store.commit('GRID_SCALE', scale)
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
    display: inline-block;
    .menu {
      cursor: pointer;
    }
    &:hover {
      background-color: $primary-color-hover;
    }
  }
}

.dropdown-menu {
  position: absolute;
  z-index: 22;
  background-color: $primary-color;
  overflow: hidden;
  margin: 0;
  padding: 0;
  bottom: 20px;
  list-style: none;
  li {
    text-align: center;
  }
  a {
    color: $off-white;
    text-decoration: none;
    display: block;
    cursor: pointer;
    padding: 0 20px;
    &:hover {
      background: $primary-color-hover;
    }
  }
}

</style>
