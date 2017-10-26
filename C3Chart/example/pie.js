var w = 300;
var h = 250;
var r = Math.min(w, h) / 2;
var labelr = r * 1.2;
var arc = d3.svg.arc().innerRadius(r * .6).outerRadius(r);

var chart = c3.generate({
    bindto: '.pie',
    size: {
        height: h+50,
        width: 800
    },
    onrendered: function(d, i) {
        d3.selectAll('.pie .c3-shapes').attr('transform','translate(0,0)');
        d3.selectAll('.pie .c3-chart-arc text').attr("dy", "0em")
        
        d3.selectAll('.pie .c3-chart-arc')
            .append('text')
            .attr({'class':'legendLabel2'})
            .attr("transform", function(d) {
                var c = arc.centroid(d);
                var x = c[0];
                var y = c[1];
                var h = Math.sqrt( x * x + y * y );
                return "translate(" + (x / h * labelr) +  ',' + (y / h * labelr) +  ")"; 
            })
            .attr("dy", "0.35em")
            .attr("text-anchor", function(d) {
                return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";
            })
            .text(function(d){ return d.data.id; })
    },
    data: {
        columns: [
            ['3,000미만', 445], 
            ['3,000~4,000', 340],
            ['4,000~5,000', 220],
            ['5,000이상', 189]
        ],
        type: 'pie'
    },
    donut:{
        title: '34 ~ 39세',
        label: {
            show: true
        },
        expand: false
    },
    tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            return "<div class='tooltip-custom'>" + d[0].value + "명</div>"
        }
    },
    legend: {
      hide: true,
      position: 'inset'
    },
    color: {
        pattern: ['#93C2C6','#FF758F','#A18C99','#EDCEDF']
    }
});