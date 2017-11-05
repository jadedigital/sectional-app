<template>
  <div id="canvasPane" class="pane" v-bind:class="{ scrollable: grid.scale > 1, active: drawingMode }" v-on:wheel.ctrl="zoom" v-on:click="drawCoord" v-on:mousemove="hoverOver" v-on:mouseout="hoverOut">
    <canvas id="canvas" v-on:dblclick="drawModeToggle"></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      customCoords: 'customCoords',
      activeCoord: 'activeCoord',
      drawCanvasTrigger: 'drawCanvasTrigger',
      drawingMode: 'drawingMode',
      hoverCoord: 'hoverCoord',
      grid: 'grid'
    })
  },
  watch: {
    drawCanvasTrigger: function () {
      this.setCanvasSize()
      this.drawCanvas(this.activeCoord)
      this.$store.commit('CALCULATE_PROP')
    }
  },
  methods: {
    zoom (e) {
      var scale = this.grid.scale + ((e.deltaY / 1000) * -1)
      scale = Math.round(Math.min(Math.max(scale, 0.25), 10) * 100) / 100
      this.$store.commit('GRID_SCALE', scale)
    },
    setCanvasSize () {
      var pane = document.getElementById('canvasPane')
      var canvas = document.getElementById('canvas')
      var BB = pane.getBoundingClientRect()
      var coordPayload = {'x': Math.max(BB.width * this.grid.scale, BB.width), 'y': Math.max(BB.height * this.grid.scale, BB.height)}
      canvas.width = coordPayload.x
      canvas.height = coordPayload.y
    },
    drawCanvas: function (index) {
      var canvas = document.getElementById('canvas')
      var gridctx = canvas.getContext('2d')
      gridctx.clearRect(0, 0, canvas.width, canvas.height)

      var grid = this.grid.size
      var scale = this.grid.scale
      var bw = canvas.width
      var bh = canvas.height
      var p = 0

      gridctx.beginPath()
      for (var x = 0; x <= bw; x += (grid * scale)) {
        gridctx.moveTo(0.5 + x + p, p)
        gridctx.lineTo(0.5 + x + p, bh + p)
      }

      for (var y = 0; y <= bh; y += (grid * scale)) {
        gridctx.moveTo(p, 0.5 + y + p)
        gridctx.lineTo(bw + p, 0.5 + y + p)
      }
      gridctx.strokeStyle = '#dfe9ff'
      gridctx.lineWidth = 1
      gridctx.closePath()
      gridctx.stroke()

      var canvasShape = document.getElementById('canvas')
      var context = canvasShape.getContext('2d')
      var ctx = canvasShape.getContext('2d')
      var ctxactive = canvasShape.getContext('2d')

      var padding = 0

      if (this.grid.track) {
        ctx.beginPath()
        for (var point in this.customCoords) {
          if (this.customCoords.hasOwnProperty(point)) {
            if (point === this.grid.tracknode) {
              ctx.moveTo(0, scale * (padding + Number(this.customCoords[point]['y'])))
              ctx.lineTo(bw, scale * (padding + Number(this.customCoords[point]['y'])))
              ctx.moveTo(scale * (padding + Number(this.customCoords[point]['x'])), 0)
              ctx.lineTo(scale * (padding + Number(this.customCoords[point]['x'])), bh)
            }
          }
        }
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(226, 119, 61, 0.8)'
        ctx.closePath()
        ctx.stroke()
      }

      context.beginPath()
      for (var coord in this.customCoords) {
        if (this.customCoords.hasOwnProperty(coord)) {
          if (coord === '1') {
            context.moveTo(scale * (padding + Number(this.customCoords[coord]['x'])), scale * (padding + Number(this.customCoords[coord]['y'])))
          }
          context.lineTo(scale * (padding + Number(this.customCoords[coord]['x'])), scale * (padding + Number(this.customCoords[coord]['y'])))
        }
      }
      if (this.hoverCoord.active === true) {
        context.lineTo(scale * (padding + Number(this.hoverCoord.x)), scale * (padding + Number(this.hoverCoord.y)))
      }

      context.lineWidth = 2
      context.strokeStyle = '#04acde'
      if (!this.drawingMode) {
        context.closePath()
      }
      context.stroke()

      for (var points in this.customCoords) {
        if (this.customCoords.hasOwnProperty(points)) {
          if (index !== -1 && points === index) {
            ctxactive.fillStyle = '#E31B56'
            ctxactive.fillRect(scale * (padding + Number(this.customCoords[points]['x'])) - 3, scale * (padding + Number(this.customCoords[points]['y'])) - 3, 7, 7)
          } else {
            ctx.fillStyle = '#999999'
            ctx.fillRect(scale * (padding + Number(this.customCoords[points]['x'])) - 3, scale * (padding + Number(this.customCoords[points]['y'])) - 3, 7, 7)
          }
        }
      }

      if (this.hoverCoord.active === true) {
        ctxactive.fillStyle = 'green'
        ctxactive.fillRect(scale * (padding + Number(this.hoverCoord.x)) - 3, scale * (padding + Number(this.hoverCoord.y)) - 3, 7, 7)
      }
    },
    drawCoord (e) {
      if (this.drawingMode) {
        e.preventDefault()
        e.stopPropagation()
        var canvas = document.getElementById('canvas')
        var BB = canvas.getBoundingClientRect()
        var scale = this.grid.scale
        var grid = this.grid.size
        var mouseX = Math.round(((parseInt(e.clientX - BB.left)) / scale) * 100) / 100
        var mouseY = Math.round(((parseInt(e.clientY - BB.top)) / scale) * 100) / 100
        var nodesnap = 10 / scale

        if (this.grid.snap === true) {
          mouseX = Math.round(mouseX / grid) * grid
          mouseY = Math.round(mouseY / grid) * grid
        }

        if (this.grid.ortho && Object.keys(this.customCoords).length) {
          var index = Object.keys(this.customCoords).length
          var x1 = this.customCoords[index].x
          var y1 = this.customCoords[index].y
          if (Math.abs(mouseX - x1) > Math.abs(mouseY - y1)) {
            mouseY = y1
          } else {
            mouseX = x1
          }
        }

        for (var point in this.customCoords) {
          if (this.customCoords.hasOwnProperty(point)) {
            if (mouseX > (this.customCoords[point]['x'] - nodesnap) && mouseX < (this.customCoords[point]['x'] + nodesnap)) {
              mouseX = this.customCoords[point]['x']
            }
            if (mouseY > (this.customCoords[point]['y'] - nodesnap) && mouseY < (this.customCoords[point]['y'] + nodesnap)) {
              mouseY = this.customCoords[point]['y']
            }
          }
        }

        if (this.customCoords['1'] && (mouseX > (this.customCoords['1']['x'] - nodesnap) && mouseX < (this.customCoords['1']['x'] + nodesnap)) && (mouseY > (this.customCoords['1']['y'] - nodesnap) && mouseY < (this.customCoords['1']['y'] + nodesnap))) {
          this.$store.commit('RESET_TRACKER')
          this.$store.commit('TOGGLE_HOVER', false)
          this.$store.commit('TOGGLE_DRAW')
        } else {
          var payloadData = {'coordx': mouseX, 'coordy': mouseY}
          this.$store.commit('ADD_COORD', payloadData)
        }
      }
    },
    hoverOver (e) {
      if (this.drawingMode) {
        this.$store.commit('RESET_TRACKER')
        e.preventDefault()
        e.stopPropagation()
        var canvas = document.getElementById('canvas')
        var BB = canvas.getBoundingClientRect()
        var scale = this.grid.scale
        var grid = this.grid.size
        var mouseX = Math.round(((parseInt(e.clientX - BB.left)) / scale) * 100) / 100
        var mouseY = Math.round(((parseInt(e.clientY - BB.top)) / scale) * 100) / 100
        var nodesnap = 10 / scale

        if (this.grid.snap === true) {
          mouseX = Math.round(mouseX / grid) * grid
          mouseY = Math.round(mouseY / grid) * grid
        }

        if (this.grid.ortho && Object.keys(this.customCoords).length) {
          var index = Object.keys(this.customCoords).length
          var x1 = this.customCoords[index].x
          var y1 = this.customCoords[index].y
          if (Math.abs(mouseX - x1) > Math.abs(mouseY - y1)) {
            mouseY = y1
          } else {
            mouseX = x1
          }
        }

        if (this.customCoords['1'] && (mouseX > (this.customCoords['1']['x'] - nodesnap) && mouseX < (this.customCoords['1']['x'] + nodesnap)) && (mouseY > (this.customCoords['1']['y'] - nodesnap) && mouseY < (this.customCoords['1']['y'] + nodesnap))) {
          mouseX = this.customCoords['1']['x']
          mouseY = this.customCoords['1']['y']
        }

        if (this.grid.track) {
          for (var point in this.customCoords) {
            if (this.customCoords.hasOwnProperty(point)) {
              if (mouseX > (this.customCoords[point]['x'] - nodesnap) && mouseX < (this.customCoords[point]['x'] + nodesnap)) {
                mouseX = this.customCoords[point]['x']
                if (Number(point) !== Number(Object.keys(this.customCoords).length)) {
                  this.$store.commit('SET_TRACKER', point)
                }
              }
              if (mouseY > (this.customCoords[point]['y'] - nodesnap) && mouseY < (this.customCoords[point]['y'] + nodesnap)) {
                mouseY = this.customCoords[point]['y']
                if (Number(point) !== Number(Object.keys(this.customCoords).length)) {
                  this.$store.commit('SET_TRACKER', point)
                }
              }
            }
          }
        }

        var coordPayload = {'x': mouseX, 'y': mouseY}
        this.$store.commit('SET_HOVER_COORD', coordPayload)
        this.$store.commit('TOGGLE_HOVER', true)
        this.drawCanvas()
      }
    },
    hoverOut () {
      if (this.drawingMode) {
        this.$store.commit('TOGGLE_HOVER', false)
        this.drawCanvas()
      }
    },
    initialize () {
      this.setCanvasSize()
      this.drawCanvas()
    },
    drawModeToggle () {
      this.$store.commit('TOGGLE_DRAW')
    }
  },
  mounted: function () {
    this.initialize()
  }
}
</script>

<style lang="scss">
@import "../../styles/settings.scss";

#canvasPane {
  border-left: none;
  overflow: hidden;
  &.active {
    border: 1px solid $active;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  }
  &.scrollable {
    &:hover {
      overflow-y: scroll;
      overflow-x: scroll;
    }
  }
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-button {
  display:none;
}

::-webkit-scrollbar-thumb {
  background-color: $secondary-color;
}

</style>
