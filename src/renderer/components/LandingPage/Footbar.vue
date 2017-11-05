<template>
  <footer class="toolbar toolbar-footer">
    <div class="footer-options">
      <div v-if="hoverCoord.active" class="option">x: {{hoverCoord.x}}, y: {{hoverCoord.y}}</div>
      <div class="option" v-on:click="toggleSnap">Snap to Grid: {{snap}}</div>
      <div class="option" v-on:click="toggleOrtho">Ortho Mode: {{ortho}}</div>
      <div class="option" v-on:click="toggleTrack">Tracking Mode: {{track}}</div>
      <div class="dropdown option">
        <div class="menu" v-on:click="showDropdown.size = !showDropdown.size">Grid Size: {{grid.size}}{{grid.units}}</div>
        <ul class="dropdown-menu" v-show="showDropdown.size">
          <li><a v-on:click="gridSize(1)">1{{grid.units}}</a></li>
          <li><a v-on:click="gridSize(5)">5{{grid.units}}</a></li>
          <li><a v-on:click="gridSize(10)">10{{grid.units}}</a></li>
          <li><a v-on:click="gridSize(15)">15{{grid.units}}</a></li>
          <li><a v-on:click="gridSize(20)">20{{grid.units}}</a></li>
          <li><a v-on:click="gridSize(25)">25{{grid.units}}</a></li>
          <li><a v-on:click="gridSize(50)">50{{grid.units}}</a></li>
        </ul>
      </div>
      <div class="scale-slider">
        <vue-slider v-model="scale" v-bind:dot-size="12" v-bind:interval="25" v-bind:formatter="(v) => `${v}%`" v-bind:tooltip="'hover'" v-bind:width="150" v-bind:min="25" v-bind:max="400"></vue-slider>
      </div>
    </div>
    <div class="distance-input" v-show="drawAlongDist.active">
      <div class="sim-input"><span class="caret">></span>{{drawAlongDist.dist}}<span class="blinking-cursor">|</span> mm</div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import vueSlider from 'vue-slider-component'

export default {
  components: {
    vueSlider
  },
  data: function () {
    return {
      showDropdown: {size: false, units: false, scale: false}
    }
  },
  computed: {
    ...mapGetters({
      grid: 'grid',
      hoverCoord: 'hoverCoord',
      drawAlongDist: 'drawAlongDist'
    }),
    snap () {
      var snap = ((this.grid.snap === true) ? 'On' : 'Off')
      return snap
    },
    ortho () {
      var ortho = ((this.grid.ortho === true) ? 'On' : 'Off')
      return ortho
    },
    track () {
      var track = ((this.grid.track === true) ? 'On' : 'Off')
      return track
    },
    scale: {
      get () {
        var scale = this.grid.scale * 100
        return scale
      },
      set (value) {
        this.$store.commit('GRID_SCALE', value / 100)
      }
    }
  },
  methods: {
    toggleSnap () {
      this.$store.commit('TOGGLE_SNAP')
    },
    toggleOrtho () {
      this.$store.commit('TOGGLE_ORTHO')
    },
    toggleTrack () {
      this.$store.commit('TOGGLE_TRACK')
    },
    gridSize (size) {
      this.showDropdown.size = false
      this.$store.commit('GRID_SIZE', size)
    }
  }
}

</script>

<style lang="scss">
@import "../../styles/settings.scss";

.toolbar-footer {
  background-color: $primary-color;
  border-top: none;
  min-height: 22px;
  margin-left: -50px;
}

.footer-options {
  float: right;
  padding-right: 20px;
  .option {
    color: #fff;
    padding: 0 8px;
    cursor: pointer;
    display: inline-block;
    position: relative;
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
  width: 100%;
  margin: 0;
  margin-left: -8px;
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

.distance-input {
  position: absolute;
  z-index: 1;
  background-color: $secondary-color;
  overflow: hidden;
  width: 150px;
  margin: 0;
  padding: 3px 16px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 23px;
  text-align: center;
  .sim-input {
    background-color: $secondary-color;
    color: #ffffff;
    .caret {
      float: left;
      padding-left: 6px;
    }
  }
}

.blinking-cursor {
  color: #2E3D48;
  animation: 1s blink step-end infinite;
  
  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: #ffffff;
    }
  }
}

.scale-slider {
  display: inline-block;
  margin-bottom: -4px;
  .vue-slider-process {
    background-color: $third-color;
  }
}

</style>
