import * as d3 from 'd3';
import { formatLastTickYear, formatYvalue } from './lineChartTicks';

export function lineChartGen(options) {

	// return;
    let data = options.data;
    let dataTwo = options.dataTwo;
    let reportPeriod = options.reportPeriod;
    let reportYear = options.reportYear;
    let yTicks = options.yPionts;

    let mappedPoints = options.mappedPointsTwo;
    let mappedPointsTwo = options.mappedPointsTwo;
    let chartType = options.chartType;

    // primary color prop
    let p_color = options.p_color;
    let s_color = options.s_color;

    // primary color
    let primary_fill_color = p_color ? p_color : '#019184';
    // secondary color
    let secondary_fill_color = s_color ? s_color :' #666666';

    // show dollar
    let dollar = options.showDollar ? '$' : '';

    // chart size parameters
    let screenSize = options.screenSize;
    let initHeight = options.initHeight;
    let initWidth = options.initWidth;
    let margins = options.margin;
    let wRatio = options.wRatio;
    let xShift = options.xShift;
    let yShift;

    let margin = options.margins;
    let width = screenSize;
    // let height = ((initHeight / wRatio) * screenSize) - margin.top - margin.bottom;
    let height = (.55 * screenSize) - margin.top - margin.bottom;
	$: yShift = height
	
	d3.selectAll(".line-chart > *").remove();

	let svg = d3.select(".line-chart")
			.attr("width", width)
			.attr("height", height + margin.top + margin.bottom) 
			.append("g")
    		.attr("transform", "translate(" + 0 + "," + margin.top + ")");

	// set the max height of the ticks
	let maxHeight = d3.max(data, function(d){ return d * 1.1 } );

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

	d3.selectAll("line").attr("x1", "60").attr("x2", width - 20);

	let ticksAmount = 8;

	// defines the y axis styles
	let yAxis = d3.axisLeft(yScale)
		.scale(yScale)
		.tickSize("30")
		.tickPadding(8)
		.ticks(ticksAmount)
		.tickFormat(function(d) { return formatYvalue(d, dollar); });

	// append y axis
	svg.append("g")
		.attr('class', "med-axis-tick-mark")
		.attr("x", "0")
		.attr("x1", "0")
		.attr("x2", "0")
		.call(yAxis).attr("dx", "0")
		.select(".domain").remove();

	d3.selectAll("text").attr("x", "45").style("fill", "#666666");
	
	let xScaleWidth = 0;
	xScaleWidth = reportPeriod.length === 37 ? width - 75 : width - margin.right;
	
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
    // desktop 
	// xShift = 10 + margin.left;
    // yShift = height;
    
    // tablet portrait


    // tablet landscape
    // xShift = 40 + margin.left;
	// yShift = height;

    // smart phone
    // append the first axis
	// xShift = 30 + margin.left;
	// yShift = height;


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
    let lineAndDots = svg.append("g")
    	.attr("class", "line-and-dots")
		.attr("transform", "translate(70,0)");
		
	// Data dots
    lineAndDots.selectAll("line-circle")
    	.data(data)
    	.enter().append("circle")
        .attr("class", "data-circle")
		.attr("r", 4)
		.attr("fill", primary_fill_color)
		.attr("cx", function(d, e) {return x(e); })
        .attr("cy", function(d, e) {return y(d); });


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
        .attr("cy", function(d, e) { return y(d); });	
	}

	

}

export default {lineChartGen};