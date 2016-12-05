<template>
  <span v-bind:class="['arrow', sortOrders[arrowcolumn] > 0 ? 'asc' : 'dsc']"></span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['arrowcolumn'],
  computed: {
    ...mapGetters({
      sortOrders: 'sortOrdersGet'
    })
  }
}
</script>

<style>
th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  font-size: 10px;
  color: #ccc;
}

.arrow:after {
  font-family: FontAwesome;
  content: "\f0dc";
}

.active .arrow.asc:after {
  font-family: FontAwesome;
  content: "\f0de";
  color: #1bc98e;
}

.active .arrow.dsc:after {
  font-family: FontAwesome;
  content: "\f0dd";
  color: #1bc98e;
}
</style>