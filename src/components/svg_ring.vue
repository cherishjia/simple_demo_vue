<template>
    <div class="donut" ref="donut">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"   :width="options.size" :height="options.size" viewBox="0 0 220 220">
            <circle class="donut__svg__scrim" r="100" cy="110" cx="110" :stroke-width="options.strokeWidth" :stroke="options.circleColor" fill="none"></circle>

            <path id="circlePath" d="M 110 10 a 100 100 0 0 1 0 200 a 100 100 0 0 1 0 -200 Z" fill="none" :stroke="options.animateColor" :stroke-width="options.strokeWidth" stroke-linecap="round" stroke-dasharray="628.4073486328125">
                <animate id="circleAnimate" attributeName="stroke-dashoffset" from="628.4073486328125" to="0" dur="3s" repeatDur="" fill="freeze" begin="indefinite" restart="whenNotActive"></animate>
            </path>
            <g>
                <rect x="-15" y="-15" width="30" height="30" fill="url(#tail_1)">
                    <animateMotion id="tailAnimate"  path="M 110 10 a 100 100 0 0 1 0 200 a 100 100 0 0 1 0 -200 Z" dur="3s" repeatDur="" fill="freeze" rotate="auto" begin="indefinite" restart="whenNotActive"></animateMotion>
                </rect>
            </g>
            <defs>
                <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="60%" id="tail_1">
                    <stop stop-opacity="1" stop-color="#fff" offset="30%"/>
                    <stop stop-opacity="0.5" stop-color="#fff" offset="40%"/>
                    <stop stop-opacity="0" stop-color="#fff" offset="80%"/>
                </radialGradient>

            </defs>
        </svg>
        <div class="donut_msg" :style="{color:options.animateColor}">
            <div class="donut_per"><span :style="{fontSize:options.fontSize}">{{options.percent}}</span>%</div>
            <div class="donut_text">{{options.name}}</div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        name: "svg_ring",
        props:{
            options:Object
        },
        mounted(){
            let that = this;
            // that.runAnimate(that.options.percent, that.$refs.donut);
            setInterval(function(){
                that.runAnimate(that.options.percent, that.$refs.donut);
            },5000)
        },
        methods:{
            runAnimate:function(percent,dom){

                if(percent == 0){
                    percent = 0.1;
                }

                let totalTime = 3;
                let $circleAnimate = $(dom).find('#circleAnimate');
                let $tailAnimate = $(dom).find('#tailAnimate');
                let per = percent/100;
                let durTime = totalTime * per;

                $circleAnimate.attr('repeatDur', durTime + 's');
                $tailAnimate.attr('repeatDur', durTime + 's');
                $circleAnimate[0].beginElement();
                // $tailAnimate[0].beginElement();
            }
        }
    }
</script>

<style scoped>

</style>