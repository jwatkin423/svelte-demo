<script>
// import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import { onMount, afterUpdate } from 'svelte';
import clearData from '../helpers/clear-chart';
import { resetChart } from '../helpers/chartreset';
import { formatTags } from '../utils/formatMtYdTags';

export let data = [];
export let reportPeriod = [];

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

const barWdith = 40;
const barDistanceSetOne = .2;
const barDistanceSetTwo = .65;

let points = [];
$: points = [...data];


let margin = {top: 35, right: 20, bottom: 35, left: 20};
let width = (screenSize / 2) - margin.left - margin.right;
let height = 474 - margin.bottom - margin.top;
$: width = (screenSize / 2) - margin.left - margin.right;
$: drawChart(width);

let xTicks = [];
let tmpDate;

function drawChart() {
	
	d3.selectAll(".bar-chart > *").remove();
	
	width = (screenSize / 2) - margin.left - margin.right;

	if (width > 488) {
		width = 488;
	}

	// x ticks for the mnth ytd chart
	xTicks[0] = reportPeriod[0];
	xTicks[1] = 'YTD';

	// svg for d3
	let svg = d3.select("#chart-right")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		console.log(svg);

	
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
		.tickFormat("");

	// add grid lines
	svg.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(0, " + margin.top + ")")
		.call(linesYaxis.ticks(8))
		.select('.domain').remove();

	d3.selectAll(".bar-chart line").attr("x1", "60").attr("x2", width);

	//add y axis
	let yAxis = d3.axisLeft(yScale)
		.ticks(8)
		.tickSize(-width + margin.right)
		.tickFormat(function(d) {
			return formatYvalue(d);
		});

	svg.append("g")
		.attr('class', "med-axis-tick-mark")
		.attr("x", "0")
		.attr("x1", "0")
		.attr("x2", "0")
		.attr("transform", "translate(0, " + margin.top + ")")
		.call(yAxis).attr("dx", "0")
		.select('.domain').remove();

		// set the y axis to 30 pixles out
		d3.selectAll(".med-axis-tick-mark text")
			.attr("x", "30");
	  

	let bars = svg.selectAll("rect").data(data).enter().append("rect");
	bars.attr("x",function(d,i) {
		let bdOne = width * barDistanceSetOne;
		let bdTwo = width * barDistanceSetTwo;
		
		if (i === 0) {
				return bdOne + 10;
		}
		if (i === 1) {
				return bdOne + 60;
		}
		if (i == 2) {
				return bdTwo + 10;
		}	
		if (i == 3) {
				return bdTwo + 60;
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
	.attr("width", barWdith)
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
	let tags = svg.selectAll(".tags")
		.filter('tags')
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			return formatTags(d, dollar);
		})
		.attr("x", function(d,i){
			let bdOne = width * barDistanceSetOne;
			let bdTwo = width * barDistanceSetTwo;

			if (i == 0) {
				return bdOne + 25;
			}
			if (i == 1) {
				return bdOne + 80;
			}
			if (i == 2) {
				return bdTwo + 30;
			}	
			if (i == 3) {
				return bdTwo + 80;
			}
		})
		.attr("y",function(d, i) {
			if (d >= 0) {
				return yScale(d) + margin.top - 5;
			} else {
				return height - yScale(Math.abs(d)) + margin.top + 15;
			}
		})
		.attr('class', 'tags');

	// add the x axis
	let xAxis = svg.selectAll(".xaxis-ticks")
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
				return (width * barDistanceSetOne) + 55;
			} else if(i === 1){			
				return (width * barDistanceSetTwo) + 55;
			}
		})
		.attr("class", "xaxis-ticks")
		.attr("y", height + (margin.bottom / 2) + margin.top);

	// add styles to the 0 tick and corresponding
	// grid line
	let lines = svg.selectAll('.grid .tick line')
		.each(function(d) {
			if (d == 0) {
				d3.select(this).attr("class", "line-0");
			}
		});

	let yTicksText = svg.selectAll('.med-axis-tick-mark .tick text')
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
		yValue = dollar + val.toString();
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
	.chart-right {
		margin-left: 5px;
		float: right;
		background-color: #ffffff;
		height: 474px;
		grid-column: 2/2;
        grid-row: 1/1;
    }

	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		height: 474px;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}
    
    svg {
		position: relative;
		margin-left: auto;
		margin-right: auto;
	}
</style>
<div class="chart-right">
	<div class="chart" >
		<svg class="bar-chart" id="chart-right"></svg>
	</div>
</div>
