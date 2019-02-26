<template>
    <div class="index-header">
        <div class="header-left">
        </div>
        <div class="header-left-interval"><img src="../assets/nav_top_center.png"></div>
        <div class="header-center">
            <div class="header-center-title"><img src="../assets/logo_jingkai.png"><span class="center-titleName">吴江经济技术开发区·智慧管理中心</span></div>
        </div>
        <div class="header-right-interval"><img src="../assets/nav_top_center.png"></div>
    </div>
</template>

<script>
    export default {
        name: "index-header"
    }
</script>

<style scoped>
    .index-header{position:absolute;top:0;left:0;width:3840px;z-index:5;}
    .header-left{display:inline-block;vertical-align:middle;height:115px;width:752px;padding-top:11px;padding-left:20px;box-sizing:border-box;font-size:18px;color:#d6e9ff;background:url(../assets/nav_top_side.png) no-repeat;}

    .header-left-interval{position:absolute;left:660px;display:inline-block;vertical-align:middle;}
    .header-center{position:absolute;display:inline-block;vertical-align:middle;left:1240px;z-index:3;width: 1362px}
    .header-center-title{display:flex;align-items:center;justify-content:center;padding:5px 125px 25px;font-size:50px;font-weight:bold;color:#d6e9ff;text-shadow:0 0 20px #145f87,0 0 20px #145f87,0 0 20px #145f87;
        background:url(../assets/nav_title_bg.png) no-repeat;background-size:100%;}
    .header-right-interval{position:absolute;right:658px;display:inline-block;vertical-align:middle;z-index:2;}
    .header-right-interval img{transform:rotateX(360deg) rotateY(180deg)}
    .header-right{position:absolute;display:inline-block;vertical-align:middle;right:0;top:0;}
    .header-right .header-right-bg{position:absolute;right:0;top:0;transform:rotateX(360deg) rotateY(180deg)}
    .header-right-dateWeather{position:absolute;right:50px;width:590px;top:15px;font-size:18px;}
    .header-right-date{display:inline-block;vertical-align: middle;padding-right:20px;}
    .header-right-weather{display:inline-block;vertical-align: middle;}
    .header-right-weather img{display:inline-block;vertical-align: middle;margin-right:5px;}
</style>