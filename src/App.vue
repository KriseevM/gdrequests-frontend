<template>
<PageHeader @pageChanged="changePage" :pages="pageDisplayNames" />

<div class="container pt-1 bg-dark h-100 w-sm-75">
  <component :is="this.pageNames[currentPage]"></component>
</div>

</template>

<script>
import PageHeader from './components/Header.vue'
import pages from './pages'
let component = {
  name: 'App',
  data() {
    return {
      currentPage: 0,
      pageNames: pages.map(page => page.name),
      pageDisplayNames: pages.map(page => page.data().displayName)
    }
  },
  components: {
    PageHeader
  },
  methods: {
    changePage(newPageIndex)
    {
      this.currentPage = newPageIndex;
    }
  }
}
pages.forEach(page => {
  component.components[page.name] = page
})
export default component
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