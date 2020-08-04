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

let margin = {...margins};

let width = screenSize;
let height = initHeight - margin.top - margin.bottom;

$: height = ((initHeight / wRatio) * screenSize) - margin.top - margin.bottom;

// $: drawChart(screenSize);
$: drawChart(points);

let cWidth;
$: drawChart(cWidth);

let xTicks = [];
let tmpDate;

function drawChart() {
	
	// remove all of the elements from chart
	d3.selectAll(".line-chart > *").remove();

	// set the width of the chart (svg)
	width = screenSize;

	let ticksAmount = 8;

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
		.nice(8);

		// grid lines for the chart
	let linesYaxis = d3.axisLeft(yScale)
		.tickFormat("");

	// add grid lines
	svg.append("g")
		.attr("class", "grid")
		.call(linesYaxis.ticks(ticksAmount))
		.select('.domain').remove();

	d3.selectAll("line").attr("x1", "60").attr("x2", width - 15);

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
		.call(yAxis.ticks(ticksAmount)).attr("dx", "0")
		.select(".domain").remove();

	d3.selectAll("text").attr("x", "45").style("fill", "#666666");
	
	let xScaleWidth = 0;
	xScaleWidth = reportPeriod.length === 37 ? width - 75 : width - margin.right;
	
	// creates the xScale 
	let xScale = d3.scaleLinear()
		.domain([0, reportPeriod.length])
		.range([0, xScaleWidth]);
	
	// set ticks
	let tickVals = [];
	tickVals = reportPeriod.map((e,i) => {
		return i;
	});

	// create first x axis for month
	let xAxis = d3.axisBottom(xScale)
		.ticks(reportPeriod.length)
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
	// shift the x axis over to the right
	let xShift = 10 + margin.left;
	let yShift = height;
	svg.append("g")
		.attr("class", "x-axis-ticks")
		.attr("transform", "translate(" + xShift + "," + yShift + ")")
		.call(xAxis)
		.select(".domain").remove();

	// format the first axis for months
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
	let xAxisTwo = d3.axisBottom(xScale)
		.ticks(reportPeriod.length)
		.tickValues(tickVals)
		.tickFormat(function(d,i) {
			if (reportPeriod[i].includes('<br>')) {
				let tempArr = reportPeriod[i].split('<br>');
				return formatLastTickYear(tempArr[1]);
			} 
			else if (i == reportPeriod.length - 1) {
				return formatLastTickYear(reportYear);
			}
			else {
				return "";
			}
		});

	// append the second axis
	svg.append("g")
		.attr("class", "x-axis-ticks-two")
		.attr("transform", "translate(" + xShift + "," + yShift + ")")
		.call(xAxisTwo)
		.select(".domain").remove();


	d3.selectAll('.x-axis-ticks-two > .tick > text').each(function (d, i) {
		if (reportPeriod[i].includes('<br>') || reportPeriod.length === i+1) {
			d3.select(this).attr('y', 18).style("fill", "#666666");
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
		.attr("transform", "translate(" + 70 + "," + 0 + ")")
		.attr("d", lineOne);

	let x = d3.scaleLinear()
		.domain([0, reportPeriod.length])
		.range([0, xScaleWidth]);

	let y = d3.scaleLinear()
		.domain([maxHeight, 0])
		.range([0, height])
		.nice(8);

	// Data line and dots group
    var lineAndDots = svg.append("g")
    	.attr("class", "line-and-dots")
		.attr("transform", "translate(70,0)");
		
	// Data dots
    lineAndDots.selectAll("line-circle")
    	.data(data)
    	.enter().append("circle")
        .attr("class", "data-circle")
		.attr("r", 4)
		.attr('data-type', 'sale')
		.attr("fill", primary_fill_color)
		.attr("cx", function(d, e) { return x(e); })
		.attr("cy", function(d, e) { return y(d); })
		.on("mouseover", handleMouseOver)
        .on("mouseleave", handleMouseOut);


	// second line
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
			.attr("transform", "translate(" + 70 + "," + 0 + ")")
			.attr("d", lineTwo);

		// Data line and dots group
    let lineAndDotsTwo = svg.append("g")
    	.attr("class", "line-and-dots")
		.attr("transform", "translate(70,0)");
		
	// Data dots
    lineAndDotsTwo.selectAll("line-circle")
    	.data(dataTwo)
    	.enter().append("circle")
        .attr("class", "data-circle")
		.attr("r", 4)
		.attr("fill", secondary_fill_color)
		.attr("cx", function(d, e) { return x(e); })
		.attr("cy", function(d, e) { return y(d); })
		.on("mouseover", handleMouseOver)
        .on("mouseleave", handleMouseOut);
	}

}

// create event handlers for mouse
function handleMouseOver(d, i, e) {  // Add interactivity
	let saleSold = this.dataset.type;
	let xCoord = d3.event.pageX;
	let yCoord = d3.event.clientY - 15;

	showToolTip(i, xCoord, yCoord, d, saleSold);

}

	// mouse out
	function handleMouseOut(d, i) {
	hideToolTip();
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
	drawChart();
});

afterUpdate(() => {
	// if(points.length > 0) {
	// 	drawChart();
	// }
});

// desc ID
let desc;

let tickSplits;
export let monthYear = '';
let month;
$:month = monthYear.month;

let year;
$:year = monthYear.year;

const months = {
	'Jan': "January",
	'Feb': 'February',
	'Mar': 'March',
	'Apr': 'April',
	'May': 'May',
	'Jun': 'June',
	'Jul': 'July',
	'Aug': 'August',
	'Sep': 'September',
	'Oct': 'October',
	'Nov': 'November',
	'Dec': 'December'
};


let currentYear;
let ttReportPeriodData = [];
let fullMonth;
$: ttReportPeriodData = reportPeriod.map((rp) => {
	if (rp.includes('<br>')) {
		let chunks = rp.split('<br>');
		currentYear = chunks[1];
		fullMonth = months[chunks[0]];
	} else {
		fullMonth = months[rp];
	}

	return fullMonth + ' ' + currentYear;
});

// show tool tip
function showToolTip(i, leftX, topY, point, dataType) {

	desc = document.getElementById('desc');
	desc.style.display = 'block';
	leftX += 'px';
	topY = (topY - 70) + 'px';
	desc.style.left = leftX;
	desc.style.top = topY;
	let date = ttReportPeriodData[i];

	let py = point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let hoverDate = date ;
	let units = py;

	let unitsSuffix = 'units';
	
	if (chartType === 'spOpRatio') {
		unitsSuffix = '%';
	} else if (chartType === 'fsldMsi')  {
		unitsSuffix = 'months';
	} else if (chartType === 'saleMedianSoldMedian') {
		unitsSuffix = "(" + dataType + ")";
	}

	units = py + ' ' + unitsSuffix;
	
	if (showDollar) {
		units = dollar + py;
	}

	let pDateHover = document.getElementById('date-hover');
	let pUnitHover = document.getElementById('unit-hover');
	pDateHover.innerHTML = date;
	pUnitHover.innerHTML = units;
}

// hid tool tip 
function hideToolTip() {
	desc = document.querySelector('.description');
	desc.style.display = "none";
}

</script>

<style>
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		margin-left: 10px;
	}

	.description {
		pointer-events: none;
		position: fixed;
		font-size: 10px;
		text-align: center;
		background: #F2F2F2;
		z-index: 9999;
		line-height: 15px;
		width: 90px;
		color: #000000;
		border-radius: 5px;
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		display: none;
		vertical-align: middle;
	}

	.description:after {
		content: "";
		position: absolute;
		left: 50%;
		top: 100%;
		width: 0;
		height: 0;
		margin-left: -10px;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid rgb(179, 179, 179);
	}

	.heyo:hover {
		fill: #ffabce;
		-moz-transition: 0.3s;
		-o-transition: 0.3s;
		-webkit-transition: 0.3s;
		transition: 0.3s; 
	}

 	@media only screen and (max-width: 450px) {
		.description.active {
			font-size: 10px;
			padding-left: 2 !important;
			padding-right: 2 !important;
			min-width: 50px;
		}
 	} 

</style>

<div class="chart" bind:clientWidth={cWidth}>
	<svg class="line-chart"></svg>
</div>

<div class="description" id='desc'><p id='date-hover'></p><p id='unit-hover'></p></div>