<template>
  <div class="pane" v-bind:class="{ active: drawingMode }">
    <canvas id="canvas" width=600 height=600></canvas>
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
      drawingMode: 'drawingMode'
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
      context.closePath()
      context.lineWidth = 2
      context.fillStyle = '#8ED6FF'
      context.strokeStyle = '#8ED6FF'
      context.stroke()

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
    },
    initialize () {
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
.pane.active {
  border: 1px solid $active;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}

</style>
