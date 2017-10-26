var chart = c3.generate({
bindto: '.composite',
size: {
    height: 360,
    width: 800
},
onrendered: function() {
    d3.selectAll('.c3-text').each(function(d) {
        if ( d == undefined ){
            return;
        }else{
            if ( d.value > 0 ){ 
                $('.c3-texts .c3-text-' + d.index).css('transform','translate(0, 25px)');
            }else{
                $('.c3-texts .c3-text-' + d.index).css('transform','translate(0, -5px)');
            }
        }
    });
    this.getCircles().style({'fill':'#fff', 'stroke':'dodgerblue'});
},
data: {
    x : 'x',
    columns: [
        ['x', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
        ['data1', 2800, 3400, 4000, 4800, 5600, 6400, 7700], //avg
        ['data2', 1000, 1200, 2000, 2500, 3000, 3800, 4800], //min 
        ['data3', 3600, 4300, 4200, 4800, 5000, 5200, 6000],  // max
        ['data4', 3200, 3800, 4400, 5600, 6200, 7000, 8000] // 동종업계 avg
    ],
    type: 'line',
    types: {
        'data2': 'bar',
        'data3': 'bar'
    },
    groups: [
        ['data2','data3']
    ],
    labels: {
        format: {
            data1: d3.format('')
        }
    }
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
        max: 10000,
        min: 0,
        tick: {
            count: 8,
            // format: d3.format('d') // 정수만 표현
            format: function (d) { return Math.round(d); }
        },
        padding: {top:0, bottom:0}
    }
},
bar:{
   width: {
       ratio: 0.35
   }
},
tooltip: {
    contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
        return "<div class='tooltip-custom'>최소 3,000 ~ 최대 8,000이상<br>전년비 <span>6%</span></div>"
    }
},
grid: {
    lines: {
        front: true
    },
    y: {
        show:true
    },
    x: {
        show: false
    },
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
    pattern: ['dodgerblue', 'transparent', '#f1f1f1', 'darkgray']
},
legend: {
  hide: true
}
});