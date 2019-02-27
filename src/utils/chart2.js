import * as echarts from 'echarts';
import $ from 'jquery';



export default  (function(){

    let TiaoStyleColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#ffb55e'},
            {offset: 1, color: '#ffb55e'}
        ]
    );

    let TiaoHoverColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#fed39e'},
            {offset: 1, color: '#fed39e'}
        ]
    );


    let BarColorArr = [];

    let BarColor1 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#fff6e1'},
            {offset: 0.02, color: '#ffc36a'}
        ]
    );
    let BarColor2 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#dff6fd'},
            {offset: 0.02, color: '#66c5f5'}
        ]
    );
    let BarColor3 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#cefee3'},
            {offset: 0.02, color: '#2ef772'}
        ]
    );



    BarColorArr.push(BarColor1);
    BarColorArr.push(BarColor2);
    BarColorArr.push(BarColor3);


    //饼图
    function PieChart(options){
        var defaultOption={
            conId:'', //内容id
            radius:'60%',
            roseType:'radius',
            center:['50%','50%'],
            name:'',
            showLegend:false, //是否显示图例
            legendArray:[], // 图例数据 name value (percent)
            legendRight:15,  //图例位置
            fontSize:12,
            itemGap:20,
            showLabel:false,  //显示标签
            showLabelLine:false,  // 标签线
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
                itemWidth:10,
                itemHeight:10,
                textStyle:{
                    color:'rgba(255,255,255,0.70)',
                    fontSize:18
                },
                formatter: function (name) {

                    for(var i=0;i<options.dataArray.length;i++){
                        var obj=options.dataArray[i];
                        if(name == obj.name){
                            legendValue = obj.value;
                        }
                    }

                    return name +'       '+ legendValue;
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
                            fontSize:14,
                            color:'rgba(255,255,255,0.75)'
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
        // myChart.on('click',options.fn)
    }

    //条形图
    function TiaoChart(options){

        var defaultOption={
            conId:'', //内容id
            yArray:[],//y轴
            labelPercent:[],
            legendArray:[],
            fontSize:18,
            colorStyle:TiaoStyleColor,//变化的颜色
            hoverStyle:TiaoHoverColor,
            isShowText:true,
            isImportPeo:false,
            barWidth:18,
            barCategoryGap:'20%',//柱状间距
            dataArray:[]
        };

        options = $.extend(false,defaultOption,options);
        var option={
            xAxis: {
                axisTick: {
                    length: 0
                },
                axisLine: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            grid: {
                left: '0',
                right: '25%',
                top:'5%',
                bottom:'0',
                containLabel: true
            },
            dataZoom:false,
            tooltip:{
                formatter:function(params){
                    var index = params.dataIndex;
                    var per = options.labelPercent[index];
                    var label = '';
                    if(options.isImportPeo){
                        label = params.name + ":" + params.value + " " + "("+ per + "‰)"
                    }else{
                        label = params.name + ":" + params.value + " " + "("+ per + "%)"
                    }
                    return label
                }
            },
            yAxis: {
                axisTick: {
                    show:false
                },
                axisLine: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    margin:18,
                    textStyle: {
                        color: "rgba(255,255,255,0.75)",
                        fontSize: options.fontSize
                    },
                    formatter:function (val) {
                        var ParamsName = "";// 最终拼接成的字符串
                        var paramsNameNumber = val.length;// 实际标签的个数
                        if (paramsNameNumber > 4) {
                            ParamsName = val.substring(0, 4) + '...';
                        } else {
                            // 将旧标签的值赋给新标签
                            ParamsName = val;
                        }

                        //将最终的字符串返回
                        return ParamsName
                    }
                },
                data: options.yArray
            },
            series: [
                {
                    type: 'bar',
                    barWidth:options.barWidth,

                    itemStyle:{
                        normal:{
                            label:{
                                show:options.isShowText,
                                position: 'right',
                                textStyle:{
                                    color:'rgba(255,255,255,0.75)',
                                    fontSize:16
                                },
                                formatter:function(params){
                                    var index = params.dataIndex;
                                    var per = options.labelPercent[index];
                                    var label = '';
                                    if(options.isImportPeo){
                                        label = params.value + " " + "("+ per + "‰)"
                                    }else{
                                        label = params.value + " " + "("+ per + "%)"
                                    }
                                    return label
                                }
                            },
                            color: options.colorStyle,
                            barBorderRadius:2,
                        },
                        emphasis:{
                            color:options.hoverStyle
                        }
                    },

                    barCategoryGap:options.barCategoryGap,
                    data: options.dataArray
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
    }

    //圆环
    function RingChart(options) {
        var defaultOption={
            conId:'', //内容id
            type:'pie',
            radius:'60%',
            center:['50%','50%'],
            showLegendPer:true,
            legendArray:[],
            legendRight:'20%',
            colorArray:['#ffc569', '#74b860', '#b18af3', '#0d96ff'], //颜色
            dataArray:[] //数据

        };
        options = $.extend(false,defaultOption,options);


        var legendValue = null;
        var legendPer = null;
        var legendName = [];
        for(var i=0;i<options.dataArray.length;i++){
            legendName.push(options.dataArray[i].name)
        }

        var option = {
            tooltip:{
                formatter: function (params) {
                    for(var i=0;i<options.dataArray.length;i++){
                        var obj=options.dataArray[i];
                        if(params.name == obj.name){
                            legendValue = obj.value;
                            legendPer = obj.percent
                        }
                    }
                    if(options.showLegendPer) {
                        return params.name + ': ' + legendValue + ' ' + legendPer + '%';
                    }else{
                        return params.name + ': ' + legendValue;
                    }

                },
            },
            legend: {
                show:true,
                orient: 'vertical',
                top:'middle',
                itemGap:10,
                right: options.legendRight,
                itemWidth:10,
                itemHeight:10,
                textStyle:{
                    color:'rgba(255,255,255,0.70)',
                    fontSize:18
                },
                formatter: function (name) {

                    for(var i=0;i<options.dataArray.length;i++){
                        var obj=options.dataArray[i];
                        if(name == obj.name){
                            legendValue = obj.value;
                            legendPer = obj.percent
                        }
                    }

                    if(options.showLegendPer){
                        return name +'     '+ legendValue + '  ' + legendPer + '%';
                    }else{
                        return name +'       '+ legendValue;
                    }
                },
                data:legendName
            },
            color:options.colorArray,
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: options.radius,
                    center:options.center,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor:'#061d2d',
                            borderWidth:2
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

        var myChart = echarts.init(dom);
        myChart.setOption(option);
    }

    //柱状图
    function BarChart(options) {
        var defaultOption={
            conId:'', //内容id
            zdyLable:{},
            fontSize:14,
            xArray:[], //X轴
            colorArray:options.colorArr ? options.colorArr:BarColorArr, //颜色
            isShowText:true,
            isshowhover_perc:false,
            dataArray:[] //series数据
        };

        options = $.extend(false,defaultOption,options);





        var option={
            grid: {
                left: '0',
                top:'15%',
                right:'1%',
                bottom:'5%',
                containLabel: true
            },
            tooltip : {
                formatter:function (params) {
                    var unit = options.hover_unit ? options.hover_unit : '';
                    var perc='';
                    if(options.isshowhover_perc == true){
                        return '● ' + params.name + ': ' + params.data + unit+' '+perc+'%';
                    }else{
                        return '● ' + params.name + ': ' + params.data + unit;
                    }
                }
            },
            xAxis: {
                axisTick: {
                    show:false
                },
                axisLine: {
                    show:true,
                    lineStyle:{
                        width:2,
                        color:'#828e96'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    margin:18,
                    textStyle: {
                        color: "rgba(255,255,255,0.75)",
                        fontSize: options.fontSize
                    },
                    formatter:function (val) {
                        var ParamsName = "";// 最终拼接成的字符串
                        var paramsNameNumber = val.length;// 实际标签的个数
                        if (paramsNameNumber > 4) {
                            ParamsName = val.substring(0, 4) + '...';
                        } else {
                            // 将旧标签的值赋给新标签
                            ParamsName = val;
                        }

                        //将最终的字符串返回
                        return ParamsName
                    }
                },
                data: options.xArray
            },
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        show:false
                    },
                    axisLine: {
                        show:false,
                        lineStyle:{
                            width:2,
                            color:'#828e96'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }

                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    itemStyle: {
                        normal:{
                            label:{
                                show:options.isShowText,
                                position: 'top',
                                textStyle:{
                                    color:'#fff',
                                    fontSize:options.fontSize,
                                    fontWeight:'bold'
                                },
                                formatter:options.zdyLable
                            },
                            barBorderRadius:[3, 3, 0, 0],
                            color:function(params){
                                if(options.colorArr){
                                    return options.colorArr
                                }else{
                                    return options.colorArray[params.dataIndex]
                                }

                            }
                        }


                    },
                    barWidth: '45%',
                    data: options.dataArray
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

    }

    //折线图
    function LineChart(options) {
        var defaultOption={
            conId:'', //内容id
            title:'', //标题
            fontSize:14,
            isArea:false,
            showY:false,
            hasMark:true,
            legendBottom:0,
            txtColor:'#fff',
            gridBottom:0,
            gridLeft:'-2%',
            gridRight:'6%',
            gridTop:'10%',
            txtWidth:'100px',
            colorArray:['#01dafe','#58e569','#f0a54a'],//颜色
            dataArray:[],//数据
            baifenhao:'',
            danwei:'',
        };
        options = $.extend(false,defaultOption,options);

        var lineData=[];
        var xAxisData='';


        for(var i=0;i<options.dataArray.length;i++){
            var obj=options.dataArray[i];

            let markPoint = {};
            let markLine = {};

            if(options.hasMark){
                markPoint={ symbolSize:40,
                    label:{
                        normal:{
                            show:true,
                            color:'#fff',
                            formatter:function(params){
                                return params.value + options.danwei
                            }
                        }

                    },
                    data: [
                        {
                            type: 'max',
                            name: '最大值',

                        },
                        {type: 'min', name: '最小值'}
                    ]};
                markLine={
                    label:{
                        normal:{
                            show:true,
                            color:'#fff',
                            formatter:function(params){
                                return params.value + options.danwei
                            }
                        }

                    },
                    lineStyle:{
                        normal:{
                            color:'#cfa162',
                        }

                    },
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }else{
                markPoint = {};
                markLine = {};
            }

            xAxisData = obj.name;
            if(options.isArea){
                lineData.push({
                    name:obj.lineName,
                    type: 'line',
                    smooth: true,
                    data: obj.value,
                    markPoint: markPoint,
                    markLine:markLine,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(64,216,84,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(79,242,240,0.3)'
                            }])
                        }
                    },
                    symbolSize: 15
                })
            }else{
                lineData.push({
                    name:obj.lineName,
                    type: 'line',
                    smooth: true,
                    data: obj.value,
                    markPoint: markPoint,
                    markLine:markLine,
                    symbolSize: 15

                });
            }


        }




        var option = {
            tooltip: {
                trigger:'axis',
                formatter:function(params){
                    var toolTip = '';
                    for(var i=0;i<params.length;i++){

                        if(options.isshowhover_perc == true){
                            toolTip += params[i].seriesName + ':' +params[i].value +'%' + '<br>';
                        }else if(options.danwei){
                            toolTip += params[i].seriesName + ':' +params[i].value +options.danwei + '<br>';
                        } else{
                            toolTip += params[i].seriesName + ':' +params[i].value + '<br>';
                        }
                    }
                    return params[0].name + '</br> '+toolTip;
                }
            },
            grid: {
                left: options.gridLeft,
                right: options.gridRight,
                top: options.gridTop,
                bottom: options.gridBottom,
                containLabel: true
            },
            color:options.colorArray,
            legend:{
                show:false,
            },
            dataZoom:{
                type:'inside',
                start:0,
                end:100
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    // interval: 0,
                    textStyle: {
                        color: '#b2b2b2',
                        fontSize: options.fontSize,
                        baseline: 'top',
                        width:options.txtWidth
                    }
                },
                axisLine: {
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: options.showY,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisLabel: {
                    show: options.showY,
                    textStyle: {
                        color:options.txtColor,
                        fontSize: options.fontSize,
                        baseline: 'top'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle:{
                        color:"#334050",
                        type:'dotted'
                    }
                }
            },
            series: lineData
        };


        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }

    //气泡图
    function ScatterChart(options){
        var defaultOption={
            conId:'', //内容id
            fontSize:14,
            xData:[],
            colorArray:['#01dafe','#58e569','#f0a54a'],//颜色
            dataArray:[]//数据
        };
        options = $.extend(false,defaultOption,options);
        var option = {
            tooltip: {
                position: 'top'
            },
            itemStyle:{
                normal:{
                    color:'#e6ac52'

                }

            },
            singleAxis: [{
                left: 50,
                type: 'category',
                boundaryGap: false,
                data: options.xData,
                top: '40%',
                height: '0',
                axisTick:{
                    show:false
                },
                axisLabel: {
                    interval:0,
                    color:'#fff',
                    margin:50
                },
                axisLine:{
                    lineStyle:{
                        color:'#748f97'
                    }
                }
            }],
            series: [{

                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: options.dataArray,
                symbolSize: function (dataItem) {
                    var max = Math.max.apply(null, options.dataArray);
                    var num = 0;
                    var r = 0;
                    if(dataItem == 0){
                        r = 0;
                    }else{
                        if(max != 0){
                            num = max/80;
                        }
                        if(num !=0){
                            r = dataItem/num;
                        }
                    }

                    return r;
                }
            }]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
    }

    //漏斗图
    function FunnelChart(options){
        var defaultOption={
            conId:'', //内容id
            dataArray:[]//数据
        };
        options = $.extend(false,defaultOption,options);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}"
            },
            calculable: true,
            series: [{
                color: ['#ffcc7d'],
                name: '',
                gap:6,
                type: 'funnel',
                width: '44%',
                height: '70%',
                x: '5%',

                minSize: '50%',
                maxSize:'98%',
                funnelAlign: 'right',

                center: ['50%', '50%'], // for pie

                data: options.dataArray[0],
                roseType: true,
                label: {
                    normal: {

                        position: 'inside',
                        color:'rgba(2,2,2,0.75)',
                        fontSize:18,
                        fontWeight:'bold',
                        formatter: function(params) {
                            return params.name + ':' + params.value
                        },
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        shadowBlur: 20,
                        shadowOffsetX: 0,
                        shadowOffsetY: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                }
            },

                {
                    color: ['#2cb5fd'],
                    name: '',
                    type: 'funnel',
                    gap:6,
                    width: '44%',
                    height: '70%',

                    x: '50%',

                    minSize: '50%',
                    maxSize:'98%',
                    funnelAlign: 'left',

                    center: ['50%', '50%'], // for pie

                    data: options.dataArray[1],
                    roseType: true,
                    label: {
                        normal: {
                            position: 'inside',
                            color:'rgba(2,2,2,0.75)',
                            fontSize:18,
                            fontWeight:'bold',
                            formatter: function(params) {
                                return params.name + ':' + params.value
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                            shadowBlur: 20,
                            shadowOffsetX: 0,
                            shadowOffsetY: 5,
                            shadowColor: 'rgba(0, 2, 0, 0.3)'
                        }
                    }
                },

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
    }

    //嵌套圆环
    function NestRingChart(dom,data){
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            series: [
                {
                    name:'访问来源',
                    center:['40%','40%'],
                    color: ['#00a0e9','#f869a9','#00dbfe','#ff6c4a','#56e168','#ffb55d','#9763ee'],
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {

                        normal: {
                            show:false,
                            position: 'inner'
                        },
                        emphasis:{
                            show:true,
                            position: 'inner'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data.bigTypeList,
                },
                {
                    name:'访问来源',
                    center:['40%','40%'],
                    color: ['#00a0e9','#f869a9','#00dbfe','#ff6c4a','#56e168','#ffb55d','#9763ee'],
                    type:'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {

                        }
                    },
                    data:data.smallTypeList,
                }
            ]
        };


        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形
    }


    return {
        PieChart:PieChart,
        TiaoChart:TiaoChart,
        RingChart:RingChart,
        BarChart:BarChart,
        LineChart:LineChart,
        ScatterChart:ScatterChart,
        FunnelChart:FunnelChart,
        NestRingChart:NestRingChart
    }



})();














