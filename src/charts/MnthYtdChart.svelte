<script>
import chartStore from '../utils/chart-store';
import Tspan from '../charts/tspan.svelte';
import { scaleLinear } from 'd3-scale';
import KMI from '../components/KMI.svelte';

// report period props
export let reportPeriod;
export let reportYear;
// chart data prop
export let data = [];
export let yPoints;

// y Tick marks
$: yTicks = yPoints;

// primary color prop
export let p_color;
export let s_color;

// mapped points
export let mappedPoints = [];

// tooltips
let heyo = false;

// chart and misc dimensions
let padding = { top: 45, right: 35, bottom: 60, left: 45 };
let width = 1048;
let height = 700;
let textWidth = 600;

// desc ID
let desc;

// X and Y scale initialize
let xScale = scaleLinear();
let yScale = scaleLinear();

// chart data key/value pair
let chartData;
let path;
let xPlots = [];

// primary color
$: primary_fill_color = p_color;

// report period for the x axis
$: xTicks = reportPeriod;

// the chart data points
$: xPlots = data;

// initializing x scale
$: xScale = scaleLinear()
	.domain([0, xTicks.length])
	.range([padding.left, width + 5]);

// initializing y scale
$: yScale = scaleLinear()
	.domain([0, Math.max.apply(null, yTicks)])
	// .range([height - padding.bottom, padding.top]);
	.range([height - 20, padding.top]);

// chart data mapped
$: chartData = mappedPoints.map((mp, i) => {
	let t = mp.x;
	let s = mp.y;

	return {y:s, x:t};
});



// set the inner width of the chart
$: innerWidth = width - (padding.left + padding.right);
// set the text width
$: textWidth = innerWidth / xTicks.length;

// format ticks
function formatTick(tick, i, length) {

	return tick;
}

function formatPlotPoint(point) {
	return point;
}

let tickSplits;
export let monthYear = '';
let month;
$:month = monthYear.month;

let year;
$:year = monthYear.year;



let test;

let lineHeight = -height + padding.bottom - 100;

function showToolTip(i, leftX, topY, point) {
	desc = document.getElementById('desc');
	desc.classList.add("enabled");
	desc.classList.add("active");
	leftX += 'px';
	topY = (topY - 70) + 'px';
	desc.style.left = leftX;
	desc.style.top = topY;
	desc.style.color = primary_fill_color;
	let date = reportPeriod[i];
	
	if (date.includes('<br>')) {
		date = date.replace('<br>', '');
	}

	let p = point.y + " (" + date + ")";
	desc.innerHTML = p;
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
		width: 100%;
		display: block;
		margin-left: 10px;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
		display: block;
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
		font-size: 12px;
		text-align: center;
		background: #FFF;
		padding: 5px 10px;
		z-index: 9999;
		height: 20px;
		line-height: 20px;
		margin: 0 auto;
		color: #21669e;
		border-radius: 5px;
		box-shadow: 0 0 0 1px #eee;
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		display: none;
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

 	@media only screen and (min-height: 400px) and (max-height: 799px) {
 		.x-axis .tick text {
 			font-size: 10px;
		}		
 	}

 	@media only screen and (min-height: 800px) {
 		.x-axis .tick text {
			 font-size: 12px;
		}		
	 }

	 @media only screen and (max-width: 768px) {
		 .chart {
			 margin-left: 0px !important;
		 }
	 }
	

</style>

{#if path.length > 1}

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>

		<!-- y axis -->
		<g class="axis y-axis" transform="translate(0,{padding.top})">
			{#each yTicks as tick, i}
				<g class="tick tick-{tick}" transform="translate(5, {yScale(tick) - padding.bottom + 10})">
					<line x2="100%"></line>
					<text y="-4">{formatTick(tick)}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }" transform="translate({xScale(i)},{height - 20})">
					
                    {#if !tick.includes('<br>') }
						<line y1="-30" y2="0" x="0" x2="0"></line>
					{:else if (tick.includes('<br>') && i !== (xTicks.length - 1))}
						<line y1="-{height}" y2="0" x="0" x2="0"></line>
						<text dx=0>{formatText(tick)}</text>
					{/if}
					{#if i === (xTicks.length - 1) }
						<line y1="-{height}" y2="0" x="0" x2="0"></line>
						<text dx=0>{formatLastTick(tick)}</text>
					{/if}	
				</g>
			{/each}
		</g>

		<g class="axis x-axis">
			{#each xTicks as tick, i}
				<g class="tick tick-{ tick }" transform="translate({xScale(i)},{height - 10})">
                    {#if (tick.includes('<br>') && i !== (xTicks.length - 1))}
						<text dx=0>{formatYear(tick)}</text>
					{/if}
					{#if i === (xTicks.length - 1) }
						<text dx=0>{formatLastTickYear(tick)}</text>
					{/if}	
				</g>
			{/each}
		</g>

        <g>
            {#each mthYtdChartData as point, i}
                {#if i == 0 || i == 2}
                <rect 
                    x={xScale(i)}
                ></rect>
                {/if}
            {/each}
        </g>

		<!-- set the circles for the data points -->
		<g>
			{#each chartData as point, i}
				<circle class="enabled" class:heyo cx='{xScale(point.x)}' cy='{yScale(point.y)}' r='5' fill={primary_fill_color}
				on:mouseover={(e) => {showToolTip(i, e.pageX, e.clientY, point) }}
				on:mouseout={hideToolTip} />
			{/each}
		</g>
        
	</svg>
</div>



{:else}
	<h3>Still processing the data ... </h3>
{/if}

<div class="description" id='desc'></div>