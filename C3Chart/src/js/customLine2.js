var option = {
    data: ['data', '고졸미만', '고졸(예정)', '초대졸(예정)', '대졸(예정)', '석박사(예정)'],
    yAxis: [['lineData-0', 0, 0, 50, 50, 0]],
    svgWidth: 960,
    svgHeight: 360,
    svgBackgroundColor: '#FFF',
    dataLabelDiv: 6000,
    dataLabel_up: 35,
    dataLabel_down: -10,
    label: true,
    pointFillColor: '#ff8759',
    pointStrokeColor: ['#ff8759'],
    pointRad: 4,
    pointExpand: false,
    pointExpandRate: 1.75,
    colorPattern: ['#ff8759'],
    x_grid: false,
    y_grid: true,
    legend: false,
    regions_start: 1,
    regions_end: 0,
    regions_start_2: 0,
    regions_end_2: 0,
    regions_style: 'dashed',
    focusLine: false,
    axis_x_tick_center: true,
    axis_x_outer: false,
    axis_y_outer: false,
    axis_y_count: 5,
    axis_y_max: 100,
    axis_y_min: 0,
    tooltip_custom: "<div class='tooltip-custom'>최소 5,000 ~ 최대 10,000이상<br>전년비 <span>6%</span></div>",
    tooltip: false,
    dataLabelColor: "#000",
    dataLabelFontSize: '14',
    axis_y_color: '#fff',
    axis_x_color: '#cccccc',
    dasharrayX: '2 2',
    dasharrayY: '0 0',
    gridLineColor: '#e9e9e9',
    axis_y_font_size: '12',
    axis_y_font_color: '#bbbbbb',
    axis_x_font_size: '12',
    axis_x_font_color: '#666666',
    axis_x_positionY: 6,
    axis_y_positionY: 10,
    axis_x_tick_line: '#fff',
    axis_y_tick_line: '#fff',
    labelPosition: false,
    format: '%',
    zeroValue: true,
    rectView: true,
    rectOddColor:'#ddd',
    rectEvenColor:'transparent'
};

var $target = $('.lineChart');
var $thisTarget = '.'+$target.attr('class');
var $dataLabel = option.data[0];
var $yAxisLabel = [];

for ( var i = 0; i < option.yAxis.length; i++ ){
    $yAxisLabel.push(option.yAxis[i][0]);
}

var chart = c3.generate({
    bindto: $thisTarget,
    size: {
        width: option.svgWidth,
        height: option.svgHeight
    },
    onrendered: function() {
        var i = 0;
        $target.find('svg').css('background-color', option.svgBackgroundColor);
        if ( option.labelPosition ){
            for ( i; i < $yAxisLabel.length; i++ ){
                d3.selectAll('.c3-texts-' + $yAxisLabel[i] + ' .c3-text').each(function(d) {
                    if ( d === undefined ) return;
                    d.value > option.dataLabelDiv ? getDataLabelDiv( d, option.dataLabel_up, i ) : getDataLabelDiv( d, option.dataLabel_down, i );
                });
            }
        }

        if ( option.zeroValue ){
            for ( i; i < $yAxisLabel.length; i++ ){
                d3.selectAll($thisTarget + ' .c3-texts-' + $yAxisLabel[i] + ' .c3-text').each(function(d) {
                    getDataLabelVal(d, i);
                });
            }
        }

        var rectLength = $($thisTarget).find('.c3-event-rects-single rect').css('fill-opacity', 0.4);

        if ( option.rectView ){
            $($thisTarget).find('.c3-event-rects-single rect').each(function(i){
                var cls = $(this).attr('class').split(' ');
                var clsNum = cls[cls.length-1];
                $($thisTarget).find('.c3-event-rects-single rect:odd').attr('fill',option.rectOddColor);
                $($thisTarget).find('.c3-event-rects-single rect:even').attr('fill',option.rectEvenColor);
            });
        }else{
            $($thisTarget).find('.c3-event-rects-single rect:odd').attr('fill', 'transparent');
            $($thisTarget).find('.c3-event-rects-single rect:even').attr('fill', 'transparent');
        }

        function getDataLabelDiv( d, val, i ){
            $('.c3-texts-' + $yAxisLabel[i] + '.c3-texts .c3-text-' + d.index).css('transform','translate(0, '+ val +'px)');
        }

        function getDataLabelVal( d, i ){
            if ( d.value === 0 ) {
                $($thisTarget + ' .c3-texts-' + $yAxisLabel[i] + '.c3-texts .c3-text-' + d.index).text('');
            }else{
                var t =$($thisTarget + ' .c3-texts-' + $yAxisLabel[i] + '.c3-texts .c3-text-' + d.index).text();
                $($thisTarget + ' .c3-texts-' + $yAxisLabel[i] + '.c3-texts .c3-text-' + d.index).text(t + option.format);
            }
        }

        for ( i = 0; i < option.pointStrokeColor.length; i++ ){
            d3.selectAll( $($thisTarget + ' .c3-target-' + $yAxisLabel[i] + ' circle')).each(function(d){
                $($thisTarget + ' .c3-target-' + $yAxisLabel[i] + ' circle.c3-circle-'+d.index).css('stroke', option.pointStrokeColor[i]);
            });
        }

        this.getCircles().style({'fill': option.pointFillColor});

        console.log($thisTarget);
        $($thisTarget + ' .c3-texts .c3-text').css({'fill': option.dataLabelColor, 'font-size': option.dataLabelFontSize });
        $($thisTarget + ' .c3-axis-x path').css('stroke', option.axis_x_color);
        $($thisTarget + ' .c3-axis-x line').css('stroke', option.axis_x_color);
        $($thisTarget + ' .c3-axis-y path').css('stroke', option.axis_y_color);
        $($thisTarget + ' .c3-axis-y line').css('stroke', option.axis_y_color);
        $($thisTarget + ' .c3-axis-x .tick text').attr('y', option.axis_x_positionY);
        $($thisTarget + ' .c3-axis-y .tick text').attr('y', option.axis_y_positionY);
        $($thisTarget + ' .c3-axis-y .tick line').css('stroke', option.axis_y_tick_line);
        $($thisTarget + ' .c3-axis-x .tick line').css('stroke', option.axis_x_tick_line);
        $($thisTarget + ' .c3-line').css('stroke-dasharray', '0');
        $($thisTarget + ' .c3-ygrid').css('stroke-dasharray', option.dasharrayY);
        $($thisTarget + ' .c3-xgrid').css('stroke-dasharray', option.dasharrayX);
        $($thisTarget + ' .c3-grid line').css('stroke', option.gridLineColor);
        $($thisTarget + ' .c3-axis-y text').css({'font-size': option.axis_y_font_size, 'fill': option.axis_y_font_color});
        $($thisTarget + ' .c3-axis-x text').css({'font-size': option.axis_x_font_size, 'fill': option.axis_x_font_color});
    },
    data: {
        x : $dataLabel,
        columns: [option.data, option.yAxis[0]],
        type: option.type,
        regions: {
            [$yAxisLabel]: [{
                'start' : option.regions_start,
                'end': option.regions_end,
                'style': option.regions_style
            }, {
                'start': option.regions_start_2,
                'end': option.regions_end_2
            }]
        },
        labels: option.label
    },
    axis: {
        x: {
            type: 'category',
            tick: {
              centered: option.axis_x_tick_center,
              outer: option.axis_x_outer
            }
        },
        y: {
            max: option.axis_y_max,
            min: option.axis_y_min,
            tick: {
                count: option.axis_y_count,
                outer: option.axis_y_outer,
                format: function (d) { return Math.round(d); }
            },
            padding: {top:0, bottom:0}
        }
    },
    tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            return option.tooltip_custom;
        },
        show: option.tooltip
    },
    grid: {
        y: {
            show: option.y_grid
        },
        x: {
            show: option.x_grid
        },
        focus: {
            show: option.focusLine
        }
    },
    point: {
        r: option.pointRad,
        focus: {
            expand: {
                enabled: option.pointExpand,
                r: option.pointRad * option.pointExpandRate
            }
        }
    },
    color: {
        pattern: option.colorPattern
    },
    legend: {
      show: option.legend
    }
});

var yDataFormatList = [];
for (var k = 0; k < option.yAxis.length; k++){
    yDataFormatList[k] = $yAxisLabel[k];
}

var yDataArr=[];
yDataArr[0]=option.data;
for (var j = 0; j < option.yAxis.length; j++){
    yDataArr[j+1] =option.yAxis[j];
}

chart.load({
    columns: yDataArr
});
