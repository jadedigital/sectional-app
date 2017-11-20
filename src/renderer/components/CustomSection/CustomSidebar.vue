<template>
  <div class="pane-sm sidebar">
    <div class="form-group wrapper">
      <h5 class="header">
        <span>Coordinates</span>
      </h5>
      <div class="coordToolbar">
        <button class="btn btn-default" title="Save Section">
          <span class="fa fa-save"></span>
        </button>
        <button id="draw-btn" class="btn btn-default" v-bind:class="{ active: drawingMode }" v-on:click="drawModeToggle()" title="Draw Mode">
          <span class="fa fa-pencil"></span>
        </button>
        <button class="btn btn-default" v-on:click="clearCoords()" title="Delete Coordinates">
          <span class="fa fa-eraser"></span>
        </button>
        <button id="dim-btn" class="btn btn-default" v-bind:class="{ active: dimMode }" v-on:click="dimModeToggle()" title="Add Dimension">
          <span class="fa fa-compress"></span>
        </button>
        <button id="dim-btn-del" class="btn btn-default" v-on:click="dimModeToggle()" title="Delete Dimensions">
          <span class="fa fa-remove"></span>
        </button>
      </div>
      <div>
        <div class="coordlist">
          <div v-for="(xy, index) in customCoords" class="coords" :key='index'>
            <label class="coordIndex">{{index}}</label>
            <span class="coordwrap">
              <input class="coordx" type="number" v-bind:value="xy['x']" v-on:input="updateCoord(index, $event, 'x')" v-on:focus="activeCoord(index)" v-on:blur="deactiveCoord()"><input class="coordy" type="number" v-bind:value="xy['y']" v-on:input="updateCoord(index, $event, 'y')" v-on:focus="activeCoord(index)" v-on:blur="deactiveCoord()">
            </span>
          </div>
        </div>
        <div class="addcoord" v-show="!drawingMode">
          <span class="coordIndex fa fa-plus-circle" v-on:click="addCoord()" title="Add Coordinate"></span>
          <span class="coordwrap">
            <input v-model="coordx" class="coordx" type="number" placeholder="0"><input v-model="coordy" class="coordy" type="number" placeholder="0">
          </span>
        </div>
      </div>
    </div>
    <div class="custom-actions">
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      coordx: '',
      coordy: ''
    }
  },
  computed: {
    ...mapGetters({
      customCoords: 'customCoords',
      drawingMode: 'drawingMode',
      dimMode: 'dimMode'
    })
  },
  methods: {
    addCoord: function () {
      if (this.coordx === '') {
        this.coordx = 0
      }
      if (this.coordy === '') {
        this.coordy = 0
      }
      var payloadData = {'coordx': this.coordx, 'coordy': this.coordy}
      this.$store.commit('ADD_COORD', payloadData)
      this.coordx = ''
      this.coordy = ''
    },
    updateCoord (index, e, axis) {
      var payloadData = {'index': index, 'value': e.target.value, 'axis': axis}
      this.$store.commit('UPDATE_COORD', payloadData)
      this.$store.commit('CALCULATE_PROP')
    },
    activeCoord (index) {
      this.$store.commit('ACTIVATE_COORD', index)
    },
    deactiveCoord () {
      this.$store.commit('DEACTIVATE_COORD')
    },
    clearCoords () {
      this.$store.commit('CLEAR_COORDS')
    },
    drawModeToggle () {
      document.getElementById('draw-btn').blur()
      this.$store.commit('TOGGLE_HOVER', false)
      this.$store.commit('TOGGLE_DRAW')
    },
    dimModeToggle () {
      document.getElementById('dim-btn').blur()
      if (!this.drawingMode) {
        this.$store.commit('TOGGLE_DRAW')
      }
      this.$store.commit('TOGGLE_DIM_MODE', true)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/settings.scss";
.pane-sm {
  min-width: 220px;
  background-color: $secondary-color;
  overflow: hidden;
  position: relative;
  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -12px;
    overflow-y: scroll;
  }
}

.coordx, .coordy {
  width: 50%;
  background-color: $secondary-color-hover;
  border: none;
  color: $off-white;
  border-bottom: 1px solid $off-white;
  text-align: center;
  cursor: text;
  &:focus {
    outline: none;
  }
}

.coordwrap {
  width: 80%;
  overflow: auto;
  display: block;
  float: right;
}

.coordIndex {
  width: 20%;
  text-align: center;
  color: $off-white;
  margin: 3px 0;
  &:hover {
    color: $primary-color;
  }
}

.sectioninp {
  width: 70%;
  float: right;
}

.sectionlabel {
  width:100%;
  padding-left:10px;
}

.coords {
  height: 100%;
}

.coordlist {
  padding-top: 10px;
  padding-right: 10px;
}

.sectioninfo {
  padding-top: 10px;
  padding-right: 10px;
}

.addcoord {
  height: 24px;
  padding-top:10px;
  padding-right: 10px;
  .coordIndex {
    font-size: 1.6em;
  }
}

.header {
  background: $secondary-color-hover;
  color: $off-white;
  padding-left: 8px;
  margin: 0;
}

.custom-actions {
  position: absolute;
  bottom: 10px;
  width:100%;
  .btn {
    text-decoration: none;
    margin-left: 10px;
    font-size: 1.6em;
    border: none;
    border-radius: 0;
    background-color: transparent;
    background-image: none;
    box-shadow: none;
    color: $off-white;
    &:hover {
      background-color: #fff;
      color: $primary-color;
    }
    &:nth-child(2) {
      margin-left: 5px;
    }
  }
}

.coordToolbar {
  width:100%;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
  .btn {
    text-decoration: none;
    float:right;
    margin-right: 10px;
    font-size: 1.2em;
    border: none;
    border-radius: 0;
    background-color: transparent;
    background-image: none;
    box-shadow: none;
    color: $off-white;
    &:hover {
      background-color: #fff;
      color: $primary-color;
    }
    &:nth-child(2) {
      margin-left: 5px;
    }
  }
  .active {
    background-color: #6d6d6d;
    color: $off-white;
    &:hover {
      background-color: #3d3d3d;
    }
  }
}

.btn {
  cursor: pointer;
  span {
    cursor: pointer;
  }
}


.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 10000;

  .tooltip-inner {
    background: #fff;
    padding: 1px 8px;
    border: solid 1px rgba(201, 201, 201, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .tooltip-arrow {
    display: none;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .3s, visibility .3s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .3s;
  }
}
</style>
