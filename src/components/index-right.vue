<template>
    <div class="index-right">右侧内容</div>
</template>

<script>
    export default {
        name: "index-right"
    }
</script>

<style scoped>
    .index-right{
        position:absolute;
        width:400px;
        height:100%;
        right:0;
        z-index: 2;
        background:rgba(0,0,0,0.2)
    }
</style>