<script>
import chartStore from '../utils/chart-store';
import { scaleLinear } from 'd3-scale';
import Tspan from '../charts/tspan.svelte';

// report period props
export let reportPeriod;
// chart data prop
export let data = [];
export let yPoints;

$: yTicks = yPoints;

// primary color prop
export let p_color;

// mapped points
export let mappedPoints = [];

// chart and misc dimensions
let padding = { top: 45, right: 15, bottom: 55, left: 45 };
let width = 1280;
let height = 800;
let textWidth = 600;

// X and Y scale initialize
let xScale = scaleLinear();
let yScale = scaleLinear();

// chart data key/value pair
let chartData;
let path;

// primary color
$: primary_fill_color = p_color;

// report period for the x axis
$: xTicks = reportPeriod;

// initializing x scale
$: xScale = scaleLinear()
	.domain([0, xTicks.length])
	.range([padding.left, width - padding.right]);

// initializing y scale
$: yScale = scaleLinear()
	.domain([0, Math.max.apply(null, yTicks)])
	.range([height - padding.bottom, padding.top]);

$: chartData = mappedPoints.map((mp) => {
	let t = mp.x;
	let s = mp.y;

	return {y:s, x:t}

});

// chart line
$: path = `M${chartData.map(mp => `${xScale(mp.x)},${yScale(mp.y)}`).join('L')}`;

// set the inner width of the chart
$: innerWidth = width - (padding.left + padding.right);
// set the text width
$: textWidth = innerWidth / xTicks.length;

// format ticks
function formatTick(tick, i, length) {

    if (tick >= 1000 && tick < 10000) {
        tick /= 1000;
       tick += i === length ? ' per 1,000 ' : '';
    }

    if (tick >= 10000) {
        tick /= 10000;
        tick += i === length ? ' per 10,000 ' : '';
    }

	return tick;
}

let tickSplits;
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

	return tickSplits.month + " " + tickSplits.year.replace('20', "'");
}

let test;

export let lineHeight = -height + padding.bottom;

</script>

<style>
	.chart {
		width: 100%;
        height: 100%;
		margin: 0 auto;
		background-color: #ffffff;
		margin-left: 10px;
		clear: both;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
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
		white-space: normal !important;
	}

	.tick.tick-0 line {
		color: black;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 4;
	}
</style>

{#if path.length > 1}

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis" transform="translate(0,{padding.top})">
			{#each yTicks as tick, i}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom + 10})">
					<line x2="100%"></line>
					<text y="-4">{formatTick(tick, i, (yTicks.length - 1))}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }" transform="translate({xScale(i)},{height - 35})">
					<line y1={lineHeight} y2="0" x="0" x2="0"></line>
                    {#if !tick.includes('<br>') }
						<text dx=0>{tick}</text>
					{:else}
						<text dx=0>{formatText(tick)}</text>
					{/if}
				</g>
			{/each}
		</g>

        <!-- data -->
		<path class="path-line" d={path} stroke={primary_fill_color}></path>
	</svg>
</div>

{:else}
<h3>Still processing the data ... </h3>
{/if}