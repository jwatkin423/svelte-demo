<script>
import chartStore from '../utils/chart-store';
import Tspan from '../charts/tspan.svelte';
import { scaleLinear } from 'd3-scale';
import { onMount, afterUpdate } from 'svelte';
import clearData from '../helpers/clear-chart';
import { resetChart } from '../helpers/chartreset';

// report period props
export let reportPeriod;
export let reportYear;
// chart data prop
export let yPoints;

// y Tick marks
$: yTicks = yPoints;
$: tickWidth(yPoints);

// primary color prop
export let p_color = false;
export let s_color = false;

// mapped points
export let mappedPoints = [];
export let mappedPointsTwo = [];

// show dollar in tool tip
export let showDollar;
$: dollar = showDollar ? '$' : '';

// tooltips
let heyo = false;
export let rightPadding;

// chart type
export let chartType;

// chart and misc dimensions
let padding = { 
	top: 35, 
	right: 50, 
	bottom: 35, 
	left: 30 
};

let width = 1048;
let height = 575;
let textWidth = 600;

// desc ID
let desc;

// X and Y scale initialize
let xScale = scaleLinear();
let yScale = scaleLinear();
let d3TicksScale = scaleLinear();
let lowerDomain = 0;
let upperDomain = 0;
let d3Ticks = [];

// initializing x scale
$: xScale = scaleLinear()
	.domain([0, xTicks.length])
	.range([60, width - (rightPadding - rangeWidth(width))]);

function rangeWidth(width) {

	if (width > 786 && width <= 905 && xTicks.length == 13) {
		return 5;
	} else if (width <= 786 && xTicks.length == 13) {
		return -5;
	}

	return 10;
}

// initializing y scale
$: yScale = scaleLinear()
	.domain([0, Math.max.apply(null, yTicks)])
	.range([height - padding.bottom, padding.top]);

// chart data key/value pair
let chartData = [];
let chartDataTwo = [];
let path;
let pathTwo = false;

// primary color
$: primary_fill_color = p_color ? p_color : '#019184';
$: secondary_fill_color = s_color ? s_color : '#DDDDDD';

// report period for the x axis
$: xTicks = reportPeriod;

let r = 4;

// chart data mapped
$: chartData = mappedPoints.map((mp) => {
	let t = mp.x;
	let s = mp.y;
	return {y:s, x:t};
});

// chart data mapped
$: chartDataTwo = mappedPointsTwo.map((mp, i) => {

	if (chartType === 'saleMedianSoldMedian' || chartType === 'supplyDemand') {
		let t = mp.x;
		let s = mp.y;
		
		return {y:s, x:t};
	} else {
		mappedPointsTwo = [];
		pathTwo = false;
		chartDataTwo = false;
	}
});

// chart line
$: path = `M${chartData.map(mp => `${xScale(mp.x)},${yScale(mp.y)}`).join('L')}`;
$: pathTwo = mappedPointsTwo.length > 0 ? `M${chartDataTwo.map(mp => `${xScale(mp.x)},${yScale(mp.y)}`).join('L')}` : [];


// set the inner width of the chart
$: innerWidth = width;
// set the text width
$: textWidth = innerWidth / xTicks.length;

let lineHeight = -height;
let line = width;
$: line = width  - (rightPadding < 0 ? (rightPadding * -1) - 10 : rightPadding);

function formatLine(line) {
	return line + 'px';
}

// $: console.log(line, width);

// format ticks
function formatTick(tick) {

	if (tick >= 1000 && tick < 100000)  {
		tick = (tick / 1000).toFixed(0);
		tick += 'K';
	}

	if (tick >= 100000 && tick < 1000000) {
		tick = tick / 1000;
		tick += 'K';
	}

	if (tick >= 1000000) {
		tick = (tick / 1000000);
		tick = Math.floor(tick);
		tick += 'M';
	}

	if (showDollar) {
		tick = dollar + tick;
	}
	
	return tick;
}

let currentTickLength = 30;
function tickWidth(ticks) {
	
	if (ticks.length > 0) {

		let lastTick = ticks[ticks.length - 1];
		if (lastTick >= 1000) {

			let lastTickLength = formatTick(lastTick).length;

			if (showDollar) {
				lastTickLength++;
			}

			lastTickLength = (lastTickLength / 2) + 37;

			currentTickLength = lastTickLength;

			return lastTickLength + 'px';
		}

		else if (lastTick < 1000 && lastTick >= 100) {
			currentTickLength = (15/2)+ 30;
		}

		else if (lastTick < 100 && lastTick >= 10){
			currentTickLength = (10 / 2) + 30;
		} else {
			currentTickLength = 30;
		}
		
	}

	return currentTickLength + 'px';
}

function formatPlotPoint(point) {
	if (point) {
		point = point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

	return point;
}

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

function showToolTip(i, leftX, topY, point, dataType) {
	desc = document.getElementById('desc');
	desc.classList.add("enabled");
	desc.classList.add("active");
	leftX += 'px';
	topY = (topY - 70) + 'px';
	desc.style.left = leftX;
	desc.style.top = topY;
	let date = ttReportPeriodData[i];

	let py = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

function formatText(tick) {
	let res = tick;
	let newDate = res;
	if(tick.includes("<br>")) {
		let res = tick.split("<br>");
		tickSplits = {
			"month": res[0],
			"year": res[1]
		};

		newDate = tickSplits.month;
	}
	

	return newDate;
}

function formatYear(tick) {
	let res = tick.split("<br>");
	tickSplits = {
		"month": res[0],
		"year": res[1]
	};

	return tickSplits.year.replace('20', "'");
}

function formatLastTick(tick) {
	return tick;
}


function formatLastTickYear(tick) {
	return reportYear.replace('20', " '");
}

function hideToolTip() {
	desc = document.querySelector('.description');
	desc.classList.remove("enabled");
	desc.classList.remove("heyo");
	desc.classList.remove("active");
}

afterUpdate(() => {
	let cleared = 0;

    clearData.subscribe(value => {
        cleared = value;
    });

    if (cleared == 1) {
        resetChart();
    }
});

</script>

<style>
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		height: 576px;
		margin-left: 10px;
		max-width: 1068px;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
		display: block;
    }

	g.axis {
		width: 100%;
	}

	.tick text {
		fill: #CCCCCC;
		font-family: Helvetica, Arial;
		font-size: 9px;
		
	}

	.tick line {
		stroke: #CCCCCC;
	}

	/* x axis tick mark */
	.axis-tick-mark {
		text-anchor: middle;
	}

	/* y axis tick mark */
	.y-axis-tick-mark {
		text-anchor: end;
	}

	.y-axis.tick-0 text {
		fill: #666666;
	}

	.tick.tick-0 text {
		fill: #000000 !important;
		white-space: normal !important;
	}

	.tick.tick-0 line {
		stroke: #000000 !important;
	}

	.x-axis .tick text {
		fill: #666666;
		text-anchor: middle;
 		font-size: 10px;
	}

	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1;
	}

	.heyo:hover {
		fill: #ffabce;
		-moz-transition: 0.3s;
		-o-transition: 0.3s;
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}

	.enabled {
		cursor: pointer;
	}

	.description {
		pointer-events: none;
		position: fixed;
		font-size: 10px;
		text-align: center;
		background: #F2F2F2;
		z-index: 9999;
		height: 45px;
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

	p#date-hover {
		margin-top: 8px;
		margin-bottom: 0 !important;
	}

	p#unit-hover {
		margin-top: 0;
		margin-bottom: auto;
	}
	
	.description.active {
		display: block;
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

 	@media only screen and (max-width: 450px) {
		.description.active {
			font-size: 10px;
			padding-left: 2 !important;
			padding-right: 2 !important;
			min-width: 50px;
		}
 	} 

	 @media only screen and (max-width: 768px) {
		 .chart {
			 margin-left: 0px !important;
			 height: calc(100% - 60px);
		 }
	 }

</style>

{#if path.length > 1}

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg xmlns="http://www.w3.org/2000/svg">

		<!-- y axis -->
		{#each yTicks as tick, i}
			<g class="tick y-axis tick-{tick}" transform="translate(0, {yScale(tick)})">
				<text class='y-axis-tick-mark' x="{currentTickLength}" dx="0" y="3">{tick >= 100 ? formatTick(tick) : dollar + '' + tick}</text>
			</g>
		{/each}

		<!-- y axis -->
		{#each yTicks as tick, i}
			<g class="tick y-axis tick-{tick}" transform="translate(0, {yScale(tick)})">
				<line x1="50" x2={formatLine(line)}></line>
			</g>
		{/each}

		<!-- x axis -->
		<!-- <g class="axis x-axis"> -->
			{#each xTicks as tick, i}
				<!-- <g class="tick tick-{ tick }" transform="translate({xScale(i)},{height - 40})" > -->
				<g class="tick tick-{ tick }" transform="translate(0,0)">
					
                    {#if !tick.includes('<br>') && i !== (xTicks.length - 1) }
						<line class="small-tick" y1="{height - 25}" y2="{height - 35}" x1="{xScale(i)}px" x2="{xScale(i)}px"></line>
					{:else if (tick.includes('<br>') && i !== (xTicks.length - 1))}
						<!-- <line y1="5px" y2="-88%" x1="0" x2="0"></line> -->
						<line y1="25px" y2="{height - 35}px" x1="{xScale(i)}px" x2="{xScale(i)}px"></line>
						<text class='axis-tick-mark' dx=0 y="{height - 20}px" x="{xScale(i)}px">{formatText(tick)}</text>
					{/if}
					{#if i === (xTicks.length - 1) }
						<!-- <line y1="5px" y2="-88%" x1="0" x2="0"></line>-->
						<line y1="25px" y2="{height - 35}px" x1="{xScale(i)}px" x2="{xScale(i)}px"></line>
						<text class='axis-tick-mark' dx=0 y="{height - 20}px" x="{xScale(i)}px">{formatText(tick)}</text>
					{/if}
				</g>
			{/each}

			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }">
                    {#if (tick.includes('<br>') && i !== (xTicks.length - 1))}
						<text class='axis-tick-mark' dx=0 y="{height - 10}px" x="{xScale(i)}px">{formatYear(tick)}</text>
					{/if}
					{#if i === (xTicks.length - 1) }
						<text class='axis-tick-mark' dx=0 y="{height - 10}px" x="{xScale(i)}px">{formatLastTickYear(tick)}</text>
					{/if}	
				</g>
			{/each}

			<g transform="translate(0, 0)">
				<!-- data -->
				<path class="path-line" d={path} stroke={primary_fill_color}></path>
				
				<!-- set the circles for the data points -->
				{#each chartData as point, i}
					<circle class="enabled" class:heyo cx='{xScale(point.x)}' cy='{yScale(point.y)}' r='{r}' fill={primary_fill_color}
					on:mouseover={(e) => {showToolTip(i, e.pageX, e.clientY, point, 'sale') }}
					on:mouseleave={hideToolTip}/>
				{/each}

				<!-- Second Path Line and Circles-->
				{#if chartType === 'saleMedianSoldMedian' || chartType === 'supplyDemand'}
					<path class="path-line" d={pathTwo} stroke={secondary_fill_color}></path>
			   
					{#each chartDataTwo as point, i}
						<circle class="enabled" class:heyo cx='{xScale(point.x)}' cy='{yScale(point.y)}' r='{r}' fill={secondary_fill_color}
						on:mouseover={(e) => {showToolTip(i, e.pageX, e.clientY, point, 'sold') }} 
						on:mouseleave={hideToolTip}/>
						{chartDataTwo = []}
					{/each}
				{/if}

				
			</g>
		<!-- </g> -->
        
	</svg>
</div>



{:else}
	<h3>Still processing the data ... </h3>
{/if}

<div class="description" id='desc'><p id='date-hover'></p><p id='unit-hover'></p></div>