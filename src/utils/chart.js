import * as echarts from 'echarts';
import $ from 'jquery';

class xChart {
    PieChart(options){
        var defaultOption={
            conId:'', //内容id
            radius:'60%',
            roseType:'radius',
            center:['50%','50%'],
            name:'',
            showLegend:false, //是否显示图例
            legendArray:[], // 图例数据 name value (percent)
            legendRight:15,  //图例位置
            itemWidth:10,
            itemHeight:10,
            fontSize:18,
            itemGap:20,
            showLabel:false,  //显示标签
            showLabelLine:false,  // 标签线
            showLabelPer:false,
            colorArray:['#EF7663', '#1AA7B3', '#F968A9', '#F968A9', '#804FCD', '#FFB55E', '#2247B2'],
            dataArray:[], //数据
            fn:function(){}
        };
        options = $.extend(false,defaultOption,options);
        //获取数据
        var legendName=[];
        var labelPercent = [];
        var legendValue = null;
        for(var i=0;i<options.dataArray.length;i++){
            legendName.push(options.dataArray[i].name);
            labelPercent.push(options.dataArray[i].percent);
        }

        var option={
            tooltip : {
                formatter:function(params){
                    var index = params.dataIndex;
                    var per = labelPercent[index];
                    if(per) {
                        return params.name + ":" + params.value + " " + "(" + per + "%)"
                    }else{
                        return params.name + ":" + params.value
                    }
                }
            },
            legend: {
                show:options.showLegend,
                type: 'scroll',
                orient: 'vertical',
                top:'middle',
                itemGap:10,
                right: options.legendRight,
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:{
                    color:'rgba(255,255,255,1)',
                    fontSize:options.fontSize
                },
                formatter: function (name) {

                    for(var i=0;i<options.dataArray.length;i++){
                        var obj=options.dataArray[i];
                        if(name == obj.name){
                            legendValue = obj.value;
                        }
                    }

                    return name +'  '+ legendValue;
                },
                data:legendName,
            },

            color:options.colorArray,
            series : [
                {
                    name:options.name,
                    type:'pie',
                    center:options.center,
                    radius :options.radius,
                    roseType:options.roseType,
                    clockwise:false,
                    label: {
                        normal: {
                            show:options.showLabel,
                            fontSize:options.fontSize,
                            color:'rgba(255,255,255,0.75)',
                            formatter:function(params){
                                if(options.showLabelPer){
                                    return params.name + ':' + params.percent + '%'
                                }else{
                                    return params.name
                                }
                            }

                        },

                    },
                    labelLine: {
                        normal: {
                            show: options.showLabelLine,
                            length:8
                        }
                    },
                    itemStyle:{
                        emphasis:{
                            color:'#80fbff'
                        }
                    },
                    data:options.dataArray

                }
            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
        myChart.on('click',options.fn)
    }
}

const charts = new xChart();
export default charts







