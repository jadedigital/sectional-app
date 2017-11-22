<template>  
  <div id="properties" class="pane properties" v-on:mousedown.self="toggleResize(true)" v-bind:style="{ maxWidth: propertiesPane.width + 'px'}">
    <div class="properties-overlay">  
      <div class="form-group">
        <div class="header" title="Testing">Properties</div>
        <span ><a class="nav-group-item">Area: <span class="value">{{properties.area | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ax: <span class="value">{{properties.ax | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ay: <span class="value">{{properties.ay | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ix: <span class="value">{{properties.ixo | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Iy: <span class="value">{{properties.iyo | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ixy: <span class="value">{{properties.ixyo | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Xc: <span class="value">{{properties.xbar | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Yc: <span class="value">{{properties.ybar | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ixc: <span class="value">{{properties.ixc | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Iyc: <span class="value">{{properties.iyc | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Ixyc: <span class="value">{{properties.ixyc | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Iu: <span class="value">{{properties.iu | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Iv: <span class="value">{{properties.iv | exponent}} mm<sup>2</sup></span></a></span>
        <span ><a class="nav-group-item">Theta: <span class="value">{{properties.theta | exponent}} mm<sup>2</sup></span></a></span>
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
      propertiesPane: 'propertiesPane',
      customCoords: 'customCoords'
    }),
    properties () {
      var Area = 0
      var AX = 0
      var AY = 0
      var IXO = 0
      var IYO = 0
      var IXYO = 0
      var properties = {}
      if (this.customCoords[1]) {
        var length = Object.keys(this.customCoords).length
        var X1 = ''
        var X2 = ''
        var Y1 = ''
        var Y2 = ''
        var XD = ''
        var YD = ''
        var YSUM = ''

        for (var n = 1; n <= length; n++) {
          if (length > 2) {
            var n2 = n + 1
            if (n === length) {
              n2 = 1
            }

            X1 = Number(this.customCoords[String(n)]['x'])
            X2 = Number(this.customCoords[String(n2)]['x'])
            Y1 = Number(this.customCoords[String(n)]['y'])
            Y2 = Number(this.customCoords[String(n2)]['y'])

            XD = X2 - X1
            YD = Y2 - Y1
            YSUM = Y1 + Y2
            Area = Area + XD * (YSUM / 2)
            AX = AX - XD / 2 * (Math.pow(Y1, 2) + YD * (Y1 + YD / 3))
            AY = AY - YD / 2 * (Math.pow(X1, 2) + XD * (X1 + XD / 3))
            IXO = IXO + XD * (Math.pow(Y1, 3) / 3 + Math.pow(YD, 3) / 36 + YD / 2 * Math.pow((Y1 + YD / 3), 2))
            IYO = IYO - YD * (Math.pow(X1, 3) / 3 + Math.pow(XD, 3) / 36 + XD / 2 * Math.pow((X1 + XD / 3), 2))
            IXYO = IXYO - Math.pow(X1, 2) * YD * (Y1 + Y2) / 4 - Math.pow(XD, 2) * Math.pow(YD, 2) / 72 - XD * YD * (2 * X1 + X2) * (2 * Y2 + Y1) / 18
          }
        }
        var Xbar = AY / Area
        var Ybar = AX / Area
        var IXC = IXO - Area * Math.pow(Ybar, 2)
        var IYC = IYO - Area * Math.pow(Xbar, 2)
        var IXYC = IXYO - Area * Xbar * Ybar
        var IXYORel = 0
        var IXYCRel = 0
        var RelTol = 0.000000000001
        var Theta = 0

        if (IXC > IYC) {
          IXYORel = IXYO / IXC
        } else {
          IXYORel = IXYO / IYC
        }
        if (Math.abs(IXYORel) < RelTol) {
          IXYO = 0
        }

        var A = Math.sqrt((IXC - IYC) * (IXC - IYC) / 4 + Math.pow(IXYC, 2))
        var IU = (IXC + IYC) / 2 + A
        var IV = (IXC + IYC) / 2 - A

        if (IXC > IYC) {
          IXYCRel = IXYC / IXC
        } else {
          IXYCRel = IXYC / IYC
        }
        if (Math.abs(IXYCRel) < RelTol) {
          Theta = 0.5 * (this.Atn2((IXC - IYC), 2 * IXYC))
        } else {
          IXYC = 0
          Theta = 0
        }

        Theta = Theta * 180 / Math.PI
      }
      properties.area = Math.abs(Area)
      properties.ax = Math.abs(AX)
      properties.ay = Math.abs(AY)
      properties.ixo = Math.abs(IXO)
      properties.iyo = Math.abs(IYO)
      properties.ixyo = Math.abs(IXYO)
      properties.xbar = Math.abs(Xbar)
      properties.ybar = Math.abs(Ybar)
      properties.ixc = Math.abs(IXC)
      properties.iyc = Math.abs(IYC)
      properties.ixyc = Math.abs(IXYC)
      properties.iu = Math.abs(IU)
      properties.iv = Math.abs(IV)
      properties.theta = Math.abs(Theta)
      return properties
    }
  },
  methods: {
    toggleResize (bool) {
      this.$store.commit('TOGGLE_PROP_RESIZE', bool)
    },
    Atn2 (DX, DY) {
      var Atn2 = ''
      if (DY < 0) {
        Atn2 = -Atn2(DX, -DY)
      } else if (DX < 0) {
        Atn2 = Math.PI - Math.atan(-DY / DX)
      } else if (DX > 0) {
        Atn2 = Math.atan(DY / DX)
      } else if (DY !== 0) {
        Atn2 = Math.PI / 2
      } else {
        Atn2 = Error('div by zero')
      }
      return Atn2
    }
  },
  filters: {
    exponent: function (value) {
      if (isNaN(value) || value < 10000) {
        return value
      } else {
        return value.toExponential(3)
      }
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
