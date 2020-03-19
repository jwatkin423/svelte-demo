<script>
import { scaleLinear } from 'd3-scale';
import { onMount, afterUpdate } from 'svelte';
import clearData from '../helpers/clear-chart';
import { resetChart } from '../helpers/chartreset';

export let data = '';
export let reportPeriod = [];
export let reportYear;
export let yData = '';
export let yPoints;

// y Tick marks
$: yTicks = yPoints;

// primary color prop
export let p_color = false;
export let s_color = false;

// primary color
let primary_fill_color = '';
let secondary_fill_color = '';
$: primary_fill_color = p_color ? p_color : '#019184';
$: secondary_fill_color = s_color ? s_color :' #666666';

export let mappedPoints = [];

export let showDollar;
$: dollar = showDollar ? '$' : '';

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
let height = 436;
let textWidth = 488;

// X and Y scale initialize
let xScale = scaleLinear();
let yScale = scaleLinear();
let d3TicksScale = scaleLinear();
let lowerDomain = 0;
let upperDomain = 0;
let d3Ticks = [];

// $: buildYtickMarks(mappedPoints);

// function buildYtickMarks(mappedPoints) {
// 	let ticksDomain = [];
// 	if (mappedPoints.length > 0) {
		
// 		mappedPoints.forEach((v, i) => {
// 			ticksDomain = [...ticksDomain, v.y];
// 		}); 

// 		if (ticksDomain.length > 0) {
// 			upperDomain = Math.max.apply(Math, ticksDomain);
// 			d3Ticks = d3TicksScale.domain([0, upperDomain]).nice().ticks();
// 			yScale = scaleLinear()
// 			.domain([0, Math.max.apply(null, d3Ticks)])
// 			.range([height - padding.bottom, padding.top]);
// 		}
// 	}
// }

// initializing x scale
$: xScale = scaleLinear()
	.domain([0, xTicks.length])
	.range([0, width]);

// initializing y scale
$: yScale = scaleLinear()
	.domain([0, Math.max.apply(null, yTicks)])
	.range([height - padding.bottom, padding.top]);


// set the inner width of the chart
$: innerWidth = width - (padding.left + padding.right);
// set the text width
$: textWidth = innerWidth / (xTicks.length / 2);
const barWidth = 30;

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

function formatPointText(num) {

	 if (num) {

        if (num >= 1000000000) {
			num /= 1000000000;
			num = Number(Math.floor(num + 'e' + 1) + 'e-1').toFixed(0);
            num = num + "B";
        }
        else if(num >= 1000000 && num < 1000000000) {
			num /= 1000000;
			num = Number(Math.floor(num + 'e' + 1) + 'e-1').toFixed(0);
            num = num + "M";
        } 
        else if (num >= 1000 & num < 1000000) {
			num /= 1000;
			num = Number(Math.floor(num + 'e' + 1) + 'e-1').toFixed(0);
            num = num + "K";
        }
    }

    return num;
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
		height: 436px;
		width: 500px;
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
				<text class="axis-tick-mark" dx="0" y="3">{tick >= 100 ? formatTick(tick) : dollar + '' + tick}</text>
			</g>
		{/each}
	</g>
	{#each points as point, i}
		{#if i == 0}
			<rect
				x="130px"
				y="{yScale(point)}"
				width="{barWidth}"
				height="{height - padding.bottom - yScale(point)}"
				fill={primary_fill_color}
			></rect>
		{/if}
		{#if i == 1}
			<rect
				x="170px"
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
				x="368px"
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
				<text class="axis-tick-mark" x="155px">{formatText(tick)}</text>
			{/if}	
			{#if i == 2}
				<text class="axis-tick-mark" x="100px">{tick.toUpperCase()}</text>
			{/if}
		</g>
	{/each}

	{#each points as point, i}
		<g class="point-group">
			{#if i == 0}
				<text
					class="point-text" 
					x="145px"
					y="{yScale(point) - 5}"
					height="{height}"
					>{formatPointText(point)}</text>
			{/if}
			{#if i == 1}
				<text 
					class="point-text"
					x="185px"
					y="{yScale(point) - 5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}
			{#if i == 2}
				<text 
					class="point-text"
					x="343px"
					y="{yScale(point) - 5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}	
			{#if i == 3}
				<text 
					class="point-text"
					x="383px"
					y="{yScale(point) -5}"
					height="{height - padding.bottom - yScale(point)}"
					>{formatPointText(point)}</text>
			{/if}
		</g>
	{/each}
	</svg>
</div>
{/if}
