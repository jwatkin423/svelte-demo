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
let width = 420;
let height = 270;
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
	return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

</script>

<style>
	
	.chart {
		margin-top: 0px;
		background-color: #ffffff;
		display: block;
		height: 474px;
		width: 488px;
		margin: auto;
	}

	svg {
		position: relative;
		width: 100%;
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
		stroke: #CCCCCC;
		stroke-width: 1px;
	}

	.tick text {
		fill: #666666;
		text-anchor: start;
		white-space: unset !important;
		font-size: 10px;
	}

	.y-axis .tick text {
		fill: #CCCCCC;
		text-anchor: start;
		white-space: unset !important;
		font-size: 10px;
	}

	.point-group text {
		text-anchor: middle;
		white-space: unset !important;
		font-size: 10px;
	}

	.tick.tick-0 line {
		stroke: #666666 !important;
	}

	.tick.tick-0 text {
		fill: #666666 !important;
	}

	.point-text {
        fill: #666666;
    }


	.test {
		display: flex;
		width: 100%;
		background-color: #ffffff;
		margin-left: 10px;
	}

</style>

{#if yTicks.length > 0}

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>

	<g class="axis y-axis" transform="translate(0,{padding.top})">
		{#each yTicks as tick, i}
			<g class="tick tick-{tick}" transform="translate(5, {yScale(tick) - padding.bottom + 10})">
				<line x1="35px" x2="95%"></line>
				<text dx="10" y="3">{tick >= 100 ? formatTick(tick) : tick}</text>
			</g>
		{/each}
	</g>
	{#each points as point, i}
		{#if i == 0}
			<rect
				x="110px"
				y="{yScale(point)}"
				width="{barWidth}"
				height="{height - padding.bottom - yScale(point)}"
				fill={primary_fill_color}
			></rect>
		{/if}
		{#if i == 1}
			<rect
				x="160px"
				y="{yScale(point)}"
				width="{barWidth}"
				height="{height - padding.bottom - yScale(point)}"
				fill={secondary_fill_color}
			></rect>
		{/if}
		{#if i == 2}
			<rect
				x="328px"
				y="{yScale(point)}"
				width="{barWidth}"
				height="{height - padding.bottom - yScale(point)}"
				fill={primary_fill_color}
			></rect>
		{/if}
		{#if i == 3}
			<rect
				x="378px"
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
				<text x="145px">{formatText(tick)}</text>
			{/if}	
			{#if i == 2}
				<text x="120px">{tick.toUpperCase()}</text>
			{/if}
		</g>
	{/each}
	{#each points as point, i}
		<g class="point-group">
			{#if i == 0}
				<text
					class="point-text"
					x="130px"			
					y="{yScale(point) - 5}"
					height="{height}"
					>{formatPointText(point)}</text>
			{/if}
			{#if i == 1}
				<text 
					class="point-text"
					x="180px"
					y="{yScale(point) - 5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}
			{#if i == 2}
				<text
					class="point-text" 
					x="348px"
					y="{yScale(point) - 5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}	
			{#if i == 3}
				<text 
					class="point-text"
					x="398px"
					y="{yScale(point) -5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}
		</g>
	{/each}
	</svg>
</div>
{/if}
