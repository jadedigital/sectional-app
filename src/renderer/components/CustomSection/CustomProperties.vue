<template>  
  <div id="properties" class="pane properties" v-on:mousedown.self="toggleResize(true)" v-bind:style="{ maxWidth: propertiesPane.width + 'px'}">
    <div class="properties-overlay">  
      <div class="form-group">
        <div class="header" title="Testing">Properties</div>
        <span ><a class="nav-group-item">Area: <span class="value">{{customProp.area | sigFig | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ax: <span class="value">{{customProp.ax | sigFig | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ay: <span class="value">{{customProp.ay | sigFig | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ix: <span class="value">{{customProp.ixo | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Iy: <span class="value">{{customProp.iyo | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Ixy: <span class="value">{{customProp.ixyo | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Xc: <span class="value">{{customProp.xc | sigFig | exponent}} mm</span></a></span>
        <span ><a class="nav-group-item">Yc: <span class="value">{{customProp.yc | sigFig | exponent}} mm</span></a></span>
        <span ><a class="nav-group-item">Ixc: <span class="value">{{customProp.ixc | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Iyc: <span class="value">{{customProp.iyc | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Ixyc: <span class="value">{{customProp.ixyc | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Iu: <span class="value">{{customProp.iu | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Iv: <span class="value">{{customProp.iv | sigFig | exponent}} mm<sup>4</sup></span></a></span>
        <span ><a class="nav-group-item">Theta: <span class="value">{{customProp.theta | sigFig | exponent}}&deg</span></a></span>
        <span ><a class="nav-group-item">Plastic NA: <span class="value">{{customProp.pna | sigFig | exponent}} mm</span></a></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import math from 'mathjs'

export default {
  computed: {
    ...mapGetters({
      customProp: 'customProp',
      propertiesPane: 'propertiesPane',
      customCoords: 'customCoords'
    })
  },
  methods: {
    toggleResize (bool) {
      this.$store.commit('TOGGLE_PROP_RESIZE', bool)
    }
  },
  filters: {
    exponent: function (value) {
      if (isNaN(value) || (value < 10000 && value > -10000)) {
        return value
      } else {
        return value.toExponential(3)
      }
    },
    sigFig: function (value) {
      var newValue = math.round(Number(value), 2)
      return newValue
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
  .value {
    float: right;
  }
}

</style>
