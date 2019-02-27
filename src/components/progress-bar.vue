<template>
    <div class="main-progress">
        <div class="progress-bar">
            <div class="progress-item" v-for="(item,index) in data" :key="index">
                <div class="item-name" :title="item.name">{{item.name}}</div>
                <div class="progress-thumb" :style="getPercent(item.count)"></div>
                <div class="progress-num">{{item.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "progress-bar",
        data() {
            return {
                indexRightPanelW: 0.4,
                maxNum: 0
            };
        },
        methods: {
            getPercent(num) {
                let percent = num / this.maxNum;
                let progressColorW = this.indexRightPanelW * percent * 100;
                progressColorW = progressColorW > 40 ? 40 : progressColorW;
                return "width:" + progressColorW + "%";
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../css/progress-bar.scss";
</style>
