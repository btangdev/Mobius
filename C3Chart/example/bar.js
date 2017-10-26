var chart = c3.generate({
bindto: '.bar',
size: {
    height: 200,
    width: 800
},
onrendered: function() {
    d3.selectAll('.c3-text').each(function(d) {
        if ( d == undefined ) return;
        getTextState('inner', d);
        getTextState('outer', d);
        $('.c3-texts .c3-text-' + d.index).css('transform','translate(0, 0px)');
    });
    
    function getTextState(state, d){
        if ( $('.c3-texts-' + state + ' .c3-text-' + d.index).text() == 0 ) $('.c3-texts-' + state + ' .c3-text-' + d.index).text('');
    }
},
data: {
    x : 'x',
    columns: [
        ["x", "'16 7월", "'16 8월", "'16 9월", "'16 10월", "'16 11월", "'16 12월", "'17 1월"],
        ['inner', 6, 4, 2, 2, 0, 8, 8], 
        ['outer', 2, 2, 6, 0, 0, 0, 4]
    ],
    type: 'bar',
    labels: true,
    colors: {
        'inner': 'dodgerblue',
        'outer': 'darkgray'
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
        max: 10,
        min: 0,
        tick: {
            count: 5,
            // format: d3.format('d') // 정수만 표현
            format: function (d) { return Math.round(d); }
        },
        padding: {top:0, bottom:0}
    }
},
bar:{
   width: {
       ratio: 0.5
   }
},
tooltip: {
    show: false
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
    pattern: ['dodgerblue', 'darkgray']
},
legend: {
  hide: true
}
});