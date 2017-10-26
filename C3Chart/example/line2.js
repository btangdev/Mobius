var chart = c3.generate({
    bindto: '.line2',
    size: {
        height: 360,
        width: 800
    },
    onrendered: function() {
        d3.selectAll('.c3-texts-data-11 .c3-text').each(function(d) {
            if ( d == undefined ) return;
            if ( d.value > 4000 ){ 
                $('.c3-texts-data-11.c3-texts .c3-text-' + d.index).css('transform','translate(0, -5px)');
            }else{
                $('.c3-texts-data-11.c3-texts .c3-text-' + d.index).css('transform','translate(0, 25px)');
            }
        });
        
        this.getCircles().style({'fill':'#fff', 'stroke':'#1F2530'});
    },
    data: {
        x : 'x',
        columns: [
            ['x', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            ['data-11', 2800, 3400, 1100, 5600, 6800, 3400, 7000],
            ['data-12', 1800, 3000, 2100, 7000, 6000, 4400, 6000]
        ],
        type: 'line',
        types:{
          'data-12':'bar'  
        },
        labels: {
            format: {
                'data-11': d3.format(''),
                'data-12': function(d, id, i, j){
                    console.log(d);
                    console.log(id);
                }
            }
        },
        colors: {
            'data-11':'#fff',
            'data-12':'#1F2530'
        }
    },
    axis: {
        x: {
            type: 'category',
            tick: {
              centered: true,
              outer: false,
              count: 4
            }
        },
        y: {
            max: 8000,
            min: 0,
            tick: {count:5},
            padding: {top:0, bottom:0}
        }
    },
    tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            console.log(color);
            return "<div class='tooltip-custom'>최소 3,000 ~ 최대 8,000이상<br>전년비 <span>6%</span></div>"
        }
    },
    grid: {
        y: {
            show:true
        },
        x: {
            show: false
        }
    },
    point: {
        r: 3,
        focus: {
            expand: {
                enabled: true,
                r:5
            }
        }
    },
    color: {
        pattern: ['crimson', '#1F2530']
    },
    legend: {
      hide: true
    }
});