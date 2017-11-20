<template>
  <div id="canvasPane" class="pane" v-bind:class="{ scrollable: grid.scale > 1, active: drawingMode }" v-on:wheel.ctrl="zoom" v-on:click="drawCoord" v-on:mousemove="hoverOver" v-on:mouseout="hoverOut">
    <canvas id="canvas" v-on:dblclick="drawModeToggle"></canvas>
    <svg v-bind:height="canvasSVG.height" v-bind:width="canvasSVG.width">
      <defs>
        <marker id="markerArrowEnd" markerWidth="13" markerHeight="13" refX="12" refY="6" orient="auto">
          <path d="M2,2 L2,10 L12,6 L2,2" style="fill: #000000;" />
        </marker>
        <marker id="markerArrowStart" markerWidth="13" markerHeight="13" refX="0" refY="6" orient="auto">
          <path d="M10,2 L10,10 L0,6 L10,2" style="fill: #000000;" />
        </marker>
        <marker id="markerSmallEnd" markerWidth="22" markerHeight="13" refX="22" refY="6" orient="auto">
          <path d="M12,2 L12,10 L22,6 L12,2" style="fill: #000000;" />
          <polyline points="0 6, 12 6, 20 6" style="fill: none; stroke: #000000;" />
        </marker>
        <marker id="markerSmallStart" markerWidth="22" markerHeight="13" refX="0" refY="6" orient="auto">
          <path d="M10,2 L10,10 L0,6 L10,2" style="fill: #000000;" />
          <polyline points="2 6, 10 6, 22 6" style="fill: none; stroke: #000000;" />
        </marker>
      </defs>
      <line v-for="(tracker, key) in trackSVG" :key="key" v-bind:x1="tracker.start.x" v-bind:y1="tracker.start.y" v-bind:x2="tracker.end.x" v-bind:y2="tracker.end.y" style="stroke:rgb(255,0,0);stroke-width:1;stroke-dasharray:5" />
      <path v-if="customCoords[1]" v-bind:d="shapeSVG" style="stroke:purple;stroke-width:1" v-bind:class="[drawingMode ? (dimMode ? 'fillShape' : 'noFill') : 'fillShape']"/>
      <circle v-for="(nodeVar, key) in nodeSVG" :key="key" v-bind:cx="nodeVar.x" v-bind:cy="nodeVar.y" r="3" stroke-width="0" v-bind:class="[activeCoord === key ? 'activeNode' : 'node']"/>
      <text v-for="(nodeVar, key) in nodeSVG" :key="key" v-bind:x="nodeVar.x + 2" v-bind:y="nodeVar.y + 2">{{key}}</text>
      <circle v-if="hoverCoord.active" v-bind:cx="hoverSVG.x" v-bind:cy="hoverSVG.y" r="3" stroke="black" stroke-width="0" fill="red"/>
      <line v-for="(dimNode, key) in dimHover" :key="key" v-bind:stroke-dasharray="(((dimNode.length * grid.scale) - 50) / 2) + ', 50'" v-bind:x1="dimNode.x1" v-bind:y1="dimNode.y1" v-bind:x2="dimNode.x2" v-bind:y2="dimNode.y2" v-bind:class="[dimNode.length * grid.scale > 70 ? 'dimArrows' : 'dimArrowsReverse']"/>
      <text v-for="(dimNode, key) in dimHover" :key="key" v-bind:x="(dimNode.x1 + dimNode.x2) / 2" v-bind:y="((dimNode.y1 + dimNode.y2) / 2) + 6" text-anchor="middle">{{dimNode.length}}</text>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      canvasSVG: {width: '', height: ''},
      dimCount: 1,
      dimMouse: {'x': '', 'y': ''}
    }
  },
  computed: {
    ...mapGetters({
      customCoords: 'customCoords',
      activeCoord: 'activeCoord',
      drawCanvasTrigger: 'drawCanvasTrigger',
      drawingMode: 'drawingMode',
      hoverCoord: 'hoverCoord',
      grid: 'grid',
      dimensions: 'dimensions',
      dimMode: 'dimMode'
    }),
    trackSVG () {
      var track = {}
      if (this.grid.tracknode.x > 0) {
        track[1] = {'start': {'x': this.grid.scale * this.customCoords[this.grid.tracknode.x].x, 'y': this.grid.scale * this.customCoords[this.grid.tracknode.x].y}, 'end': {'x': this.grid.scale * this.hoverCoord.x, 'y': this.grid.scale * this.hoverCoord.y}}
      }
      if (this.grid.tracknode.y > 0) {
        track[2] = {'start': {'x': this.grid.scale * this.customCoords[this.grid.tracknode.y].x, 'y': this.grid.scale * this.customCoords[this.grid.tracknode.y].y}, 'end': {'x': this.grid.scale * this.hoverCoord.x, 'y': this.grid.scale * this.hoverCoord.y}}
      }
      return track
    },
    hoverSVG () {
      var coord = {'x': this.grid.scale * this.hoverCoord.x, 'y': this.grid.scale * this.hoverCoord.y}
      return coord
    },
    shapeSVG () {
      var shape = ''
      for (var coord in this.customCoords) {
        if (this.customCoords.hasOwnProperty(coord)) {
          if (coord === '1') {
            shape += 'M' + (this.grid.scale * Number(this.customCoords[coord]['x'])) + ' ' + this.grid.scale * (Number(this.customCoords[coord]['y']))
          }
          shape += ' L' + (this.grid.scale * Number(this.customCoords[coord]['x'])) + ' ' + this.grid.scale * (Number(this.customCoords[coord]['y']))
        }
      }
      if (this.hoverCoord.active && !this.dimMode) {
        shape += ' L' + (this.grid.scale * Number(this.hoverCoord.x)) + ' ' + this.grid.scale * (Number(this.hoverCoord.y))
      }
      if (!this.drawingMode || this.dimMode) {
        shape += ' Z'
      }
      return shape
    },
    nodeSVG () {
      var nodes = JSON.parse(JSON.stringify(this.customCoords))
      var scale = this.grid.scale
      for (var coord in this.customCoords) {
        if (this.customCoords.hasOwnProperty(coord)) {
          nodes[coord]['x'] = scale * Number(this.customCoords[coord]['x'])
          nodes[coord]['y'] = scale * Number(this.customCoords[coord]['y'])
        }
      }
      return nodes
    },
    dimHover () {
      var dimHover = JSON.parse(JSON.stringify(this.dimensions))
      var scale = this.grid.scale
      var last = 1
      if (this.dimensions) {
        last = Object.keys(this.dimensions).length
      }
      var a = ''
      var b = ''
      var length = ''
      for (var dim in this.dimensions) {
        if (this.dimensions.hasOwnProperty(dim)) {
          dimHover[dim]['x1'] = scale * Number(this.dimensions[dim]['x1'])
          dimHover[dim]['y1'] = scale * Number(this.dimensions[dim]['y1'])
          if (this.dimensions[dim]['x2']) {
            dimHover[dim]['x2'] = scale * Number(this.dimensions[dim]['x2'])
            dimHover[dim]['y2'] = scale * Number(this.dimensions[dim]['y2'])
            a = dimHover[dim]['x1'] - dimHover[dim]['x2']
            b = dimHover[dim]['y1'] - dimHover[dim]['y2']
            length = Math.round((Math.sqrt(a * a + b * b) / scale) * 100) / 100
            dimHover[dim]['length'] = length
          }
        }
      }
      if (this.dimCount === -1) {
        dimHover[last]['x2'] = scale * this.dimMouse.x
        dimHover[last]['y2'] = scale * this.dimMouse.y
        a = dimHover[last]['x1'] - dimHover[last]['x2']
        b = dimHover[last]['y1'] - dimHover[last]['y2']
        length = Math.round((Math.sqrt(a * a + b * b) / scale) * 100) / 100
        dimHover[last]['length'] = length
      }
      return dimHover
    }
  },
  watch: {
    drawCanvasTrigger: function () {
      this.setCanvasSize()
      this.drawCanvas(this.activeCoord)
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
      this.canvasSVG.width = coordPayload.x
      this.canvasSVG.height = coordPayload.y
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

        if (this.dimMode && this.dimCount === 1) {
          var dimPayload = {'x': mouseX, 'y': mouseY, 'side': 1}
          this.dimCount = this.dimCount * -1
          this.$store.commit('ADD_DIM', dimPayload)
        } else if (this.dimMode && this.dimCount === -1) {
          var dimN = Object.keys(this.dimensions).length
          if (mouseX > (this.dimensions[dimN]['x1'] - nodesnap) && mouseX < (this.dimensions[dimN]['x1'] + nodesnap)) {
            mouseX = this.dimensions[dimN]['x1']
          }
          if (mouseY > (this.dimensions[dimN]['y1'] - nodesnap) && mouseY < (this.dimensions[dimN]['y1'] + nodesnap)) {
            mouseY = this.dimensions[dimN]['y1']
          }
          dimPayload = {'x': mouseX, 'y': mouseY, 'side': 2}
          this.dimCount = this.dimCount * -1
          this.$store.commit('ADD_DIM', dimPayload)
          this.$store.commit('RESET_TRACKER')
          this.$store.commit('TOGGLE_DIM_MODE', false)
          this.$store.commit('TOGGLE_HOVER', false)
          this.$store.commit('TOGGLE_DRAW')
        } else if (this.customCoords['1'] && (mouseX > (this.customCoords['1']['x'] - nodesnap) && mouseX < (this.customCoords['1']['x'] + nodesnap)) && (mouseY > (this.customCoords['1']['y'] - nodesnap) && mouseY < (this.customCoords['1']['y'] + nodesnap))) {
          this.$store.commit('RESET_TRACKER')
          this.$store.commit('TOGGLE_HOVER', false)
          this.$store.commit('TOGGLE_DRAW')
        } else {
          var payloadData = {'coordx': mouseX, 'coordy': mouseY}
          this.$store.commit('ADD_COORD', payloadData)
          this.$store.commit('CALCULATE_PROP')
        }
      }
    },
    hoverOver (e) {
      if (this.drawingMode) {
        this.$store.commit('RESET_TRACKER')
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

        var closest = {
          keyX: null,
          diffX: null,
          keyY: null,
          diffY: null
        }
        var diffX = ''
        var diffY = ''

        if (this.grid.track) {
          var trackPayload = {}
          for (var point in this.customCoords) {
            if (this.customCoords.hasOwnProperty(point)) {
              if (mouseX > (this.customCoords[point]['x'] - nodesnap) && mouseX < (this.customCoords[point]['x'] + nodesnap)) {
                mouseX = this.customCoords[point]['x']
                diffX = Math.abs(this.customCoords[point]['y'] - mouseY)
                if (!closest.keyX || diffX < closest.diffX) {
                  closest.keyX = point
                  closest.diffX = diffX
                }
              }
              if (mouseY > (this.customCoords[point]['y'] - nodesnap) && mouseY < (this.customCoords[point]['y'] + nodesnap)) {
                mouseY = this.customCoords[point]['y']
                diffY = Math.abs(this.customCoords[point]['x'] - mouseX)
                if (!closest.keyY || diffY < closest.diffY) {
                  closest.keyY = point
                  closest.diffY = diffY
                }
              }
            }
          }
          trackPayload = {'point': closest.keyX, 'axis': 'y'}
          this.$store.commit('SET_TRACKER', trackPayload)
          trackPayload = {'point': closest.keyY, 'axis': 'x'}
          this.$store.commit('SET_TRACKER', trackPayload)
        }
        if (this.dimMode && this.dimCount === -1) {
          var dimN = Object.keys(this.dimensions).length
          if (mouseX > (this.dimensions[dimN]['x1'] - nodesnap) && mouseX < (this.dimensions[dimN]['x1'] + nodesnap)) {
            mouseX = this.dimensions[dimN]['x1']
          }
          if (mouseY > (this.dimensions[dimN]['y1'] - nodesnap) && mouseY < (this.dimensions[dimN]['y1'] + nodesnap)) {
            mouseY = this.dimensions[dimN]['y1']
          }
        }

        var coordPayload = {'x': mouseX, 'y': mouseY}
        this.$store.commit('SET_HOVER_COORD', coordPayload)
        this.dimMouse.x = mouseX
        this.dimMouse.y = mouseY
        this.$store.commit('TOGGLE_HOVER', true)
      }
    },
    hoverOut () {
      if (this.drawingMode) {
        this.$store.commit('RESET_TRACKER')
        this.$store.commit('TOGGLE_HOVER', false)
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
    border: 1px solid $third-color;
    canvas {
      cursor: crosshair;
    }
  }
  &.scrollable {
    &:hover {
      overflow-y: scroll;
      overflow-x: scroll;
    }
  }
}

svg {
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;
}

.activeNode {
  fill: $third-color;
}

.node {
  fill: $fourth-color;
}

.fillShape{
  fill: rgba(223, 233, 255, 0.5);
}

.noFill{
  fill: none;
}

.dimArrows {
  marker-start:url(#markerArrowStart);
  marker-end:url(#markerArrowEnd);
  stroke-width: 1;
  stroke: rgba(0, 0, 0, 1)
}

.dimArrowsReverse {
  marker-start:url(#markerSmallEnd);
  marker-end:url(#markerSmallStart);
  stroke-width: 1;
  stroke: rgba(0, 0, 0, 0)
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
