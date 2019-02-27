<template>
    <div class="index-right">
        <div class="index-left-layer"></div>
        <div class="index-left-con">
            <div class="index-left-card">
                <div class="card-title">
                    <h2 class="card-title-big">案件高发社区</h2>
                </div>

                <div class="card-main">
                    <div class="card-gaofa">
                        <div class="card-title-small">本月TOP3</div>
                        <div class="card-main card-benyueTop3" >
                            <progress-bar :data="alarmData.wei_gui_data"></progress-bar>
                        </div>
                    </div>
                    <div class="card-gaofa">
                        <div class="card-title-small">上月TOP3</div>
                        <div class="card-main card-shangyueTop3"></div>
                    </div>
                </div>
            </div>
            <div class="index-left-card">
                <div class="card-title">
                    <h2 class="card-title-big">案件处办分布</h2>
                    <span class="card-full-btn"><img src="" width="100%"></span>
                </div>
                <div class="card-main">
                    <div class="card-case-source" id="case_source">

                    </div>
                </div>
            </div>

            <div class="index-left-card index-left-card2">
                <div class="index-left-card2-box">
                    <div class="card-title">
                        <h2 class="card-title-big">巡查上报概况</h2>
                    </div>
                    <div class="card-main">

                    </div>
                </div>
                <div class="index-left-card2-box">
                    <div class="card-title">
                        <h2 class="card-title-big">市民投诉概况</h2>
                    </div>
                    <div class="card-main">

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
    import api from './../axios.js';
    import $ from 'jquery';
    import progressBar from './../utils/common.js';
    // import Xchart from './../utils/chart2.js';
    export default {
        name: "index-right",
        components:{progressBar},
        mounted(){
            api.get('run/situational/communityTop').then(res => {
                let benyueTOP3='',
                    shangyueTOP3='';
                for(let i=0;i<res.data.currentList.length;i++){
                    let obj = res.data.currentList[i];
                    benyueTOP3 += `<div class="echart-item echart-green">
                                    <div class="echart-item-name" title="${obj.name}">${obj.name}</div>
                                    <div class="echart-item-con acceptTop${i+1}">
                                        <div class="echart-item-bar progressColorBar" title="${obj.name}"></div>
                                        <div class="echart-item-value">${obj.value}</div>
                                        <div class="echart-item-percent">(${obj.percent}%)</div>
                                    </div>
                                </div>`;
                }
                $('.card-benyueTop3').html(benyueTOP3);
                for(let i=0;i<res.data.currentList.length;i++){
                    let obj = res.data.currentList[i];
                    let total = parseInt(res.data.currentList[0].value);
                    let value = JSON.parse(obj.value);
                    let percent = value/total * 100;
                    progressBar('.acceptTop'+(i+1),percent);
                }

                for(let i=0;i<res.data.lastList.length;i++){
                    let obj = res.data.lastList[i];
                    shangyueTOP3 += `<div class="echart-item echart-yellow">
                                    <div class="echart-item-name" title="${obj.name}">${obj.name}</div>
                                    <div class="echart-item-con acceptTop${i+1}">
                                        <div class="echart-item-bar progressColorBar" title="${obj.name}"></div>
                                        <div class="echart-item-value">${obj.value}</div>
                                        <div class="echart-item-percent">(${obj.percent}%)</div>
                                    </div>
                                </div>`;
                }
                $('.card-shangyueTop3').html(shangyueTOP3);
                for(let i=0;i<res.data.lastList.length;i++){
                    let obj = res.data.lastList[i];
                    let total = parseInt(res.data.lastList[0].value);
                    let value = JSON.parse(obj.value);
                    let percent = value/total * 100;
                    progressBar('.acceptTop'+(i+1),percent);
                }
            })
        }
    }
</script>

<style scoped>
    .index-right{
        position:absolute;
        top:120px;
        right:0;
        z-index: 2;
        background:rgba(0,0,0,0.2)
    }
</style>