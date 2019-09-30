<script>
// data from DDS
export let ddsData;

// imports
import ChartTitleBar from '../components/ChartTitleBar.svelte';
import Link from '../components/Link.svelte';
import NewChart from '../charts/newChart.svelte';
import LineChart from '../charts/lineChart.svelte';
import { tickMarks } from '../utils/_utils';
import { onMount } from 'svelte';
import Test from '../main/test.svelte';
import chartStore from '../utils/chart-store';
import Table  from '../components/Table.svelte';

let yTicks = '';

let keys = ddsData.keys;
let reportPeriod = ddsData.reportPeriod;
let rpTest = ddsData.reportPeriod;
let p_color = ddsData.p_color;
let chartData = ddsData.chartData;
let disclaimer = ddsData.strDisclaimer;

let title = ddsData.title;
let chartTitle;
let barData = '';
let barChartData = '';
let yT = [];
let mappedPoints;
let mPoints;
$: mappedPoints = mPoints;

$: barData = barChartData;
$: yT = [...yTicks];

onMount(() => {
	// get keys of the different charts
	let keys = Object.keys(ddsData.chartData);
	// set the initial chart
	let key = keys[0];
	// draw chart
	drawChart(key, 1);
});

function drawChart(event, initial = 0) {
	let key = '';

	if (initial) {
		key = event;
	} else {
		key = event.detail.text;
	}

	const setData = ddsData.chartData[key].data;

	barChartData = {
	 	data: setData,
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
	let tmpEl = '';
	let maxValue = Math.max.apply(null, data);
	return tickMarks(maxValue)
}

</script>

<style>

 	ul {
   		list-style-type: none;
  	}
     /* main content area */
     .content-area {
		max-width: 1280px;
		display: flex;
		margin: auto;
		max-height: 1024px;
     }

	/* chart title */
	/* .chart-title {
		height: 40px;
		width: 100%;
		/* position: relative;
		
		float: left;
	}

	.report-area {
		position: relative;
		width: 100%;
		/* max-width: 1280px;
		float: left;
		clear: left; 
	} */

	.chart-title-h3 {
		text-align: center;
	}

     .td-sidebar {
         width: 202px;
         display: inline-block;
         position: relative;
         margin-right: 0;
         margin-left: 10px;
 	}
	
     .sidebar-title-area {
         background-color: #ffffff;
         height: 25px;
         margin-bottom: 5px;
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

	/* div.table-area {
		width: 1048px;
		display: table;
	} */


	@media only screen and (max-width: 1024px) {
 		.td-sidebar {
 			display: none;
		}		
 	}

 	@media only screen and (max-height: 399px) {
		.content-area {
 			height: 100%;
 		}
 	}

 	@media only screen and (min-height: 400px) and   (max-height: 799px) {
 		.content-area {
 			height: 400px;
 		}
 	}

 	@media only screen and (min-height: 800px) {
 		.content-area {
 			height: 700px;
 		}
		.report-area {
			width: 100%;
		} 
 	}

 </style>



{#if ddsData}

<div class="content-area">
	<!-- <div class="chart-title">
		<h3 class="chart-title-h3">{chartTitle}</h3>
	</div> -->
	<!-- <div class="report-area"> -->
		<div class="td-sidebar">
			<div class="sidebar-title-area">
				<h3 class="sidebar-menu-title text-center" style="color:{p_color};">{title} </h3>
			</div>
			<div class="sidebar-menu-links">
				<ul>
					<Link data={chartData} keys={keys} on:l={drawChart}/>
				</ul>
			</div>
		</div>
		
		<Test data={barData.data} reportPeriod={reportPeriod} p_color={p_color} yPoints={yT} mappedPoints={mappedPoints}/>
		<!-- <Table tableData={ddsData} /> -->
	<!-- </div> -->
</div>

{/if}