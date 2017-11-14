var option = {
    data: ['data', '신입', '최소', '평균', '최대'],
    yAxis: [['pieData-0', 1000], ['pieData-1', 800], ['pieData-2', 600], ['pieData-3', 248], ['pieData-4', 101]],
    svgWidth: 960,
    svgHeight: 360,
    svgBackgroundColor: '#FFF',
    label: false,
    colorPattern: ['skyblue','#61c3af','#359aff','#f3bb34', '#fa6048'],
    legend: false,
    // tooltip_custom: "<div class='tooltip-custom'>최소 5,000 ~ 최대 10,000이상<br>전년비 <span>6%</span></div>",
    tooltip: true,
    dataLabelColor: "#000",
    dataLabelFontSize: '14',
    labelPosition: false,
    format: '%',
};

var $target = $('.pieChart');
var $thisTarget = '.'+$target.attr('class');

var chart = c3.generate({
    bindto: $thisTarget,
    size: {
        width: option.svgWidth,
        height: option.svgHeight
    },
    onrendered: function() {
        var i = 0;

        console.log($thisTarget);
        var $this1 = $('.c3-chart-arc.c3-target.c3-target-pieData-1');
        var test = $this1.find('text').clone().attr('data-label','NOOOOOOOOOOOOOO');
        $this1.append(test);
    },
    data: {
        columns: [option.data, option.yAxis[0]],
        type: 'donut',
        labels: option.label
    },
    tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            return "<div class='tooltip-custom'><span>"+d[0].value+"명</span></div>"
        },
        show: option.tooltip
    },
    color: {
        pattern: option.colorPattern
    },
    legend: {
      show: option.legend
    }
});

var yDataArr=[];
yDataArr[0]=option.data;
for (var j = 0; j < option.yAxis.length; j++){
    yDataArr[j+1] =option.yAxis[j];
}

chart.load({
    columns: yDataArr
});
