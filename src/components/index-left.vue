<template>
    <div class="index-left">
        <div class="index-left-layer"></div>
        <div class="index-left-con">
            <div class="index-left-card">
                <div class="card-title">
                    <h2 class="card-title-big">社会治理概况</h2>
                </div>

                <div class="card-main">
                    <div class="card-blueBox">
                        <div class="card-case-con" style="height:100%;">
                            <div class="case-item">
                                <p class="num">1234</p>
                                <p class="name">案件总受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">2</p>
                                <p class="name">日均受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">11</p>
                                <p class="name">案件总结案量</p>
                            </div>
                            <div class="case-item font-green">
                                <p class="num">99%</p>
                                <p class="name">结案率</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index-left-card">
                <div class="card-title">
                    <h2 class="card-title-big">案件处办分布</h2>
                    <span class="card-full-btn"><img src="" width="100%"></span>
                </div>
                <div class="card-main">
                    <div class="card-case-source" id="case_source" >
                        <div class="svgDom chuban-svgDom">
                            <div class="svgBox svgBox_wtsb" id="svgBox_wtsb">
                                <svgRing :options="{size:'110',percent:85,
                                    strokeWidth:14,
                                    circleColor:'#272846',
                                    animateColor:'#9e80de',
                                    fontSize:16}" ></svgRing>
                            </div>
                            <div class="svgDes">
                                <p class="num">81，002</p>
                                <p class="name">网格处办</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="index-left-card index-left-card2">
                <div class="index-left-card2-box">
                    <div class="card-title">
                        <h2 class="card-title-big">巡查上报概况</h2>
                    </div>
                    <div class="card-main">
                        <div class="card-case-con">
                            <div class="case-item">
                                <p class="num">109,938</p>
                                <p class="name">总受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">234</p>
                                <p class="name">日均受理</p>
                            </div>
                            <div class="case-item">
                                <p class="num">99%</p>
                                <p class="name">结案率</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-left-card2-box">
                    <div class="card-title">
                        <h2 class="card-title-big">市民投诉概况</h2>
                    </div>
                    <div class="card-main">
                        <div class="card-case-con">
                            <div class="case-item">
                                <p class="num">109,938</p>
                                <p class="name">总受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">234</p>
                                <p class="name">日均受理</p>
                            </div>
                            <div class="case-item">
                                <p class="num">99%</p>
                                <p class="name">结案率</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index-left-card index-left-card2">
                <div class="index-left-card2-box">
                    <div class="card-title">
                        <h2 class="card-title-small">巡查上报热点问题TOP6</h2>
                    </div>
                    <div class="card-main" id="xcsb_top6" style="height:300px;">

                    </div>
                </div>
                <div class="index-left-card2-box">
                    <div class="card-title">
                        <h2 class="card-title-small">市民关心热点问题TOP6</h2>
                    </div>
                    <div class="card-main" id="smgx_top6">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import svgRing from './svg_ring';
    import charts from './../utils/chart.js';
    export default {
        name: "index-left",
        components:{svgRing},
        mounted(){
            let that = this;
                that.$http.get('http://wjjkq.dsjdeve.xbwq.com.cn/dsj_wjjkq_show/api/index/index/servey').then(res => {
                    charts.PieChart({
                        conId: 'xcsb_top6',
                        radius: [20, 100],
                        itemGap: 5,
                        showLabel: true,
                        showLabelLine: true,
                        center: ['50%', '50%'],
                        colorArray: ['#4586fe', '#2566de', '#85afff', '#3c7df5', '#5992ff', '#6fa1ff'],
                        dataArray: res.data.top6List,
                        fn:function(){}
                    });
                })


        },
    }
</script>

<style lang="scss" scoped>
.index-left{
    position:absolute;
    width:400px;
    top:120px;
    left:0;
    z-index: 2;
    .index-left-card{width:100%;}
    .index-left-card.index-left-card2{
        display:flex;

    }

    .card-case-source{
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding-right:20px;
        .svgBox{width:110px;height:110px;}
        .chuban-svgDom.svgDom{
            .svgDes{
                .num{font-size:34px;font-weight:bold;}
            }
        }
    }
}

.svgDom .svgBox{display:inline-block;vertical-align:middle;width:75px;height:75px;}
.svgDom .svgDes{display:inline-block;vertical-align:middle;margin-left:10px;}
.svgDom .svgDes .num{font-size:22px;}
.card-main{width:100%;margin:5% 0;}
.card-blueBox{position:relative;width:730px;height:180px;border:1px solid #1a4f6b;border-radius:6px;background-color: rgba(7, 53, 79, 0.749);overflow:hidden;}

</style>