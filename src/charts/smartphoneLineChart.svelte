<script>
import * as d3 from 'd3';
import { onMount, afterUpdate } from 'svelte';

export let data = [];
export let dataTwo = [];
export let reportPeriod = [];
export let reportYear;
// export let yData = '';
export let yPoints;
// y Tick marks
$: yTicks = yPoints;

export let mappedPoints = [];
export let mappedPointsTwo = [];
export let chartType = '';

// primary color prop
export let p_color = false;
export let s_color = false;

// primary color
let primary_fill_color = '';
let secondary_fill_color = '';
$: primary_fill_color = p_color ? p_color : '#019184';
$: secondary_fill_color = s_color ? s_color :' #666666';

export let showDollar;
$: dollar = showDollar ? '$' : '';

export let screenSize;
export let initHeight;
export let initWidth;
export let margins;
export let wRatio;
export let radius;

let points = [];
$: points = [...data];
$: drawChart(points);
let margin = {...margins};

let width = screenSize;
let height = initHeight - margin.top - margin.bottom;

$: height = ((initHeight / wRatio) * screenSize) - margin.top - margin.bottom;

$: drawChart(width);
let xTicks = [];
let tmpDate;

function drawChart() {
	width = screenSize;

   	d3.selectAll(".line-chart > *").remove();

	let svg = d3.select(".line-chart")
			.attr("width", width)
			.attr("height", height + margin.top + margin.bottom) 
			.append("g")
    		.attr("transform", "translate(" + 0 + "," + margin.top + ")");

	// set the max height of the ticks
	let maxHeight = d3.max(data, function(d){ return d * 1.1 });

	// creates the yScale
	let yScale = d3.scaleLinear()
		.domain([maxHeight, 0])
		.range([0, height])
		.nice(4);

		// grid lines for the chart
	let linesYaxis = d3.axisLeft(yScale)
		.tickFormat("");

	// add grid lines
	svg.append("g")
		.attr("class", "grid")
		.call(linesYaxis.ticks(4))
		.select('.domain').remove();

	
	d3.selectAll("line").attr("x1", "45").attr("x2", width - 15);

	let ticksAmount = 4;

	// defines the y axis styles
	let yAxis = d3.axisLeft(yScale)
		.scale(yScale)
		.tickSize("30")
		.tickPadding(8)
		.tickFormat(function(d) { return formatYvalue(d); });

	// append y axis
	svg.append("g")
		.attr('class', "med-axis-tick-mark")
		.attr("x", "0")
		.attr("x1", "0")
		.attr("x2", "0")
		.call(yAxis.ticks(4)).attr("dx", "0")
		.select(".domain").remove();

	// set the axis from the left edge
	d3.selectAll("text").attr("x", "35").style("fill", "#666666");
	
	let xScaleWidth = width - 30 - margin.right;
	if (reportPeriod.length === 37) {
		xScaleWidth -= 15;
	}
	// creates the xScale 
	let xScale = d3.scaleLinear()
		.domain([0, reportPeriod.length])
		.range([0, xScaleWidth]);
	let tickVals = [];
	tickVals = reportPeriod.map((e,i) => {
		return i;
	});

	// create first x axis for month
	let xAxis = d3.axisBottom(xScale)
		.tickValues(tickVals)
		.tickFormat(function(d, i) {
			if (reportPeriod[d].includes('<br>')) {
				let tempArr = reportPeriod[d].split('<br>');
				return d3.timeFormat(tempArr[0]);
			} 
			else if (d == reportPeriod.length - 1) {
				return reportPeriod[reportPeriod.length - 1];
			}
		});

	// append the first axis
	let xShift = 30 + margin.left;
	let yShift = height;
	svg.append("g")
		.attr("class", "x-axis-ticks")
		.attr("transform", "translate(" + xShift + "," + yShift + ")")
		.call(xAxis)
		.select(".domain").remove();

	// format the first axis
	d3.selectAll('.x-axis-ticks > .tick > text').each(function (d, i) {
		if (reportPeriod[d].includes('<br>')) {
				d3.select(this).attr('y', 8).style("fill", "#666666");
			}
	});

	d3.selectAll('.x-axis-ticks > .tick > line')
		.each(function (d, i) {
			if (reportPeriod[d].includes('<br>')) {
				d3.select(this).attr('y2', -height -10);
			} 
			
			else if (d == reportPeriod.length - 1) {
				d3.select(this).attr('y2', -height -10);
			}

			else {
				d3.select(this).attr('y2', "10");
			}
		});

		// line function convention (feeds an array)
	let lineOne = d3.line()
		.x(function(d) { return xScale(d.x); })
		.y(function(d) { return yScale(d.y); });

	 // Add the line.
  	svg.append("path")
		.data([mappedPoints])
		.attr("class", "line")
		.style("fill", "none")
		.style("stroke", primary_fill_color)
		.attr("transform", "translate(" + xShift + "," + 0 + ")")
		.attr("d", lineOne);

	let x = d3.scaleLinear()
		.domain([0, reportPeriod.length])
		.range([0, xScaleWidth]);

	let y = d3.scaleLinear()
		.domain([maxHeight, 0])
		.range([0, height])
		.nice(4);
	
	// Data line and dots group
    let lineAndDots = svg.append("g")
    	.attr("class", "line-and-dots")
		.attr("transform", "translate(" + xShift + "," + 0 + ")");
		
	// Data dots
    lineAndDots.selectAll("line-circle")
    	.data(data)
    	.enter().append("circle")
        .attr("class", "data-circle")
		.attr("r", radius)
		.attr("fill", primary_fill_color)
		.attr("cx", function(d, e) { return x(e); })
        .attr("cy", function(d, e) { return y(d); });

	if (dataTwo.length > 0) {
		let lineTwo = d3.line()
		.x(function(d) { return xScale(d.x); })
		.y(function(d) { return yScale(d.y); });

		// Add the line.
		svg.append("path")
			.data([mappedPointsTwo])
			.attr("class", "line")
			.style("fill", "none")
			.style("stroke", secondary_fill_color)
			.attr("transform", "translate(" + xShift + "," + 0 + ")")
			.attr("d", lineTwo);

		// Data line and dots group
		let lineAndDotsTwo = svg.append("g")
			.attr("class", "line-and-dots")
			.attr("transform", "translate(" + xShift + "," + 0 + ")");
			
		// Data dots
		lineAndDotsTwo.selectAll("line-circle")
			.data(dataTwo)
			.enter().append("circle")
			.attr("class", "data-circle")
			.attr("r", radius)
			.attr("fill", secondary_fill_color)
			.attr("cx", function(d, e) { return x(e); })
			.attr("cy", function(d, e) { return y(d); });
	}

}

function formatLastTickYear(tick) {
	return reportYear.replace('20', " '");
}

// format y value ticks
function formatYvalue(d) {
	let val = Math.abs(d);

	let flag = 0;
	let yValue = '';

	if(d < 0) {
		flag = 1;
	}

	if (val < 1000) {
		yValue = val;
	}

	// if the val gte 1,000 and lt 1,000,000
	if(val >= 1000 && val < 1000000) {
		val /= 1000;
		yValue = val.toString();
		yValue = dollar + yValue + 'K';
	}

	// if the val gte 1,000,000 and lt 1,000,000,000
	if(val >= 1000000 && val < 1000000000) {
		val /= 1000000;
		yValue = val.toString();
		yValue = dollar + yValue + 'M';
	}

	// if the val gte 1,000,000,000 and lt 1,000,000,000,000
	if(val >= 1000000000 && val < 1000000000000) {
		val /= 1000000000;
		yValue = val.toString();
		yValue = dollar + yValue + 'B';
	}
	
	if(flag) {
		yValue = "(" + yValue + ")";
	}

	return yValue;
}

onMount(() => {
	// drawChart();
});

afterUpdate(() => {
	if(points.length > 0) {
		drawChart();
	}
});

</script>

<style>
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
	}

</style>

<div class="chart" >
	<svg class="line-chart"></svg>
</div>