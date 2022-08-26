<template>
<PageHeader @pageChanged="changeMessage" ref="header"/>
<div class="container pt-1 bg-dark h-100 w-sm-75">
  <component :is="currentPageName"></component>
</div>

</template>

<script>
import PageHeader from './components/Header.vue'
import pages from './pages'
export default {
  name: 'App',
  computed: {
    currentPageName() {
      return this.$refs.header.pages[this.$refs.header.currentPage].name
    }
  },
  components: {
    PageHeader, pages
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