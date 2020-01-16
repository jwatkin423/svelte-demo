<script>
import { scaleLinear } from 'd3-scale';
import { onMount }  from 'svelte';

import {afterUpdate} from 'svelte';
export let data = '';
export let reportPeriod = [];
export let reportYear;
export let yData = '';
export let yPoints;

// y Tick marks
$: yTicks = yPoints;

// primary color prop
export let p_color;
export let s_color;

export let mappedPoints = [];

let primary_fill_color = '';
$: primary_fill_color = p_color;

let points = [];
$: points = [...data];

let xTicks = [];

let tmpDate;
$: xTicks = reportPeriod.map((r, i) => {
	if (i == 0 || i == 2) {
		tmpDate = r;
	} else {
		tmpDate = 'ytd';
	}

	return tmpDate;
});

let tempValue;
$: swapXTicksElements(xTicks);

function swapXTicksElements(xTicks) {
	tempValue = xTicks[2];
	xTicks[2] = xTicks[1];
	xTicks[1] = tempValue;
}

let tempPoint;
let pointOne;
$: swapPointsElements(points);

function swapPointsElements(points) {
	tempPoint = points[2];
	points[2] = points[1];
	points[1] =  tempPoint;
}

// chart and misc dimensions
const padding = { top: 20, right: 15, bottom: 29, left: 25 };
let width = 488;
let height = 474;
let textWidth = 488;

$: bdOne = width < 488 ? 70 : 80;
$: bdTwo = width < 488 ? 30 : 10;

// primary color
$: primary_fill_color = p_color;
$: secondary_fill_color = s_color;

// initializing x scale
$: xScale = scaleLinear()
	.domain([0, xTicks.length])
	.range([0, width]);

// initializing y scale
$: yScale = scaleLinear()
	.domain([0, Math.max.apply(null, yTicks)])
	.range([height - padding.bottom, padding.top]);
	// .range([height, padding.top]);

// set the inner width of the chart
$: innerWidth = width - (padding.left + padding.right);
// set the text width
$: textWidth = innerWidth / (xTicks.length / 2);
const barWidth = 40;

let tickSplits = '';
export let monthYear = '';
let month;
$:month = monthYear.month;

let year;
$:year = monthYear.year;
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

// format ticks
function formatTick(tick) {
	
	if (tick >= 100 < 1000) {
		let tMod = tick % 5;
		if (tMod != 0) {
			tick += tMod;
		}
	}	

	if (tick >= 1000)  {
		tick = (tick / 1000);
		tick = Math.ceil(tick);
		tick += 'K';
	}

	if (tick >= 1000000) {
		tick = (tick / 1000000);
		tick = Math.ceil(tick);
		tick += 'M';
	}

	return tick;
}

function formatPoint(point, strtPos = 90, tCount = 0) {
	let len = point.length;

	let mv = 0;
	let mvOne = 0;
	let mvTwo = 0;
	
	if (len == 1) {
		mvTwo = -12;
	}

	if (len >= 2 && len < 4) {
		mvOne = 1;
		mvTwo = -7;
	}

	if (len >= 4 && len < 6) {
		mvOne = 4;
		mvTwo = -4;
	}

	if (len >= 6) {
		mvOne = 6;
		mvTwo = -10;
	}

	if (tCount == 0 || tCount == 2) {
		mv = mvOne;
	} else if (tCount == 3) {
		mv = mvTwo - 7;
	} else {
		mv = mvTwo;
	}

	return strtPos - (len + mv);
}

function formatPointText(point) {
	return point;
}

onMount(() => {
	let contentArea = document.querySelector('.content-area');
	contentArea.style.maxHeight = '500px';
});

</script>

<style>
	
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		height: 100%;
		/* margin-left: 10px; */
		width: 488px;
		margin: auto;
	}

	svg {
		position: relative;
		width: 488px;
		height: 100%;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: 14px;
	}

	.tick line {
		stroke: #737373;
		stroke-dasharray: 1;
		stroke-opacity: .25;
	}

	.tick text {
		fill: #737373;
		text-anchor: start;
		white-space: unset !important;
		font-size: 10px;
	}

	.tick.tick-0 line {
		color: black;
	}

	.x-axis .tick text {
		text-anchor: middle;	
	}

	.x-axis .tick text tspan {
		text-anchor: middle;
	}

	.bars rect {
		stroke: none;
	}
	.test {
		display: flex;
		width: 100%;
		background-color: #ffffff;
		margin-left: 10px;
	}

	@media only screen and (max-width: 768px) {
		.chart {
			width: 100% !important;
		}
	}		

	@media only screen and (max-width: 768px) {
		 .test {
			 margin-left: 0px !important;
		 }
	 }

	@media only screen and (max-width: 845px) {
		svg {
			width: 100% !important;
		}
	}
</style>

{#if yTicks.length > 0}

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>

	<g class="axis y-axis" transform="translate(0,{padding.top})">
		{#each yTicks as tick, i}
			<g class="tick tick-{tick}" transform="translate(5, {yScale(tick) - padding.bottom + 10})">
				<line x1="30" x2="100%"></line>
				<text dx="0" y="3">{tick >= 100 ? formatTick(tick) : tick}</text>
			</g>
		{/each}
	</g>
<!-- x="{xScale(i) + bdOne}" -->
<!-- x="{xScale(i) + bdTwo}" -->
	{#each points as point, i}
		{#if i == 0}
		<rect
					
					x="{width * .2}"
					y="{yScale(point)}"
					width="{barWidth}"
					height="{height - padding.bottom - yScale(point)}"
					fill={primary_fill_color}
				></rect>
		{/if}
		{#if i == 1}
		<rect
					
					x="{width * .2 + 45}"
					y="{yScale(point)}"
					width="{barWidth}"
					height="{height - padding.bottom - yScale(point)}"
					fill={secondary_fill_color}
				></rect>
		{/if}
		{#if i == 2}
			
		<rect
					x="{width * .60}"
					y="{yScale(point)}"
					width="{barWidth}"
					height="{height - padding.bottom - yScale(point)}"
					fill={primary_fill_color}
				></rect>
		{/if}
		{#if i == 3}
		<rect
					x="{width * .6 + 45}"
					y="{yScale(point)}"
					width="{barWidth}"
					height="{height - padding.bottom  -  yScale(point)}"
					fill={secondary_fill_color}
				></rect>
		{/if}		
	{/each}

	{#each xTicks as tick, i}
		<g class="tick" transform="translate({xScale(i)},{height - 10})">
			{#if i == 0}
				<text x="{width * .25 + 5}">{formatText(tick)}</text>
			{/if}	
			{#if i == 2}
				<text x="{width * .65}">{tick.toUpperCase()}</text>
			{/if}
		</g>
	{/each}
<!-- x="{xScale(i) + bdOne + (10 - (point.length / 2))}" -->
	{#each points as point, i}
		<g class="tick">
			{#if i == 0}
				<text
					class="point-text" 
					x="{(width * .2) + (10 - (point.length / 2))}"			
					y="{yScale(point) - 5}"
					height="{height}"
					>{formatPointText(point)}</text>
			{/if}
			{#if i == 1}
				<text 
					x="{(width * .3) + (10 - (point.length / 2))}"
					y="{yScale(point) - 5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}
			{#if i == 2}
				<text 
					x="{(width * .6) + (10 - (point.length / 2))}"
					y="{yScale(point) - 5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}	
			{#if i == 3}
				<text 
					x="{(width * .7) + (10 - (point.length / 2))}"
					y="{yScale(point) -5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}
		</g>
	{/each}
	</svg>
</div>
{/if}
