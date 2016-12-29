<template>
  <div class="pane">
    <canvas id="canvas" width=500 height=600></canvas>
  </div>  
</template>

<script>
export default {
  mounted: function () {
    this.$nextTick(function () {
      var canvas = document.getElementById('canvas')
      var context = canvas.getContext('2d')
      var padding = 50

      context.beginPath()
      context.moveTo(padding + 0, 260)

      context.lineTo(padding + 10, 260)
      context.lineTo(padding + 10, 300)
      context.lineTo(padding + 95, 300)
      context.lineTo(padding + 95, 0)
      context.lineTo(padding + 105, 0)
      context.lineTo(padding + 105, 300)
      context.lineTo(padding + 190, 300)
      context.lineTo(padding + 190, 260)
      context.lineTo(padding + 200, 260)
      context.lineTo(padding + 200, 320)
      context.lineTo(padding + 0, 320)
      context.closePath()

      context.lineWidth = 1
      context.fillStyle = '#8ED6FF'
      context.strokeStyle = 'blue'
      context.fill()
      context.stroke()
    })
  }
}
</script>