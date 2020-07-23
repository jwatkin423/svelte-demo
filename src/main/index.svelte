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
import MnthYtdTop from '../charts/MnthYtdTbTop.svelte';
import MnthYtdBottom from '../charts/MnthYtdTbBottom.svelte';
import MnthYtdLeft from '../charts/MnthYtdleft.svelte';
import MnthYtdRight from '../charts/MnthYtdRight.svelte';
import MnthYtdTabletLandscape from '../charts/MnthYtdTabletLandscape.svelte';
import { tickMarks } from '../utils/_utils';
import { onMount } from 'svelte';
import Linechart from '../charts/lineChart.svelte';
import LinechartV2 from '../charts/lineChartV2.svelte';
import chartStore from '../utils/chart-store';
import KMI from '../components/KMI.svelte';
import KMIMedium from '../components/KMIMedium.svelte';
import KMISmall from '../components/KMISmall.svelte';
import SmartPhoneChart from '../charts/smartphoneLineChart.svelte';
import TabletPortraitChart from '../charts/tabletPortraitLineChart.svelte';
import TabletLandScapeChart from '../charts/tabletLandscapeLineChart.svelte';
import Datatable from '../tables/Table.svelte';
import MnthYtdMedian from '../charts/MnthYtdMedian.svelte';

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
let s_color = typeof(ddsData.s_color) === undefined ? '#666666' : ddsData.s_color;
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

let mappedPointsTwo;
let mPointsTwo;

$: mappedPoints = mPoints;
$: mappedPointsTwo = mPointsTwo;

let mappedPointsThree;
let mPointsThree;

$: mappedPointsThree = mPointsThree;

let mappedPointsFour;
let mPointsFour;

$: mappedPointsFour = mPointsFour;

$: barData = barChartData;
$: yT = [...yTicks];

// right padding for chart
let rpadL;
let rpadM;
let rpadS;

let dollar = false;
let key = '';
let currentKey = '';

// set kmi ID
let kmi = '';

// show/hide the doolar symbol
// $: setDollarSymbol(key);
function setDollarSymbol(key) {
	if (key === 'soldMedian' 
		|| key === 'soldAvgPriceSquareFt' 
		|| key === 'saleMedianSoldMedian'
		|| key === 'avgSalePrice'
		|| key === 'forSaleMedian'
		|| key === 'soldMedian'
		|| key === 'soldMedian')
		 {
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

	// get the div element
	let ciw = document.querySelector('.content-inner-wrapper');

	// set the correct width on intial load
	width = ciw.offsetWidth;
	
	// draw chart
	genChartData(key, 1);
});

function setKey (key) {
	if (key) {
		genChartData(key, 1);
	}
	setDollarSymbol(key);
}

// set the key to draw the chart
$: setKey(mobileKey);

function genChartData(event, initial = 0) {

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

		let dt = [];
		let dtTwo = [];
		
		if (key === 'saleMedianSoldMedian' && searchType !== 'mnth-ytd') {
			dt = setData.map((d) => { return d[0]/1; });
			dtTwo = setData.map((d) => { return d[1]/1; });

			mPoints = setData.map( (el, i) => {
				return {y: el[0], x: i};
			});

			mPointsTwo = setData.map( (el, i) => {
				return {y: el[1], x: i};
			});
		}

		if (key === 'saleMedianSoldMedian' && searchType === 'mnth-ytd') {
			dt = setData.map((d) => {
					return (d[0] / 1) - (d[1] / 1); 
				});

			mPoints = dt.map( (el, i) => {
				return {y: el[0], x: i};
			});

		}

		else if (key === 'supplyDemand') {
			dt = setData.map((d) => { return d[0]; });
			dtTwo = setData.map((d) => { return d[1]; });

			mPoints = setData.map( (el, i) => {
				el[0] /= 1;
				return {y: el[0], x: i};
			});

			mPointsTwo = setData.map( (el, i) => {
				el[1] /= 1;
				return {y: el[1], x: i};
			});
		}

		else if (key !== '' && key !== 'saleMedianSoldMedian' && key !== 'supplyDemand') {
			dt = setData.map((d) => {return d /=1; });

			mPoints = setData.map( (el, i) => {
				el /= 1;
				return {y: el, x: i};
			});
		} 

		rpadL = setData.length == 13 ? -30 : 20;
		rpadM = setData.length == 13 ? 0 : 30;
		rpadS = setData.length == 13 ? 0 : 20;

		barChartData = {
			data: dt,
			dataTwo: dtTwo,
			key: key,
			label: ddsData.chartData[key].label,
			p_color: p_color,
			s_color: s_color
		};
		currentKey = key;
		chartTitle = ddsData.chartData[key].label;

		yTicks = processPoints(dt);
		
	}
	
}

// process the points
function processPoints (data) {
	let maxValue = Math.max.apply(null, data);
	return tickMarks(maxValue);
}

function processDeltaPoints(data) {
	let maxValue = Math.max.apply(null, data);
	let minValue = Math.min.apply(null, data);

	return tickMarksDeltas(maxValue, minValue);
}

let width = window.innerWidth;
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
		/* max-width: 1280px; */
		display: block;
		margin-left: 10px;
		margin-right: 10px;
		/* max-height: 685px; */
     }
	
	.content-inner-wrapper {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.kmi-wrapper {
		margin-bottom: 10px;
		display: flex;
		height: 60px;
		background-color: #ffffff;
		margin-left: 10px;
	}

	.kmi-wrapper-double {
		margin-bottom: 10px;
		display: flex;
		height: 80px;
		background-color: #f2f2f2;
		margin-left: 10px;
	}

	.kmi-div {
		background-color: #ffffff;
	}

	.kmi-div-left {
		width: 50%;
		margin-right: 5px;
		display: flex;
	}

	.kmi-div-right {
		width: 50%;
		margin-left: 5px;
		display: flex;
	}

	.kmi-div-top {
		margin-bottom: 10px;
		display: flex;
	}

	.kmi-div-bottom {
		margin-top: 10px;
		margin-bottom: 10px;
		display: flex;
	}

	.chart-wrapper {
		display: flex;
		margin-left: 10px;
		flex-direction: column;
		background-color: #ffffff;
		height: 100%;
		flex: 1 1 auto;
		flex-basis: 100%;
	}

	.chart-wrapper-blank {
		display: grid;
		grid-template-columns: 50% 50%;
		margin-left: 10px;
     	height: 100%;
		max-height: 560px;
	}

	.tabular-wrapper {
		margin-top: 10px;
		margin-left: 10px;
	}

	/* chart title */
	.chart-title {
		text-align: center;
		height: 40px;
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
		padding-left: 0;
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

	@media only screen and (max-width: 1024px) {
 		.td-sidebar, .sidebar-buffer, .sidebar-menu-links, .sidebar-menu-title, .sidebar-title-area {
			 display: none;
		}
		
		.chart-wrapper {
			margin-left: 0 !important;
		}

		.kmi-wrapper {
			margin-left: 0px;
		}

		.tabular-wrapper {
			margin-left: 0px;
		}
 	}

    @media only screen and (max-width: 1024px) {
		.content-inner-wrapper {
			margin-left: 0 !important;
		}
	}

 </style>

<!-- DATA DISPLAY SECTION -->
{#if "soldUnits" in ddsData.chartData}

	<div class="content-area" >

	<div class="td-sidebar">
		<div class="sidebar-buffer"></div>
		<div class="sidebar-title-area">
			<h3 class="sidebar-menu-title text-center" style="color:{p_color};">{title} </h3>
		</div>
		<div class="sidebar-menu-links">
			<ul>
				<Link data={chartData} keys={keys} on:l={genChartData}/>
			</ul>
		</div>
		
	</div>
	<div class="chart-title">
			<h3 class="chart-title-h3">{chartTitle}</h3>
	</div>
		<div class="content-inner-wrapper" bind:clientHeight={height} bind:clientWidth={width}>
			<!-- KMI Section Line graphs-->
			{#if searchType !== 'mnth-ytd'}
				<div class="kmi-wrapper">
					<KMI 
						data={barData.data}
						dataTwo={barData.dataTwo}
						year={year}
						reportPeriod={reportPeriod}
						searchType={searchType}
						{p_color}
						{s_color}
						showDollar={dollar}
						chartType={barData.key} 
					/>
				</div>
			{/if}
			<!-- End of KMI Section (sans supplyDemand) -->

			{#if currentKey !== 'supplyDemand' && searchType === 'mnth-ytd'}
				<div class="kmi-wrapper">
					<KMI 
						data={barData.data}
						dataTwo={barData.dataTwo}
						year={year}
						reportPeriod={reportPeriod}
						searchType={searchType}
						{p_color}
						{s_color}
						showDollar={dollar}
						chartType={barData.key} 
					/>
				</div>
			{/if}

			<!-- KMI section for supplyDemand Desktop -->
			{#if currentKey === 'supplyDemand' && screenSize >= 1024 && searchType === 'mnth-ytd'}
				<div class="kmi-wrapper-double">
					<div class="kmi-div kmi-div-left">
						<KMI 
							data={barData.data}
							year={year} 
							reportPeriod={reportPeriod}  
							searchType={searchType} 
							{p_color} 
							{s_color}
							showDollar={dollar}
							chartType={barData.key}
							kmi={'left'}
						/>
					</div>
					<div class="kmi-div kmi-div-right">
						<KMI 
							data={barData.dataTwo}
							year={year} 
							reportPeriod={reportPeriod}  
							searchType={searchType} 
							{p_color} 
							{s_color}
							showDollar={dollar}
							chartType={barData.key}
							kmi={'right'}
						/>
					</div>
				</div>
			{/if}
			<!-- End of KMI section for supplyDemand Desktop -->

			<!-- Line Charts -->
			{#if searchType !== 'mnth-ytd'}
				{#if screenSize > 1024}
					<LinechartV2
						data={barData.data}
						dataTwo={barData.dataTwo}
						reportPeriod={reportPeriod} 
						reportYear={year}
						p_color={p_color} 
						s_color={s_color} 
						yPoints={yT} 
						mappedPoints={mPoints}
						mappedPointsTwo={mPointsTwo}
						showDollar={dollar}
						chartType={barData.key} 
						screenSize={width - 10}
						initHeight={575}
						initWidth={1048}
						margins={{top: 35, right: 30, bottom: 35, left: 60}}
						wRatio={1068}
						radius={4}
						/>
				{/if}
				{#if screenSize <= 1024 && screenSize > 768 && currentKey !== 'supplyDemmand'}
						<TabletLandScapeChart
							data={barData.data}
							dataTwo={barData.dataTwo}
							reportPeriod={reportPeriod} 
							reportYear={year}
							p_color={p_color} 
							s_color={s_color} 
							yPoints={yT} 
							mappedPoints={mPoints}
							mappedPointsTwo={mPointsTwo}
							showDollar={dollar}
							chartType={barData.key} 
							{screenSize} 
							initHeight={450}
							initWidth={1004}
							margins={{top: 25, right: 25, bottom: 30, left: 30}}
							wRatio={1024}
							radius={4}
							/>
				{/if}
				{#if screenSize <= 768 && screenSize > 480}
					<TabletPortraitChart 
						data={barData.data}
							dataTwo={barData.dataTwo}
							reportPeriod={reportPeriod} 
							reportYear={year}
							p_color={p_color} 
							s_color={s_color} 
							yPoints={yT} 
							mappedPoints={mPoints}
							mappedPointsTwo={mPointsTwo}
							showDollar={dollar}
							chartType={barData.key} 
							screenSize={width}
							initHeight={450}
							initWidth={1004}
							margins={{top: 25, right: 25, bottom: 30, left: 30}}
							wRatio={1024}
							radius={4}
						/>
				{/if}
				{#if screenSize <= 480}
					<SmartPhoneChart 
						data={barData.data}
							dataTwo={barData.dataTwo}
							reportPeriod={reportPeriod} 
							reportYear={year}
							p_color={p_color} 
							s_color={s_color} 
							yPoints={yT} 
							mappedPoints={mPoints}
							mappedPointsTwo={mPointsTwo}
							showDollar={dollar}
							chartType={barData.key} 
							screenSize={width}
							initHeight={270}
							initWidth={screenSize - 20}
							margins={{ top: 15, right: 20, bottom: 25, left: 20}}
							wRatio={screenSize}
							sideBarWidth={0}
							radius={2}
							/>
				{/if}
				<!-- End of line charts -->
				
            {/if}

			{#if searchType === 'mnth-ytd'}	
				{#if screenSize >= 1024}
					{#if currentKey !== 'supplyDemand'}
						<div class="chart-wrapper">
							<MnthYtdMedian
								data={barData.data}
								reportPeriod={reportPeriod}
								{p_color} 
								{s_color} 
								showDollar={dollar}
								{screenSize}
								/>
						</div>
					{:else}
						<div class="chart-wrapper-blank">
							<MnthYtdLeft 
								data={barData.data}
								reportPeriod={reportPeriod}
								{p_color} 
								{s_color} 
								showDollar={dollar}
								screenSize={width}
								/>

							<MnthYtdRight
								dataTwo={barData.dataTwo}
								reportPeriod={reportPeriod}
								{p_color} 
								{s_color} 
								showDollar={dollar}
								screenSize={width}
								/>	
						</div>
					{/if}
				{/if}
				<!-- {#if screenSize < 1024 && screenSize > 480} -->
				{#if screenSize < 1024}
					{#if currentKey !== 'supplyDemand'}
						<div class="chart-wrapper">
							<MnthYtdTabletPortrait 
								data={barData.data} 
								reportPeriod={reportPeriod} 
								{p_color} 
								{s_color} 
								showDollar={dollar}
								screenSize={width}
								/>
						</div>
					{:else}
						<div class="kmi-div kmi-div-top">
							<KMI 
								data={barData.data}
								year={year} 
								reportPeriod={reportPeriod}  
								searchType={searchType} 
								{p_color} 
								{s_color}
								showDollar={dollar}
								chartType={barData.key}
								kmi={'top'} />
						</div>
						<div class="chart-wrapper">
							<MnthYtdTop
								data={barData.data}
								reportPeriod={reportPeriod}
								{p_color} 
								{s_color} 
								showDollar={dollar}
								screenSize={width}
								/>
						</div>
						<div class="kmi-div kmi-div-bottom">
							<KMI 
								data={barData.dataTwo}
								year={year} 
								reportPeriod={reportPeriod}  
								searchType={searchType} 
								{p_color} 
								{s_color}
								showDollar={dollar}
								chartType={barData.key}
								kmi={'bottom'} />
						</div>
						<div class="chart-wrapper">
							<MnthYtdBottom
								dataTwo={barData.dataTwo}
								reportPeriod={reportPeriod}
								{p_color} 
								{s_color} 
								showDollar={dollar}
								screenSize={width}
								/>
						</div>
					{/if}
				{/if}
			{/if}
			<div class="tabular-wrapper">
				<Datatable {p_color} {chartData} {reportPeriod} key={currentKey} {keys}/>
			</div>
		</div> <!-- content-inner-wrapper -->
</div>

{:else}
	<div class="content-area" bind:clientHeight={height} bind:clientWidth={width}>
	<div class="no-data">
		<h3>There is either no data or incomplete data for this search criteria</h3>
	</div>
	</div>
{/if}