<template>
  <div class="index">
    <index-header></index-header>
    <index-left></index-left>
    <index-right></index-right>
    <index-map></index-map>
  </div>
</template>

<script>
    import indexHeader from './../components/index-header';
    import indexLeft from './../components/index-left';
    import indexRight from './../components/index-right';
    import indexMap from './../components/index-map';
    export default {
        name: 'index',
        components:{indexLeft,indexRight,indexHeader,indexMap},
        data () {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{position:relative;height:1296px;width:3840px;}
</style>

