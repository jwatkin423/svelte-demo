<script>
import { scaleLinear } from 'd3-scale';
import Tspan from '../components/tspan.svelte';

export let data = [];
let points = [];
$: points = data.map( (el, i) => {
	 el /= 1;
 	return {y: el, x: i};
});

export let p_color = '';
export let reportPeriod = '';
export let yData = [];

$: primary_fill_color = p_color;

$: xTicks = reportPeriod;

$: points = data.map( (el, i) => {
	 el /= 1;
 	return {y: el, x: i};
});

export let yTicks = [];
$: yTicks = yData;

export let padding = { top: 45, right: 15, bottom: 55, left: 45 };

export let width = 1280;
export let height = 760;

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

// $: minX = points[0].x;
$: minX = 0;
$: maxX = points[points.length - 1].x;
$: path = `M${points.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;


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

	return tickSplits
}

export let lingHeight = -height + padding.bottom;

</script>

<style>
	.chart {
		width: 100%;
        height: 100%;
		margin: 0 auto;
		background-color: #ffffff;
	    margin-left: 10px;
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


<!-- chart-->
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
					<line y1={lingHeight} y2="0" x="0" x2="0"></line>
                    {#if !tick.includes('<br>') }
						<text dx=0>{tick}</text>
					{:else}
						<text x="{barWidth}" dx=-{barWidth}>
							<Tspan xValue="{barWidth}" monthYear={monthYear=formatText(tick)} />
						</text>
					{/if}
				</g>
			{/each}
		</g>

        <!-- data -->
		<path class="path-line" d={path} stroke={primary_fill_color}></path>
	</svg>
</div>
<!-- end chart -->