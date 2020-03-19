<script>
// data from DDS
export let ddsData;
export let searchType;

// imports
import ChartTitleBar from '../components/ChartTitleBar.svelte';
import Link from '../components/Link.svelte';
import MnthYtd from '../charts/MnthYtd.svelte';
import MnthYtdSmall from '../charts/MnthYtdSmall.svelte';
import MnthYtdTabletPortrait from '../charts/MnthYtdTabletPortrait.svelte';
import MnthYtdTabletLandscape from '../charts/MnthYtdTabletLandscape.svelte';
import { tickMarks } from '../utils/_utils';
import { onMount } from 'svelte';
import Linechart from '../charts/lineChart.svelte';
import chartStore from '../utils/chart-store';
import Table  from '../components/Table.svelte';
import KMI from '../components/KMI.svelte';
import KMIMedium from '../components/KMIMedium.svelte';
import KMISmall from '../components/KMISmall.svelte';
import SmartPhoneChart from '../charts/smartphoneLineChart.svelte';
import TabletPortraitChart from '../charts/tabletPortraitLineChart.svelte';
import TabletLandScapeChart from '../charts/tabletLandscapeLineChart.svelte';

/* 
object from 
the mobile link 
*/
let dLink = {};

let yTicks = '';

let keys = ddsData.keys;
let reportPeriod = ddsData.reportPeriod;
let rpTest = ddsData.reportPeriod;
let p_color = typeof(ddsData.p_color) === undefined ? '#019184' : ddsData.p_color;
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

// right padding for chart
let rpadL;
let rpadM;
let rpadS;

let dollar = false;
let key = '';
$: key = barData.key;

// show/hide the doolar symbol
$: setDollarSymbol(key);
function setDollarSymbol(key) {
	if (key === 'soldMedian' || key === 'soldAvgPriceSquareFt') {
		dollar = true;
	} else {
		dollar = false;
	}
	
}

let screenSize = window.innerWidth; 

$: setChart(width);

function setChart() {
	screenSize = window.innerWidth;
}

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

	if (key !== '' && key !== 'error_code') {
		document.getElementById('m-' + key).click();
	}

	if (key !== 'error_code') {
		const setData = ddsData.chartData[key].data;
		let dt = setData.map((d) => {return d});
		
		rpadL = setData.length == 13 ? -20 : 20;
		rpadM = setData.length == 13 ? 0 : 30;
		rpadS = setData.length == 13 ? 0 : 20;

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
	
	
}

function processPoints (data) {
	let maxValue = Math.max.apply(null, data);
	return tickMarks(maxValue);
}

let width = 1280;
let height = 675;

function formatChartTitle(title) {
	if (title === 'Avg DOM') {
		return 'Average Days on Market';
	}

	return title;
}

</script>

<style>

     /* main content area */
     .content-area {
		max-width: 1280px;
		display: block;
		margin-left: 10px;
		margin-right: 10px;
		max-height: 685px;
     }
	
	.content-inner-wrapper {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.kmi-wrapper {
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		height: 60px;
		background-color: #ffffff;
		margin-left: 10px;
	}

	.chart-wrapper {
		display: flex;
		margin-left: 10px;
		flex-direction: column;
		background-color: #ffffff;
		height: 100%;
		max-height: 560px;
		flex: 1 1 auto;
		flex-basis: 100%;
	}

	/* chart title */
	.chart-title {
		text-align: center;
		height: 40px;
		max-width: 1280px;
		position: relative;
	}

	.chart-title-h3 {
		margin-top: 0;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 40px;
		vertical-align: middle;
		color: #666666;
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
         border-bottom: 1px solid #CCCCCC;
		 display: flex;
 	}
	
 	.sidebar-menu-links {
        background-color: #ffffff;
		padding-top: 10px;
		padding-bottom: 10px;
     }

     .sidebar-menu-title {
         font-size: 14px;
         text-transform: uppercase;
         width: 202px;
		 text-align: center;
		 margin: auto;
     }

	.sidebar-buffer {
		height: 40px;
	}

	.no-data {
		color: #b92f2f;
		text-align: center;
	}

	@media only screen and (max-width: 1289px) {
		.chart-title {
			width: 100%;
		}
	}

	@media only screen and (max-width: 768px) {
 		.td-sidebar, .sidebar-buffer, .sidebar-menu-links, .sidebar-menu-title, .sidebar-title-area {
			 display: none;
		}
		
		.chart-wrapper {
			margin-left: 0 !important;
		}

		.kmi-wrapper {
			margin-left: 0px;
		}
 	}

    @media only screen and (max-width: 768px) {
		.content-inner-wrapper {
			margin-left: 0 !important;
		}
	}

 </style>



{#if "soldUnits" in ddsData.chartData}

	<div class="content-area" bind:clientHeight={height} bind:clientWidth={width}>

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
			<h3 class="chart-title-h3">{chartTitle}</h3>
	</div>
		<div class="content-inner-wrapper">
			<div class="kmi-wrapper">
				{#if screenSize > 1024}
					<KMI 
					data={barData.data} 
					year={year} 
					reportPeriod={reportPeriod}  
					searchType={searchType} 
					p_color={p_color} 
					s_color={s_color}
					showDollar={dollar}
					chartType={barData.key}/>
				{/if}
				{#if screenSize <= 1024 && screenSize >768}
					<KMIMedium 
					data={barData.data} 
					year={year} 
					reportPeriod={reportPeriod}  
					searchType={searchType} 
					p_color={p_color} 
					s_color={s_color}
					showDollar={dollar}
					chartType={barData.key}/>
				{/if}
				{#if screenSize <= 768 && screenSize > 480}
					<KMIMedium
					data={barData.data} 
					year={year} 
					reportPeriod={reportPeriod}  
					searchType={searchType} 
					p_color={p_color} 
					s_color={s_color}
					showDollar={dollar}
					chartType={barData.key}/>
				{/if}
				{#if screenSize <= 480}
					<KMISmall 
					data={barData.data} 
					year={year} 
					reportPeriod={reportPeriod}  
					searchType={searchType} 
					p_color={p_color} 
					s_color={s_color}
					showDollar={dollar}
					chartType={barData.key}/>
				{/if}
			</div>
			
			{#if searchType !== 'mnth-ytd'}
				{#if screenSize > 1024}
					<Linechart 
						data={barData.data} 
						reportPeriod={reportPeriod} 
						p_color={p_color} 
						s_color={s_color} 
						yPoints={yT} 
						mappedPoints={mappedPoints} 
						showDollar={dollar}
						reportYear={year}
						rightPadding={rpadL}
						chartType={barData.key}/>
				{/if}
				{#if screenSize <= 1024 && screenSize >768}
					<TabletLandScapeChart 
						data={barData.data} 
						reportPeriod={reportPeriod} 
						p_color={p_color} 
						s_color={s_color} 
						yPoints={yT} 
						mappedPoints={mappedPoints} 
						showDollar={dollar}
						reportYear={year}
						rightPadding={rpadM}
						chartType={barData.key}/>
				{/if}
				{#if screenSize <= 768 && screenSize > 480}
					<TabletPortraitChart 
						data={barData.data} 
						reportPeriod={reportPeriod} 
						p_color={p_color} 
						s_color={s_color} 
						yPoints={yT} 
						mappedPoints={mappedPoints} 
						showDollar={dollar}
						reportYear={year}
						rightPadding={rpadM}
						chartType={barData.key}/>
				{/if}
				{#if screenSize <= 480}
					<SmartPhoneChart 
						data={barData.data} 
						reportPeriod={reportPeriod} 
						p_color={p_color} 
						s_color={s_color} 
						yPoints={yT} 
						mappedPoints={mappedPoints} 
						showDollar={dollar}
						reportYear={year}
						rightPadding={rpadS}
						chartType={barData.key}/>
				{/if}
				
			{:else}	
				{#if screenSize > 1024}
					<div class="chart-wrapper">
					<MnthYtd 
						data={barData.data} 
						reportPeriod={reportPeriod} 
						p_color={p_color} 
						s_color={s_color} 
						showDollar={dollar}
						yPoints={yT} 
						mappedPoints={mappedPoints} 
						reportYear={year}
						chartType={barData.key}/>
				</div>
				{/if}
				{#if screenSize > 768 && screenSize <= 1024}
					<div class="chart-wrapper">
						<MnthYtdTabletLandscape
							data={barData.data} 
							reportPeriod={reportPeriod} 
							p_color={p_color} 
							s_color={s_color} 
							showDollar={dollar}
							yPoints={yT} 
							mappedPoints={mappedPoints} 
							reportYear={year}
							chartType={barData.key}/>
					</div>
				{/if}
				{#if screenSize > 480 && screenSize <= 768}
					<div class="chart-wrapper">
						<MnthYtdTabletPortrait 
							data={barData.data} 
							reportPeriod={reportPeriod} 
							p_color={p_color} 
							s_color={s_color} 
							showDollar={dollar}
							yPoints={yT} 
							mappedPoints={mappedPoints} 
							reportYear={year}
							chartType={barData.key}/>
					</div>
				{/if}
				{#if screenSize <= 480}
					<div class="chart-wrapper">
						<MnthYtdSmall 
							data={barData.data} 
							reportPeriod={reportPeriod} 
							p_color={p_color} 
							s_color={s_color} 
							showDollar={dollar}
							yPoints={yT} 
							mappedPoints={mappedPoints} 
							reportYear={year}
							chartType={barData.key}/>
					</div>
				{/if}
				
			{/if}	
			
		</div>
</div>

{:else}
	<div class="content-area" bind:clientHeight={height} bind:clientWidth={width}>
	<div class="no-data">
		<h3>There is either no data or incomplete data for this search criteria</h3>
	</div>
	</div>
{/if}