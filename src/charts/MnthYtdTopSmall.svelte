<script>
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import { onMount, afterUpdate } from 'svelte';
import clearData from '../helpers/clear-chart';
import { resetChart } from '../helpers/chartreset';
import { formatTags } from '../utils/formatMtYdTags';

export let data = [];
export let reportPeriod = [];

// set the chart width
export let screenSize = '';

// primary color prop
export let p_color = false;
export let s_color = false;

// primary color
let primary_fill_color = '';
let secondary_fill_color = '';
$: primary_fill_color = p_color ? p_color : '#019184';
$: secondary_fill_color = s_color ? s_color :' #666666';

export let showDollar;
let dollar = '';
$: dollar = showDollar ? '$' : '';

// bar width
let barWidth = 20;
//distance between bars
let barGap = 5;

// center distances
let barChartCenterDist = 45;

let points = [];
$: points = [...data];

$: drawChart(points);

let margin = { top: 20, right: 15, bottom: 29, left: 25 };
let width = 285 - margin.left - margin.right;
let height = 340 - margin.top - margin.bottom;
	
let xTicks = [];
let tmpDate;

function chartWidth() {
	return 285;
}

// draw the chart
function drawChart() {
	
	d3.selectAll("#chart-top > *").remove();
	
	let cWidth = chartWidth();
	
	// x ticks for the mnth ytd chart
	xTicks[0] = reportPeriod[0];
	xTicks[1] = 'YTD';

	// svg for d3
	let svgTop = d3.select("#chart-top")
			.attr("width", cWidth)
			.attr("height", height + margin.top + margin.bottom);

	// ensures the highest tick mark value is greater than
	// the highest value in the dataset
	let maxHeight = d3.max(data,function(d){return Math.abs(d) * 1.1});
	
	// determine the min point 
	// for the y scale (0 or negative)
	let min = 0;
	if (d3.min(points) < 0 ) {
		min = -maxHeight;
	}

	// setup y scale
	let yScale = d3.scaleLinear()
		.domain([maxHeight, min])
		.nice(8)
		.range([0, height]);

	// grid lines for the chart
	let linesYaxis = d3.axisLeft(yScale)
		.ticks(8)
		.tickFormat("");

	// add grid lines
	svgTop.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(0, " + margin.top + ")")
		.call(linesYaxis)
		.select('.domain').remove();

	d3.selectAll("line").attr("x1", "60").attr("x2", width);

	let barMiddle = cWidth / 2;
	let barPosOne = barMiddle - (barChartCenterDist / 2) - ((barWidth * 2) + barGap);
	let barPosTwo = barMiddle - (barChartCenterDist / 2) - ((barWidth));
	let barPosThree = barMiddle + (barChartCenterDist / 2) + barWidth;
	let barPosFour = barMiddle + (barChartCenterDist / 2) + ((barWidth * 2) + barGap);

	//add y axis
	let yAxis = d3.axisLeft(yScale)
		.ticks(8)
		.tickSize(-width + margin.right)
		.tickFormat(function(d) {
			return formatYvalue(d);
		});

	svgTop.append("g")
		.attr('class', "med-axis-tick-mark")
		.attr("x", "0")
		.attr("x1", "0")
		.attr("x2", "0")
		.attr("transform", "translate(0, " + margin.top + ")")
		.call(yAxis).attr("dx", "0")
		.select('.domain').remove();

		// set the y axis to 30 pixles out
		d3.selectAll("text").attr("x", "30");
	  

	// add the graph's bars
	let bars = svgTop.selectAll("rect").data(data).enter().append("rect");
	bars.attr("x",function(d,i) {
		if (i == 0) {
			return barPosOne;
		}
		if (i == 1) {
			return barPosTwo;
		}
		if (i == 2) {
			return barPosThree;
		}	
		if (i == 3) {
			return barPosFour;
		}
	})
	.attr("y",function(d) {
		if (min < 0) {
			if(d < 0) {
				return height/2 + margin.top;
			}
			else{
				return yScale(d) + margin.top; 
			}
		} else {
			return yScale(d) + margin.top;
		}
		
	})//for bottom to top
	.attr("width", barWidth)
	.attr("height", function(d) {
		if (min < 0) {
			return height/2 -yScale(Math.abs(d));
		}
    	return height -yScale(Math.abs(d));
		
	});

	bars.attr("fill",function(d, i) {
		if(i===0 || i === 2){
			return primary_fill_color;
		}
		else{
			return secondary_fill_color;
		}
	});
	
	//add tag to every bar
	let tags = svgTop.selectAll(".tags-top")
		.filter('tags-top')
		.data(data).enter()
		.append("text")
		.text(function(d) {
			return formatTags(d, dollar);
		})
		.attr("x", function(d,i){
			if (i == 0) {
				return barPosOne + (barWidth / 2);
			}
			if (i == 1) {
				return barPosTwo + (barWidth / 2);
			}
			if (i == 2) {
				return barPosThree + (barWidth / 2);
			}	
			if (i == 3) {
				return barPosFour + (barWidth / 2);
			}
		})
		.attr("y",function(d, i) {
			if (d >= 0) {
				return yScale(d) + margin.top - 5;
			} else {
				return height - yScale(Math.abs(d)) + margin.top + 15;
			}
		})
		.attr('class', 'tags-top');
	
	// add the x axis
	let xAxis = svgTop.selectAll(".xaxis-ticks-top")
		.data(xTicks)
		.enter()
		.append("text")
		.text(function (d,i) {
			if (i === 0) {
				let chunks = d.split('<br>');
				return chunks[0];
			} else {
				return d;
			}
		})
		.attr("x", function(d, i) {
			if (i === 0) {
				return barPosOne + ((2 * barWidth) + 5 ) / 2;
			} else if(i === 1){			
				return barPosThree + ((2 * barWidth) + 5 ) / 2;
			}
		})
		.attr("class", "xaxis-ticks-top")
		.attr("y", height + (margin.bottom / 2) + margin.top);

	// add styles to the 0 tick and corresponding
	// grid line
	let lines = svgTop.selectAll('.grid .tick line')
		.each(function(d) {
			if (d == 0) {
				d3.select(this).attr("class", "line-0");
			}
		});

	let yTicksText = svgTop.selectAll('.med-axis-tick-mark .tick text')
		.each(function(d) {
			if (d == 0) {
				d3.select(this).attr("class", "text-0").style("fill", "#666666");
			} else {
				d3.select(this).attr("class", "non-zero");
			}
		});

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
		margin: auto;
	}

</style>


<div class="chart">
	<svg class="median-chart-top" id='chart-top'></svg>
</div>