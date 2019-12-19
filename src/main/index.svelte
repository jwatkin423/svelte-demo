<script>
// data from DDS
export let ddsData;
export let searchType;

// imports
import ChartTitleBar from '../components/ChartTitleBar.svelte';
import Link from '../components/Link.svelte';
import MnthYtd from '../charts/newChart.svelte';
import { tickMarks } from '../utils/_utils';
import { onMount } from 'svelte';
import Linechart from '../charts/lineChart.svelte';
import chartStore from '../utils/chart-store';
import Table  from '../components/Table.svelte';
import KMI from '../components/KMI.svelte';
import NewLineCharts from '../main/newLineChart.svelte';

/* 
object from 
the mobile link 
*/
let dLink = {};

let yTicks = '';

let keys = ddsData.keys;
let reportPeriod = ddsData.reportPeriod;
let rpTest = ddsData.reportPeriod;
let p_color = ddsData.p_color;
let s_color = ddsData.s_color;
let chartData = ddsData.chartData;
let disclaimer = ddsData.strDisclaimer;
export let mobileKey = 'has not been set';

let title = ddsData.title;
let year = '';
$: year = ddsData.year;
let chartTitle = '';
let barData = '';
let barChartData = '';
let yT = [];
let mappedPoints;
let mPoints;
$: mappedPoints = mPoints;

$: barData = barChartData;
$: yT = [...yTicks];

$: dollar = (barData.key === 'soldMedian' || barData.key === 'soldAvgPriceSquareFt') ? true : false;

onMount(() => {
	// get keys of the different charts
	let keys = Object.keys(ddsData.chartData);
	// set the initial chart
	let key = keys[0];
	// draw chart
	drawChart(key, 1);
});

function setKey (key) {
	if (key) {
		drawChart(key, 1);
	}
}

// set the key to draw the chart
$: setKey(mobileKey);

function drawChart(event, initial = 0) {

	let key = '';

	if (initial) {
		key = event;
	} else {
		key = event.detail.text;
	}

	document.getElementById('m-' + key).click();

	const setData = ddsData.chartData[key].data;
	let dt = setData.map((d) => {return d});

	barChartData = {
	 	data: dt,
	 	key: key,
	 	label: ddsData.chartData[key].label,
		p_color: p_color
	};

	chartTitle = ddsData.chartData[key].label;
	
	mPoints = setData.map( (el, i) => {
				el /= 1;
			return {y: el, x: i};
	});

	yTicks = processPoints(setData);
}

function processPoints (data) {
	let maxValue = Math.max.apply(null, data);
	return tickMarks(maxValue)
}

</script>

<style>

     /* main content area */
     .content-area {
		max-width: 1280px;
		display: block;
		margin-left: 10px;
		margin-right: 10px;
		height: 675px;
     }
	
	.content-inner-wrapper {
		display: flex;
		flex-direction: column;
		height: 635px;
	}

	.kmi-wrapper {
		height: 60px;
		line-height: 60px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
	}

	.chart-wrapper {
		display: flex;
		margin-left: 10px;
		flex-direction: column;
		border: 1px solid green;
		height: 100%;
		max-height: 560px;
		flex: 1 1 auto;
		flex-basis: 100%;
	}

	/* chart title */
	.chart-title {
		height: 40px;
		max-width: 1280px;
		position: relative;
		line-height: 40px;
	}

	.chart-title-h3 {
		text-align: center;
		margin-top: 0;
		margin-bottom: 0;
	}

     .td-sidebar {
         width: 202px;
		 float: left;
		 margin-top: 0px;
 	}
	
	ul {
		list-style-type: none;
		padding-top: 0;
		padding-bottom: 0;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 5px;
	}

     .sidebar-title-area {
         background-color: #ffffff;
         height: 25px;
         margin-bottom: 1px;
		 display: flex;
 	}
	
 	.sidebar-menu-links {
        background-color: #ffffff;
		padding-top: 10px;
		padding-bottom: 10px;
     }

     .sidebar-menu-title {
         font-size: 16px;
         text-transform: uppercase;
         width: 202px;
		 text-align: center;
		 margin: auto;
     }


	@media only screen and (max-width: 1289px) {
		.chart-title {
			width: 100%;
		}
	}

	@media only screen and (max-width: 768px) {
 		.td-sidebar {
 			display: none;
		}
		
		.chart-wrapper {
			margin-left: 0 !important;
		}

		.content-area {
			 margin-left: 0 !important;
			 margin-right: 0 !important;
		 } 
		
 	}

 	@media only screen and (max-height: 399px) {
		.content-area {
			 height: 50%;
 		}
 	}

 	@media only screen and (min-height: 400px) and (max-height: 799px) {
 		.content-area {
			 height: 100%;
 		}
 	}

 	@media only screen and (max-height: 800px) {
 		.content-area {
			 height: 75%;
		 } 

		 .chart-wrapper {
			 height: 100%;
		 }

		 .content-inner-wrapper {
			 height: calc(100% - 50px) !important;
		 }
	}
	 
	@media only screen and (max-width: 768px) {
		.kmi-wrapper {
			display: inline-block !important;
			width: 100%;
		}
	}

	.sidebar-buffer {
		height: 40px;
	}
 </style>



{#if ddsData}

<div class="content-area">

	<div class="td-sidebar">
		<div class="sidebar-buffer"></div>
		<div class="sidebar-title-area">
			<h3 class="sidebar-menu-title text-center" style="color:{p_color};">{title} </h3>
		</div>
		<div class="sidebar-menu-links">
			<ul>
				<Link data={chartData} keys={keys} on:l={drawChart}/>
			</ul>
		</div>
		
	</div>
	<div class="chart-title">
			<h3 class="chart-title-h3">{chartTitle.toUpperCase()}</h3>
	</div>
		<div class="content-inner-wrapper">
			<div class="kmi-wrapper">
				<KMI 
					data={barData.data} 
					year={year} 
					reportPeriod={reportPeriod}  
					searchType={searchType} 
					p_color={p_color} 
					s_color={s_color}
					showDollar={dollar}
					chartType={barData.key}/>
			</div>
			
			{#if searchType !== 'mnth-ytd'}
				<Linechart 
					data={barData.data} 
					reportPeriod={reportPeriod} 
					p_color={p_color} 
					s_color={s_color} 
					yPoints={yT} 
					mappedPoints={mappedPoints} 
					showDollar={dollar}
					reportYear={year}/>
			{:else}	
			<div class="chart-wrapper"> -->
				<MnthYtd 
					data={barData.data} 
					reportPeriod={reportPeriod} 
					p_color={p_color} 
					s_color={s_color} 
					yPoints={yT} 
					mappedPoints={mappedPoints} 
					reportYear={year}/>
			</div>
			{/if}	
			
		</div>
</div>

{/if}