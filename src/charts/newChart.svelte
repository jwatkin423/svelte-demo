<script>
	import { scaleLinear } from 'd3-scale';
	import Tspan from '../components/tspan.svelte';

	import {afterUpdate} from 'svelte';
    export let data = '';
	export let p_color = '';
	export let reportPeriod = '';
	export let yData = '';

	let primary_fill_color = '';
	$: primary_fill_color = p_color;

	export let points = '';
	$: points = data;

	export let xTicks;
	$: xTicks = reportPeriod;

	export let yTicks = [];
	$: yTicks = yData;

	export let padding = { top: 45, right: 15, bottom: 55, left: 25 };

	export let width = 1280;
	export let height = 800;

	export let xScale = scaleLinear();
	export let yScale = scaleLinear();
	export let innerWidth;
	export let barWidth;

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
	 	.domain([0, Math.max.apply(null, yTicks)])
		 .range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;

function formatTick(tick) {
	if ( tick >= 1000) {
		return tick / 1000;
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

	return tickSplits
}

</script>

<style>
	.chart {
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		background-color: #ffffff;
		margin-left: 10px;
	}

	svg {
		position: relative;
		width: 100%;
		height: 600px;
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
		/* fill:blue; */
		stroke: none;
	}
</style>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis" transform="translate(0,{padding.top})">
			{#each yTicks as tick, i}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom + 10})">
					<line x2="100%"></line>
					<text y="-4">{formatTick(tick)} {i === yTicks.length ? ' per 1,000 ' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }" transform="translate({xScale(i)},{height - 35})">
					{#if !tick.includes('<br>') }
						<text x="{barWidth/2}">{tick}</text>
					{:else}
						<text x="{barWidth/2}">
							<Tspan xValue="{barWidth/2}" dyValue={20} monthYear={monthYear=formatText(tick)} />
						</text>
					{/if}
				</g>
			{/each}
		</g>

		<g class='bars'>
		 
			{#each points as point, i}
				<rect
					x="{xScale(i) + 2}"
					y="{yScale(point)}"
					width="{barWidth - 10}"
					height="{height - padding.bottom - yScale(point) }"
					fill={primary_fill_color}
				></rect>
			{/each}
		</g>
	</svg>
</div>