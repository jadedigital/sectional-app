<template>
  <div id="canvasPane" class="pane" v-on:onresize="initialize" v-on:click="drawCoord" v-on:mousemove="hoverOver" v-on:mouseout="hoverOut" v-bind:class="{ active: drawingMode }">
    <canvas id="canvas" v-bind:width="canvasSize.x" v-bind:height="canvasSize.y"></canvas>
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
      canvasSize: 'canvasSize',
      hoverCoord: 'hoverCoord'
    })
  },
  watch: {
    drawCanvasTrigger: function () {
      this.drawCanvas(this.activeCoord)
      this.$store.commit('CALCULATE_PROP')
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

      var padding = 0
      var grid = 20
      var bw = canvas.width
      var bh = canvas.height
      var p = 0

      for (var x = 0; x <= bw; x += grid) {
        gridctx.moveTo(0.5 + x + p, p)
        gridctx.lineTo(0.5 + x + p, bh + p)
      }

      for (var y = 0; y <= bh; y += grid) {
        gridctx.moveTo(p, 0.5 + y + p)
        gridctx.lineTo(bw + p, 0.5 + y + p)
      }

      gridctx.strokeStyle = '#ccc'
      gridctx.lineWidth = 1
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
            ctxactive.fillRect(padding + Number(this.customCoords[points]['x']) - 3, padding + Number(this.customCoords[points]['y']) - 3, 7, 7)
          } else {
            ctx.fillStyle = '#999999'
            ctx.fillRect(padding + Number(this.customCoords[points]['x']) - 3, padding + Number(this.customCoords[points]['y']) - 3, 7, 7)
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
        mouseX = Math.round(mouseX / 20) * 20
        mouseY = Math.round(mouseY / 20) * 20

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
      var canvas = document.getElementById('canvasPane')
      var BB = canvas.getBoundingClientRect()
      var coordPayload = {'x': BB.width, 'y': BB.height}
      this.$store.commit('SET_CANVAS_SIZE', coordPayload)
      this.drawCanvas()
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
  overflow: hidden;
  border-left: none;
  &.active {
    border: 1px solid $active;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  }
}

</style>
