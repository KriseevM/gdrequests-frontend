<template>
<PageHeader @pageChanged="changeMessage" ref="header"/>
<div class="p-2">
  {{message}}
</div>

<button @click="click1"></button>
</template>

<script>
import PageHeader from './components/Header.vue'

export default {
  name: 'App',
  data() {
    return {
      message: "other message"
    }
  },
  components: {
    PageHeader
  },
  methods: {
    'changeMessage':function(index) {
      this.message = "now displaying page " + index
    },
    'click1': function() {
      this.$refs.header.currentPage = 1;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>