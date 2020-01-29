<script>
import chartStore from '../utils/chart-store';
import Tspan from '../charts/tspan.svelte';
import { scaleLinear } from 'd3-scale';
import { onMount } from 'svelte';
// report period props
export let reportPeriod;
export let reportYear;
// chart data prop
export let data = [];
export let yPoints;

// y Tick marks
$: yTicks = yPoints;

// primary color prop
export let p_color = false;
export let s_color;

// mapped points
export let mappedPoints = [];

// show dollar in tool tip
export let showDollar;
$: dollar = showDollar ? '$' : '';

// tooltips
let heyo = false;
export let rightPadding;

// chart and misc dimensions
let padding = { 
	top: 35, 
	right: 50, 
	bottom: 40, 
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

// initializing x scale
$: xScale = scaleLinear()
	.domain([0, xTicks.length])
	.range([padding.left, width  - rightPadding]);

// initializing y scale
$: yScale = scaleLinear()
	.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
	.range([height - padding.bottom, padding.top]);

// chart data key/value pair
let chartData;
let path;

// primary color
$: primary_fill_color = p_color ? p_color : '#019184';

// report period for the x axis
$: xTicks = reportPeriod;

let r = 4;

$: setR(width);

function setR() {

	if (window.innerWidth >= 1024) {
		r = 4;
	} else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
		r = 3;
	} else {
		r = 2;
	}
}

// chart data mapped
$: chartData = mappedPoints.map((mp, i) => {
	let t = mp.x;
	let s = mp.y;

	return {y:s, x:t};
});

// chart line
$: path = `M${chartData.map(mp => `${xScale(mp.x)},${yScale(mp.y)}`).join('L')}`;
// $: path2 = `M${chartData.map(mp => `${xScale(mp.x)},${yScale(mp.y)}`).join('L')}`;

// set the inner width of the chart
$: innerWidth = width;
// set the text width
$: textWidth = innerWidth / xTicks.length;

let lineHeight = -height;
let line = width - padding.right;
$: line = (width * .95) + 3;


// format ticks
function formatTick(tick) {
	
	if (tick >= 100 < 1000) {
		let tMod = tick % 5;
		if (tMod != 0) {
			tick += tMod;
		}
	}	

	if (tick >= 1000 && tick < 1000000)  {
		tick = (tick / 1000);
		tick = Math.ceil(tick);
		tick += 'K';
	}

	if (tick >= 1000000) {
		tick = (tick / 1000000);
		tick = Math.ceil(tick);
		tick += 'M';
	}

	if (showDollar) {
		tick = dollar + tick;
	}

	return tick;
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

function showToolTip(i, leftX, topY, point) {
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

	units = py + ' units';
	if (showDollar) {
		units = dollar + py;
	}

	let pDateHover = document.getElementById('date-hover');
	let pUnitHover = document.getElementById('unit-hover');
	pDateHover.innerHTML = date;
	pUnitHover.innerHTML = units;
}

function formatText(tick) {
	let res = tick.split("<br>");
	tickSplits = {
		"month": res[0],
		"year": res[1]
	};

	return tickSplits.month;
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

</script>

<style>
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		height: 576px;
		margin-left: 10px;
		max-width: 1048px;
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

	.tick {
		font-family: Helvetica, Arial;
		font-size: 10px;
	}

	.tick line {
		stroke: #666666;
		stroke-opacity: .25;
	}

	.y-axis.tick-0 {
		color: #000000;
	}

	.tick text {
		fill: #666666;
		text-anchor: start;
		white-space: normal !important;
	}

	.tick.tick-0 line {
		stroke: black;
	}

	.x-axis .tick text {
		text-anchor: middle;
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

	.x-axis .tick text {
 		font-size: 10px;
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
			<g class="tick y-axis tick-{tick}" transform="translate(20, {yScale(tick)})">
				<line x1="25" x2="{line}"></line>
				<text dx="0" y="3">{tick >= 100 ? formatTick(tick) : tick}</text>
			</g>
		{/each}
		<!-- </g> -->

		<!-- x axis -->
		<g class="axis x-axis" transform="translate(0,0)">
			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }" transform="translate({xScale(i) + 20},{height - 40})" >
					
                    {#if !tick.includes('<br>') && i !== (xTicks.length - 1) }
						<line class="small-tick" y1="0" y2="10" x1="0" x2="0"></line>
					{:else if (tick.includes('<br>') && i !== (xTicks.length - 1))}
						<line y1="0" y2="-88%" x1="0" x2="0"></line>
						<text dx=0 y="16">{formatText(tick)}</text>
					{/if}
					{#if i === (xTicks.length - 1) }
						<line y1="0" y2="-88%" x1="0" x2="0"></line>
						<text dx=0 y="16">{formatLastTick(tick)}</text>
					{/if}	
				</g>
			{/each}

			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }" transform="translate({xScale(i) + 20},{height - 30})">
                    {#if (tick.includes('<br>') && i !== (xTicks.length - 1))}
						<text dx=0 y="16">{formatYear(tick)}</text>
					{/if}
					{#if i === (xTicks.length - 1) }
						<text dx=0 y="16">{formatLastTickYear(tick)}</text>
					{/if}	
				</g>
			{/each}
			<g transform="translate(20, 0)">
				<!-- data -->
				<path class="path-line" d={path} stroke={primary_fill_color}></path>

				<!-- set the circles for the data points -->
				{#each chartData as point, i}
					<circle class="enabled" class:heyo cx='{xScale(point.x)}' cy='{yScale(point.y)}' r='{r}' fill={primary_fill_color}
					on:mouseover={(e) => {showToolTip(i, e.pageX, e.clientY, point) }} 
					on:mouseleave={hideToolTip}/>
				{/each}
			</g>
		</g>
        
	</svg>
</div>



{:else}
	<h3>Still processing the data ... </h3>
{/if}

<div class="description" id='desc'><p id='date-hover'></p><p id='unit-hover'></p></div>