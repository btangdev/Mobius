var chart = c3.generate({
    bindto: '.line',
    size: {
        height: 360,
        width: 800
    },
    onrendered: function() {
        d3.selectAll('.c3-texts-lineData .c3-text').each(function(d) {
            if ( d == undefined ){
                return;
            }else{
                if ( d.value > 4700 ){ 
                    $('.c3-texts-lineData.c3-texts .c3-text-' + d.index).css('transform','translate(0, 25px)');
                }else{
                    $('.c3-texts-lineData.c3-texts .c3-text-' + d.index).css('transform','translate(0, -5px)');
                }
            }
        });
        
        this.getCircles().style({'fill':'#fff', 'stroke':'dodgerblue'});
    },
    data: {
        x : 'date',
        columns: [
            ['date', '사원', '주임', '대리', '과장', '차장', '부장', '임원'],
            ['lineData', 2800, 3400, 4000, 4800, 5600, 6400, 7600]
        ],
        type: 'line',
        regions: {
          'lineData': [{
            'start': 1,
            'end': 2,
            'style': 'stroke'
          }, {
            'start': 4
          }]
        },
        labels: {
            show: true
        }
        /* point color array 
        color: function(color, d){
             return arr[d.index];
         }*/
    },
    axis: {
        x: {
            type: 'category',
            tick: {
              centered: true,
              outer: false
            }
        },
        y: {
            max: 8000,
            min: 0,
            tick: {count:7},
            padding: {top:0, bottom:0}
        }
    },
    tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
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
        r: 4,
        focus: {
            expand: {
                enabled: false
            }
        }
    },
    color: {
        pattern: ['dodgerblue']
    },
    legend: {
      hide: true
    }
});