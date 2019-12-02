<script>
import * as d3 from 'd3';
import { onMount, afterUpdate } from 'svelte';

// report period props
export let reportPeriod;
// chart data prop
export let data = [];
export let yPoints;

$: yTicks = yPoints;

// primary color prop
export let p_color;

// mapped points
export let mappedPoints = [];
let MDataJSON = false;
// chart and misc dimensions
let margin = { top: 45, right: 15, bottom: 55, left: 45 };
let width = 1280;
let height = 760;
let textWidth = 600;
let rp = '';
let rawDate;
let rpList;
let year;

$: mappedData = data.map((d, i) => {
    rawDate = reportPeriod[i];
    if (rawDate.includes('<br>')) {
        rpList = rawDate.split('<br>');
        year = rpList[1].replace('20', '');
        rp = rpList[0] + "-" + year;
    } else {
        rp = rawDate + "-" + year;
    }
    
    let dPoint = parseFloat(d);
    return {date:rp, value:parseFloat(d)}
});

$: console.log(MDataJSON);
var svg = d3.select("svg");

$: parseTime = d3.timeParse("%Y");
$: bisectDate = d3.bisector(function(d) { return d.year; }).left;

$: x = d3.scaleTime().range([0, width]);
$: y = d3.scaleLinear().range([height, 0]);

$: line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

$: g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

onMount(() => {
    MDataJSON = mappedData;
    console.log('on mount');
    drawChart(MDataJSON);
});

afterUpdate(() => {
    MDataJSON = mappedData;
    console.log('after update');
    drawChart(MDataJSON);
});

function drawChart(JSONdata) {
    
if (JSONdata && JSONdata.length > 2) {
    console.log(JSONdata);
    console.log(JSONdata.length);
    d3.json(JSONdata, function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
        d.year = parseTime(d.year);
        d.value = +d.value;
        });

        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain([d3.min(data, function(d) { return d.value; }) / 1.005, d3.max(data, function(d) { return d.value; }) * 1.005]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
        .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("fill", "#5D6971")
            .text("Population)");

        g.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        var focus = g.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        focus.append("circle")
            .attr("r", 7.5);

        focus.append("text")
            .attr("x", 15)
            .attr("dy", ".31em");

        svg.append("rect")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
        focus.select("text").text(function() { return d.value; });
        focus.select(".x-hover-line").attr("y2", height - y(d.value));
        focus.select(".y-hover-line").attr("x2", width + width);
        }
    });
}
}



</script>


<style>
body {
  background-color: #F1F3F3    
}
.axis {
	font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #D4D8DA;
  stroke-width: 2px;
  shape-rendering: crispEdges;
}

.line {
  fill: none;
  stroke: #6F257F;
  stroke-width: 5px;
}

.overlay {
  fill: none;
  pointer-events: all;
}

.focus circle {
  fill: #F1F3F3;
  stroke: #6F257F;
  stroke-width: 5px;
}
  
.hover-line {
  stroke: #6F257F;
  stroke-width: 2px;
  stroke-dasharray: 3,3;
}

</style>

<svg width="960" height="500"></svg>


