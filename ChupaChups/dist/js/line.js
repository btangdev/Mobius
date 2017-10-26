(function( $ ){
    $.defaultOptions = {
        data: [],
        yAxis: [],
        svgWidth: 800,
        svgHeight: 360,
        svgBackgroundColor: '#fff',
        dataLabelDiv: 4000,
        dataLabel_up: 25,
        dataLabel_down: -5,
        label: true,
        pointFillColor: '#fff',
        pointStrokeColor: 'dodgerblue',
        pointRad: 10,
        pointExpand: false,
        pointExpandRate: 1.75,
        colorPattern: [],
        x_grid: false,
        y_grid: false,
        legend: false,
        regions_start: 0,
        regions_end: 0,
        regions_start_2: 0,
        regions_end_2: 0,
        regions_style: 'dashed',
        focusLine: false,
        axis_x_tick_center: true,
        axis_x_outer: true,
        axis_y_outer: true,
        axis_y_count: 4,
        axis_y_max: 0,
        axis_y_min: 0,
        tooltip_custom: "",
        tooltip: true,
        dataLabelColor: "",
        dataLabelFontSize: '',
        axis_y_color: '',
        axis_x_color: '',
        dasharrayX: '',
        dasharrayY: '',
        gridLineColor: '',
        axis_y_font_size: '',
        axis_y_font_color: '',
        axis_x_font_size: '',
        axis_x_font_color: '',
        axis_x_positionY: 9,
        axis_y_positionY: 2,
        axis_x_tick_line: '',
        axis_y_tick_line: '',
        labelPosition: false,
        format: '%',
        zeroValue: true,
        rectView: false,
        rectOddColor:'#ddd',
        rectEvenColor:'transparent',
        type: 'line'
    };

    $.fn.line = function( options ){
        options = $.extend( null, $.defaultOptions, options );

        this.each(function( index ){
            var $target = $(this);
            var $thisTarget = '.'+$target.attr('class');
            var $dataLabel = options.data[0];
            var $yAxisLabel = [];

            for ( var i = 0; i < options.yAxis.length; i++ ){
                $yAxisLabel.push(options.yAxis[i][0]);
            }

            $target.css({
                'background-color':options.svgBackgroundColor,
                'padding':'20px',
                'position':'relative',
                'width':options.svgWidth,
                'margin':'0 auto'
            });

            var chart = c3.generate({
                bindto: $thisTarget,
                size: {
                    width: options.svgWidth,
                    height: options.svgHeight
                },
                onrendered: function() {
                    var i = 0;
                    $target.find('svg').css('background-color', options.svgBackgroundColor);
                    if ( options.labelPosition ){
                        for ( i; i < $yAxisLabel.length; i++ ){
                            d3.selectAll('.c3-texts-' + $yAxisLabel[i] + ' .c3-text').each(function(d) {
                                if ( d === undefined ) return;
                                d.value > options.dataLabelDiv ? getDataLabelDiv( d, options.dataLabel_up, i ) : getDataLabelDiv( d, options.dataLabel_down, i );
                            });
                        }
                    }

                    if ( options.zeroValue ){
                        for ( i; i < $yAxisLabel.length; i++ ){
                            d3.selectAll($thisTarget + ' .c3-texts-' + $yAxisLabel[i] + ' .c3-text').each(function(d) {
                                getDataLabelVal(d, i);
                            });
                        }
                    }

                    var rectLength = $($thisTarget).find('.c3-event-rects-single rect').css('fill-opacity', 0.4);

                    if ( options.rectView ){
                        $($thisTarget).find('.c3-event-rects-single rect').each(function(i){
                            var cls = $(this).attr('class').split(' ');
                            var clsNum = cls[cls.length-1];
                            $($thisTarget).find('.c3-event-rects-single rect:odd').attr('fill',options.rectOddColor);
                            $($thisTarget).find('.c3-event-rects-single rect:even').attr('fill',options.rectEvenColor);
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
                            $($thisTarget + ' .c3-texts-' + $yAxisLabel[i] + '.c3-texts .c3-text-' + d.index).text(t + options.format);
                        }
                    }

                    for ( i = 0; i < options.pointStrokeColor.length; i++ ){
                        d3.selectAll( $($thisTarget + ' .c3-target-' + $yAxisLabel[i] + ' circle')).each(function(d){
                            $($thisTarget + ' .c3-target-' + $yAxisLabel[i] + ' circle.c3-circle-'+d.index).css('stroke', options.pointStrokeColor[i]);
                        });
                    }

                    this.getCircles().style({'fill': options.pointFillColor});

                    console.log($thisTarget, "index: ", index);
                    $($thisTarget + ' .c3-texts .c3-text').css({'fill': options.dataLabelColor, 'font-size': options.dataLabelFontSize });
                    $($thisTarget + ' .c3-axis-x path').css('stroke', options.axis_x_color);
                    $($thisTarget + ' .c3-axis-x line').css('stroke', options.axis_x_color);
                    $($thisTarget + ' .c3-axis-y path').css('stroke', options.axis_y_color);
                    $($thisTarget + ' .c3-axis-y line').css('stroke', options.axis_y_color);
                    $($thisTarget + ' .c3-axis-x .tick text').attr('y', options.axis_x_positionY);
                    $($thisTarget + ' .c3-axis-y .tick text').attr('y', options.axis_y_positionY);
                    $($thisTarget + ' .c3-axis-y .tick line').css('stroke', options.axis_y_tick_line);
                    $($thisTarget + ' .c3-axis-x .tick line').css('stroke', options.axis_x_tick_line);
                    $($thisTarget + ' .c3-line').css('stroke-dasharray', '0');
                    $($thisTarget + ' .c3-ygrid').css('stroke-dasharray', options.dasharrayY);
                    $($thisTarget + ' .c3-xgrid').css('stroke-dasharray', options.dasharrayX);
                    $($thisTarget + ' .c3-grid line').css('stroke', options.gridLineColor);
                    $($thisTarget + ' .c3-axis-y text').css({'font-size': options.axis_y_font_size, 'fill': options.axis_y_font_color});
                    $($thisTarget + ' .c3-axis-x text').css({'font-size': options.axis_x_font_size, 'fill': options.axis_x_font_color});
                },
                data: {
                    x : $dataLabel,
                    columns: [options.data, options.yAxis[0]],
                    type: options.type,
                    regions: {
                        [$yAxisLabel]: [{
                            'start' : options.regions_start,
                            'end': options.regions_end,
                            'style': options.regions_style
                        }, {
                            'start': options.regions_start_2,
                            'end': options.regions_end_2
                        }]
                    },
                    labels: options.label
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                          centered: options.axis_x_tick_center,
                          outer: options.axis_x_outer
                        }
                    },
                    y: {
                        max: options.axis_y_max,
                        min: options.axis_y_min,
                        tick: {
                            count: options.axis_y_count,
                            outer: options.axis_y_outer,
                            format: function (d) { return Math.round(d); }
                        },
                        padding: {top:0, bottom:0}
                    }
                },
                tooltip: {
                    contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                        return options.tooltip_custom;
                    },
                    show: options.tooltip
                },
                grid: {
                    y: {
                        show: options.y_grid
                    },
                    x: {
                        show: options.x_grid
                    },
                    focus: {
                        show: options.focusLine
                    }
                },
                point: {
                    r: options.pointRad,
                    focus: {
                        expand: {
                            enabled: options.pointExpand,
                            r: options.pointRad * options.pointExpandRate
                        }
                    }
                },
                color: {
                    pattern: options.colorPattern
                },
                legend: {
                  show: options.legend
                }
            });

            var yDataFormatList = [];
            for (var k = 0; k < options.yAxis.length; k++){
                yDataFormatList[k] = $yAxisLabel[k];
            }

            var yDataArr=[];
            yDataArr[0]=options.data;
            for (var j = 0; j < options.yAxis.length; j++){
                yDataArr[j+1] =options.yAxis[j];
            }

            chart.load({
                columns: yDataArr
            });

        });
    };

    return this;
})(jQuery);
