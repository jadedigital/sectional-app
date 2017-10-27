<template>
  <div class="pane-group">
    <div class="pane-sm sidebar">
      <div class="form-group">
        <div class="header">
          <span>Section</span>
        </div>
        <div class="sectioninfo">
          <label class="sectionlabel">Name<input class="sectioninp" type="text"></label>
          <label class="sectionlabel">Group<input class="sectioninp" type="text"></label>
        </div>
        <div class="header">
          <span>Coordinates</span>
        </div>
        <div class="coordlist">
          <div v-for="(xy, index) in customCoords" class="coords">
            <label class="coordIndex">{{index}}</label>
            <span class="coordwrap">
              <input class="coordx" type="number" v-bind:value="xy['x']" v-on:input="updateCoord(index, $event, 'x')" v-on:focus="activeCoord(index)" v-on:blur="deactiveCoord()"><input class="coordy" type="number" v-bind:value="xy['y']" v-on:input="updateCoord(index, $event, 'y')" v-on:focus="activeCoord(index)" v-on:blur="deactiveCoord()">
            </span>
          </div>
        </div>
        <div class="addcoord">
          <span class="coordIndex fa fa-plus" v-on:click="addCoord()"></span>
          <span class="coordwrap">
            <input v-model="coordx" class="coordx" type="number" placeholder="0"><input v-model="coordy" class="coordy" type="number" placeholder="0">
          </span>
        </div>
      </div>
    </div>
    <div class="pane">
      <canvas id="canvas" width=600 height=600></canvas>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import storage from 'electron-json-storage'

export default {
  data () {
    return {
      customCoords: {},
      coordx: '',
      coordy: ''
    }
  },
  computed: {
    ...mapGetters({
      sectionCoords: 'sectionCoords'
    }),
    customSection: function () {
      var self = this
      storage.has('customSection', function (error, hasKey) {
        if (error) throw error

        if (hasKey) {
          storage.get('customSection', function (error, data) {
            if (error) throw error

            console.log(data)
            self.customCoords = data
          })
        }
      })
    }
  },
  methods: {
    drawCanvas: function (index) {
      var canvas = document.getElementById('canvas')
      var context = canvas.getContext('2d')
      var ctx = canvas.getContext('2d')
      var ctxactive = canvas.getContext('2d')
      var gridctx = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)

      var padding = 50
      var grid = 20
      var bw = canvas.width
      var bh = canvas.height
      var p = 10

      for (var x = 0; x <= bw; x += grid) {
        gridctx.moveTo(0.5 + x + p, p)
        gridctx.lineTo(0.5 + x + p, bh + p)
      }

      for (var y = 0; y <= bh; y += grid) {
        gridctx.moveTo(p, 0.5 + y + p)
        gridctx.lineTo(bw + p, 0.5 + y + p)
      }

      gridctx.strokeStyle = '#ccc'
      gridctx.stroke()

      context.beginPath()
      for (var coord in this.customCoords) {
        if (this.customCoords.hasOwnProperty(coord)) {
          if (coord === '1') {
            context.moveTo(padding + Number(this.customCoords[coord]['x']), padding + Number(this.customCoords[coord]['y']))
          }
          context.lineTo(padding + Number(this.customCoords[coord]['x']), padding + Number(this.customCoords[coord]['y']))
        }
      }
      context.closePath()
      context.lineWidth = 1
      context.fillStyle = '#8ED6FF'
      context.strokeStyle = '#8ED6FF'
      context.stroke()
      context.fill()

      for (var points in this.customCoords) {
        if (this.customCoords.hasOwnProperty(points)) {
          if (index !== undefined && points === index) {
            ctxactive.fillStyle = 'red'
            ctxactive.fillRect(padding + Number(this.customCoords[points]['x']) - 3, padding + Number(this.customCoords[points]['y']) - 3, 7, 7)
          } else {
            ctx.fillStyle = '#999999'
            ctx.fillRect(padding + Number(this.customCoords[points]['x']) - 3, padding + Number(this.customCoords[points]['y']) - 3, 7, 7)
          }
        }
      }
    },
    addCoord () {
      var index = 1
      var data = {}
      if (this.customCoords) {
        console.log('you made it')
        index = Object.keys(this.customCoords).length + 1
        data = this.customCoords
      }
      var x = this.coordx
      var y = this.coordy
      data[index] = { 'x': x, 'y': y }
      storage.set('customSection', {data}, function (error) {
        if (error) throw error
      })
      this.coordx = ''
      this.coordy = ''
      this.drawCanvas()
      console.log(this.customCoords)
    },
    updateCoord (index, e, axis) {
      var data = this.customCoords
      data[index][axis] = e.target.value
      storage.set('customSection', {data}, function (error) {
        if (error) throw error
      })
      this.drawCanvas(index)
    },
    activeCoord (index) {
      this.drawCanvas(index)
    },
    deactiveCoord () {
      this.drawCanvas()
    },
    initialize () {
      var self = this
      storage.get('customSection', function (error, data) {
        if (error) throw error

        self.customCoords = data.data
        self.drawCanvas()
      })
    }
  },
  mounted: function () {
    this.initialize()
  }
}
</script>

<style lang="scss">
.coordx, .coordy {
  width: 50%
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
}

.header {
  background: #ccc;
  padding-left: 8px;
  font-weight: bold;
}

</style>
