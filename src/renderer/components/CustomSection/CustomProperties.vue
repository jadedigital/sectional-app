<template>  
  <div class="pane">
    <div class="form-group">
      <div class="header">Properties</div>
      <span ><a class="nav-group-item">Area: {{customProp.area}} mm<sup>2</sup></a></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      customProp: 'customProp'
    })
  }
}
</script>
