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
                                <p class="num">{{socialManage.totalAccept}}</p>
                                <p class="name">案件总受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">{{socialManage.averageAccept}}</p>
                                <p class="name">日均受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">{{socialManage.totalEnd}}</p>
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
                        <div class="svgDom chuban-svgDom" v-for="(item,index) in sourceList" v-bind:key="index">
                            <div class="svgBox svgBox_wtsb" id="svgBox_wtsb">
                                <svgRing :options="{size:'110',percent:item.percent,
                                    strokeWidth:14,
                                    circleColor:'#272846',
                                    animateColor:'#9e80de',
                                    fontSize:16}" ></svgRing>
                            </div>
                            <div class="svgDes">
                                <p class="num">{{item.value}}</p>
                                <p class="name">{{item.name}}</p>
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
                                <p class="num">{{xcsbData.totalAccept}}</p>
                                <p class="name">总受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">{{xcsbData.averageAccept}}</p>
                                <p class="name">日均受理</p>
                            </div>
                            <div class="case-item">
                                <p class="num">{{xcsbData.endPercent}}%</p>
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
                                <p class="num">{{smtsData.totalAccept}}</p>
                                <p class="name">总受理量</p>
                            </div>
                            <div class="case-item">
                                <p class="num">{{smtsData.averageAccept}}</p>
                                <p class="name">日均受理</p>
                            </div>
                            <div class="case-item">
                                <p class="num">{{smtsData.endPercent}}%</p>
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
                    <div class="card-main" id="smgx_top6" style="height:300px;">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import svgRing from './svg_ring';
    import $ from 'jquery';
    import Xchart from './../utils/chart2.js';
    import api from './../axios.js';
    export default {
        name: "index-left",
        data(){
          return{
              socialManage:'',
              sourceList:[],
              xcsbData:'',
              smtsData:''
          }
        },
        components:{svgRing},
        mounted(){
            let that = this;
            //社会治理
            api.get('index/index/socialManage').then(res => {
                let totalAccept = parseInt(res.data.totalAccept).toLocaleString();
                let totalEnd = parseInt(res.data.totalEnd).toLocaleString();
                that.socialManage = {
                    totalAccept: totalAccept,
                    averageAccept: res.data.averageAccept,
                    totalEnd: totalEnd,
                    endPercent: res.data.endPercent
                };
                $.each(res.data.sourceList,function(i,n){
                    that.sourceList.push(n)
                })
            });
            //巡查上报
            api.get('index/index/servey', {
                params: {
                    isCitizen: 0
                }
            }).then(res =>{
                let endPercent = parseInt(res.data.endPercent);
                let totalAccept = parseInt(res.data.totalAccept).toLocaleString();
                that.xcsbData = {
                    totalAccept: totalAccept,
                    averageAccept: res.data.averageAccept,
                    endPercent: endPercent
                };

                Xchart.PieChart({
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
            });

            //市民投诉
            api.get('index/index/servey', {
                params: {
                    isCitizen: 1
                }
            }).then(res =>{
                let endPercent = parseInt(res.data.endPercent);
                let totalAccept = parseInt(res.data.totalAccept).toLocaleString();
                that.smtsData = {
                    totalAccept: totalAccept,
                    averageAccept: res.data.averageAccept,
                    endPercent: endPercent
                };

                Xchart.PieChart({
                    conId: 'smgx_top6',
                    radius: [20, 100],
                    itemGap: 5,
                    showLabel: true,
                    showLabelLine: true,
                    center: ['50%', '50%'],
                    colorArray: ['#4586fe', '#2566de', '#85afff', '#3c7df5', '#5992ff', '#6fa1ff'],
                    dataArray: res.data.top6List,
                    fn:function(){}
                });
            });

        },
    }
</script>

<style lang="scss" scoped>
.index-left{
    position:absolute;
    width:770px;
    top:120px;
    left:0;
    z-index: 2;
    .index-left-card{width:100%;}
    .index-left-card.index-left-card2{
        display:flex;
        justify-content: space-around;
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