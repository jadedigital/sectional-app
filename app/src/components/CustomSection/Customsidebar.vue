<template>
  <div class="pane-sm sidebar">
    <div class="form-group">
      <label>Grid Size</label>
      <input class="gridinp" type="number" name="gridsize" min="10" max="100">
      <div v-for="(xy, index) in sectionCoords" class="coords">
        <label>{{index}}</label>
        <span class="coordwrap">
          <input class="coordx" type="number" v-bind:value="xy['x']" v-on:input="updateCoord(index, $event, 'x')"><input class="coordy" type="number" v-bind:value="xy['y']" v-on:input="updateCoord(index, $event, 'y')">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      sectionCoords: 'sectionCoords'
    })
  },
  methods: {
    updateCoord (index, e, axis) {
      this.$store.commit('UPDATE_COORD', {
        value: e.target.value,
        index: index,
        axis: axis
      })
    }
  }
}
</script>

<style>
.coordx, .coordy {
  width: 50%
}

.coordwrap {
  width: 90%;
  overflow: auto;
  display: block;
  float: right;
}

.gridinp {
  width: 50%;
  float: right;
}
</style>
