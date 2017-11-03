<template>
  <div id="canvasPane" class="pane" v-on:wheel.ctrl="zoom" v-on:click="drawCoord" v-on:mousemove="hoverOver" v-on:mouseout="hoverOut" v-bind:class="{ active: drawingMode }">
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
      if (this.drawingMode) {
        var scale = this.grid.scale + ((e.deltaY / 1000) * -1)
        scale = Math.round(Math.min(Math.max(scale, 0.25), 10) / 0.01) * 0.01
        this.$store.commit('GRID_SCALE', scale)
      }
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
      gridctx.strokeStyle = '#ccc'
      gridctx.lineWidth = 1
      gridctx.stroke()

      this.drawShape(index)
    },
    drawShape: function (index) {
      var canvasShape = document.getElementById('canvas')
      var context = canvasShape.getContext('2d')
      var ctx = canvasShape.getContext('2d')
      var ctxactive = canvasShape.getContext('2d')

      var padding = 0
      var scale = this.grid.scale

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
        context.lineTo(padding + Number(this.hoverCoord.x), padding + Number(this.hoverCoord.y))
      }

      context.lineWidth = 2
      context.fillStyle = '#8ED6FF'
      context.strokeStyle = '#8ED6FF'
      context.stroke()
      if (!this.drawingMode) {
        context.fill()
      }

      for (var points in this.customCoords) {
        if (this.customCoords.hasOwnProperty(points)) {
          if (index !== -1 && points === index) {
            ctxactive.fillStyle = 'red'
            ctxactive.fillRect(scale * (padding + Number(this.customCoords[points]['x'])) - 3, scale * (padding + Number(this.customCoords[points]['y'])) - 3, 7, 7)
          } else {
            ctx.fillStyle = '#999999'
            ctx.fillRect(scale * (padding + Number(this.customCoords[points]['x'])) - 3, scale * (padding + Number(this.customCoords[points]['y'])) - 3, 7, 7)
          }
        }
      }
      if (this.hoverCoord.active === true) {
        ctxactive.fillStyle = 'green'
        ctxactive.fillRect(padding + Number(this.hoverCoord.x) - 3, padding + Number(this.hoverCoord.y) - 3, 7, 7)
      }
    },
    drawCoord (e) {
      if (this.drawingMode) {
        e.preventDefault()
        e.stopPropagation()
        var canvas = document.getElementById('canvas')
        var BB = canvas.getBoundingClientRect()
        var mouseX = parseInt(e.clientX - BB.left)
        var mouseY = parseInt(e.clientY - BB.top)
        if (this.grid.snap === true) {
          mouseX = Math.round(mouseX / this.grid.size) * this.grid.size
          mouseY = Math.round(mouseY / this.grid.size) * this.grid.size
        }

        if (this.customCoords['1'] && mouseX === this.customCoords['1']['x'] && mouseY === this.customCoords['1']['y']) {
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
        e.preventDefault()
        e.stopPropagation()
        var canvas = document.getElementById('canvas')
        var BB = canvas.getBoundingClientRect()
        var mouseX = parseInt(e.clientX - BB.left)
        var mouseY = parseInt(e.clientY - BB.top)
        if (this.grid.snap === true) {
          mouseX = Math.round(mouseX / this.grid.size) * this.grid.size
          mouseY = Math.round(mouseY / this.grid.size) * this.grid.size
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
  &.active {
    border: 1px solid $active;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  }
}

</style>
