(function( $ ){
    $.defaultOptions = {
        data: ['data', '3,000미만', '3,000~4,000', '4,000~5,000', '5,000~7,000', '7,000 이상'],
        yAxis: [['donutData-0', 600], ['donutData-1', 800], ['donutData-2', 300], ['donutData-3', 80], ['donutData-4', 60]],
        svgWidth: 960,
        svgHeight: 400,
        svgBackgroundColor: '#f8f8f8',
        label: false,
        colorPattern: ['skyblue','#61c3af','#359aff','#f3bb34', '#fa6048'],
        legend: false,
        // tooltip_custom: "<div class='tooltip-custom'>최소 5,000 ~ 최대 10,000이상<br>전년비 <span>6%</span></div>",
        tooltip: true,
        dataLabelColor: "#000",
        dataLabelFontSize: '14',
        labelPosition: false,
        format: '%'
    }
    
    $.fn.donut = function( options ){
        options = $.extend( null, $.defaultOptions, options );

        this.each(function( index ){
            var $target = $(this);
            var $thisTarget = '.'+$target.attr('class');

            var $svg = $target.find('svg')[0];
            var yDataArr=[];
            yDataArr[0]=options.data;
            for (var j = 0; j < options.yAxis.length; j++){
                yDataArr[j+1] =options.yAxis[j];
            }
            
            var chart = c3.generate({
                interaction: {
                    enabled: false
                },
                bindto: $thisTarget,
                size: {
                    width: options.svgWidth,
                    height: options.svgHeight
                },
                oninit: function() {
                    var radius = Math.min(options.svgWidth, options.svgHeight) / 2;
                    var section = 'g.c3-chart-arc.c3-target.c3-target-donutData-';

                    $target.css('background-color',options.svgBackgroundColor);
                    for ( var i = 0; i < options.colorPattern.length; i++ ){
                        d3.select('svg').select(section+i)
                            .append('text')
                            .attr('class','pieLabel')  
                            .style('font-size','14')
                            .attr("x", function(d) {
                                var angle = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
                                d.cx = Math.cos(angle) * (radius - 25);
                                return d.x = Math.cos(angle) * (radius + 40) -30;
                            })
                            .attr("y", function(d) {
                                var angle = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
                                d.cy = Math.sin(angle) * (radius - 50);
                                return d.y = Math.sin(angle) * (radius) + 5;
                            })
                            .text(options.data[i+1])
                            .each(function(d) {                                 
                                var bbox = this.getBBox();
                                d.sx = d.x - bbox.width/2 + 30;
                                d.ox = d.x + bbox.width/2 - 5 ;
                                d.sy = d.oy = d.y - 5;
                            });
                            
                            d3.select('svg').select(section+i)
                                .append("path")
                                .attr("class", "labelPointer")
                                .style("fill", "none")
                                .style("stroke", "none")
                                .attr("d", function(d) {
                                    if(d.cx > d.ox) {
                                        return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
                                    } else {
                                        return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
                                    }
                                });
                    }
                },
                onrendered: function() {
                    var pie = d3.select('g.c3-chart-arcs')
                    var translate = d3.select('g.c3-chart-arcs').attr('transform');
                    var isDataView = null;
                    var section = 'g.c3-chart-arc.c3-target.c3-target-pieData-';
                    
                    pie.attr('transform',translate + ' scale(0.85)');

                    for ( var i = 0; i < options.colorPattern.length; i++ ){
                            isDataView = $($thisTarget + ' ' + section + i).find('text').first().text();
                            if (isDataView === '') {
                                var dx = $($thisTarget + ' '+ section + i).find('text.pieLabel').attr('x');
                                d3.select('svg').select(section + i + ' text.pieLabel').attr('x', Number(dx)-70);

                                d3.select('svg').select(section + i + ' path.labelPointer')
                                    .style("stroke", "gray")
                                    .attr("d", function(d) {
                                        return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
                                        // if(d.cx > d.ox) {
                                        //     return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
                                        // } else {
                                        //     return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
                                        // }
                                    });
                            }
                    }
                },
                data: {
                    columns: yDataArr,
                    type: 'donut',
                    labels: options.label,
                    order: null
                },
                tooltip: {
                    contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                        return "<div class='tooltip-custom'><span>"+d[0].value+"명</span></div>"
                    },
                    show: options.tooltip
                },
                color: {
                    pattern: options.colorPattern
                },
                legend: {
                    show: options.legend
                }
            });
           
        });
    };
    return this;
})(jQuery);



