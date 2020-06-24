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

let points = [];
$: points = [...data];
$: drawChart(points);
let margin = {top: 35, right: 20, bottom: 35, left: 60};

let width = 1048 - margin.left - margin.right;
let height = 575 - margin.top - margin.bottom;

$: width = ((1048 / 1068) * screenSize) - 222 - margin.left - margin.right;
$: height = ((575 / 1068) * screenSize) - 250 - margin.top - margin.bottom;

$: drawChart(width);
let xTicks = [];
let tmpDate;

function drawChart() {

	let svg = d3.select(".line-chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom) 
			.append("g")
    		.attr("transform", "translate(" + 0 + "," + margin.top + ")");

	// set the max height of the ticks
	let maxHeight = d3.max(data, function(d){ return d * 1.1 });

	// creates the yScale
	let yScale = d3.scaleLinear()
		.domain([maxHeight, 0])
		.range([0, height])
		.nice(8);

		// grid lines for the chart
	let linesYaxis = d3.axisLeft(yScale)
		.ticks(8)
		.tickFormat("");

	// add grid lines
	svg.append("g")
		.attr("class", "grid")
		.call(linesYaxis)
		.select('.domain').remove();

	d3.selectAll("line").attr("x1", "60").attr("x2", width + margin.right + 15);

	let ticksAmount = 8;

	// defines the y axis styles
	let yAxis = d3.axisLeft(yScale)
		.scale(yScale)
		.tickSize("30")
		.tickPadding(8)
		.ticks(ticksAmount)
		.tickFormat(function(d) { return formatYvalue(d); });

	// append y axis
	svg.append("g")
		.attr('class', "med-axis-tick-mark")
		.attr("x", "0")
		.attr("x1", "0")
		.attr("x2", "0")
		.call(yAxis).attr("dx", "0")
		.select(".domain").remove();

	d3.selectAll("text").attr("x", "45").style("fill", "#666666");

	// creates the xScale 
	let xScale = d3.scaleLinear()
		.domain([0, reportPeriod.length])
		.range([0, width - 60]);
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
	let xShift = 15 + margin.left;
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

	// create second x axis for year
	// let xAxisTwo = d3.axisBottom(xScale)
	// 	.tickValues(reportPeriod)
	// 	.tickFormat(function(d,i) {
	// 		console.log(d,i)
	// 		if (reportPeriod[i].includes('<br>')) {
	// 			let tempArr = reportPeriod[i].split('<br>');
	// 			return formatLastTickYear(tempArr[1]);
	// 		} 
	// 		else if (i == reportPeriod.length - 1) {
	// 			return formatLastTickYear(reportYear);
	// 		}
	// 		else {
	// 			return "";
	// 		}
	// 	});

	// // // append the second axis
	// svg.append("g")
	// 	.attr("class", "x-axis-ticks-two")
	// 	.attr("transform", "translate(" + xShift + "," + yShift + ")")
	// 	.call(xAxisTwo)
	// 	.select(".domain").remove();


	// d3.selectAll('.x-axis-ticks-two > .tick > text').each(function (d, i) {
	// 	if (reportPeriod[i].includes('<br>') || reportPeriod.length === i+1) {
	// 		d3.select(this).attr('y', 18).style("fill", "#666666");
	// 	}
	// });

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
		.attr("transform", "translate(" + 75 + "," + 0 + ")")
		.attr("d", lineOne);

	
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
			.attr("transform", "translate(" + 75 + "," + 0 + ")")
			.attr("d", lineTwo);
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
		d3.selectAll(".line-chart > *").remove();	
		drawChart();
	}
});

</script>

<style>
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		margin-left: 10px;
	}

</style>

<div class="chart" >
	<svg class="line-chart border-violet"></svg>
</div>