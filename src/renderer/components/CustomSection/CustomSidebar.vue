<template>
  <div class="pane-sm sidebar">
    <div class="form-group">
      <div class="header">
        <span>Coordinates</span>
      </div>
      <div class="coordToolbar">
        <button id="draw-btn" class="btn btn-default" v-bind:class="{ active: drawingMode }" v-on:click="drawModeToggle()" v-tooltip="'Draw Mode'">
          <span class="fa fa-pencil"></span>
        </button>
        <button class="btn btn-default" v-on:click="clearCoords()" v-tooltip="'Clear All'">
          <span class="fa fa-eraser"></span>
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
          <span class="coordIndex fa fa-plus-circle" v-on:click="addCoord()" v-tooltip="'Add Coordinate'"></span>
          <span class="coordwrap">
            <input v-model="coordx" class="coordx" type="number" placeholder="0"><input v-model="coordy" class="coordy" type="number" placeholder="0">
          </span>
        </div>
      </div>
    </div>
    <div class="custom-actions">
      <button class="btn btn-default" v-tooltip="'Save Section'">
        <span class="fa fa-save"></span>
      </button>
      <router-link class="btn btn-default" to="/" v-tooltip="'Discard Section'">
        <span class="fa fa-trash"></span>
      </router-link>
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
      drawingMode: 'drawingMode'
    })
  },
  methods: {
    addCoord: function () {
      var payloadData = {'coordx': this.coordx, 'coordy': this.coordy}
      this.$store.commit('ADD_COORD', payloadData)
      this.coordx = ''
      this.coordy = ''
    },
    updateCoord (index, e, axis) {
      var payloadData = {'index': index, 'value': e.target.value, 'axis': axis}
      this.$store.commit('UPDATE_COORD', payloadData)
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
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/settings.scss";
.pane-sm {
  min-width: 220px;
  background-color: #48525d;
}

.coordx, .coordy {
  width: 50%;
  background-color: #48525d;
  border: none;
  color: $off-white;
  border-bottom: 1px solid $off-white;
  text-align: center;
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
  background: $primary-color;
  color: $off-white;
  padding-left: 8px;
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
</style>
