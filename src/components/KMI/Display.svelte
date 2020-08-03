<script>

import Icon from "../Icon.svelte";
import ChangeArrows  from '../ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';
// line graphs
import DivDisplay from './DisplayDiv.svelte';
import DoubleDivDisplay from './DisaplyDoubleDiv.svelte';
// bar graphs
import DivDisplayMnthYtd from './DivDisplayMnthYtd.svelte';
import DoubleDivDisplayMnthYtd from './DoubleDivDisplayMnthYtd.svelte';

// data sets
export let data = [];
export let dataTwo = []

// report period
export let reportPeriod;
export let year;

// search type
export let searchType;

// chart type
export let chartType = '';

// show dollar sign
export let showDollar;
$: dollar = showDollar ? '$' : '';

// primary color
export let p_color = '';
export let s_color = '';

// kmi number
export let kmi;

let icon = [faCaretUp, faCaretDown, faCircle];

// init data
let count = [];
let change = 'NA';
let chnageTwo = 'NA';
let lastMonth = 1.0;
let lastMonthTwo = 1.0;
let initialMonth = 0.0;
let initialMonthTwo = 0.0;
// mnth yrtd init data
let mthChange = 0;
let percentMnthChange =0;
let ytdChange = 0;
let percentYtdChange = 0;
let monthDate = '';

// first data set
$: toFixed = chartType === 'spOpRatio' ? 2 : 1;
$: initialMonth = parseFloat(data[0]);
$: lastMonth = data[data.length - 1];
$: change = (lastMonth - initialMonth).toFixed(toFixed);
$: chngPercent = changePercentage(change, initialMonth);

// second data set
$: initialMonthTwo = parseFloat(dataTwo[0]);
$: lastMonthTwo = dataTwo[data.length - 1];
$: changeTwo = (lastMonthTwo - initialMonthTwo).toFixed(toFixed);
$: chngPercentTwo = changePercentage(change, initialMonthTwo);

// month year-to-date data set one
$: yearOne = data[1];
$: yearTwo = data[3];
$: monthTwo = data[2];

$: monthDate = formatMonthOnly(reportPeriod[0]);

$: mthChange = (monthTwo - initialMonth).toFixed(toFixed);
$: ytdChange = (data[3] - data[1]).toFixed(toFixed);
$: percentMnthChange = mnthYtdChangePercentage(mthChange, initialMonth);
$: percentYtdChange = mnthYtdChangePercentage(ytdChange, yearOne);

let periodSplits;

function mnthYtdChangePercentage(change, initialMonth, type) {
    let percent = change;
    if (change !== 'NA') {
        
        if ((change == 0.0 || change == 0) && initialMonth != 0) {
            percent = 0;
        } else if (initialMonth == 0 && change != 0) {
            percent = "NA";
        }else if (initialMonth == 0 && change == 0) {
            percent = 0;
        } else {
            if (change >= 0) {
                return Math.ceil(((change / initialMonth) * 100)).toFixed(toFixed);
            } else {
                return Math.ceil(((change / initialMonth) * 100)).toFixed(toFixed);;
            }
        }
    }

    return percent;
}

function changePercentage(change, initialMonth) {
    if (change !== 'NA') {
        
        if (change == 0.0 || change == 0 && initialMonth != 0) {
            return 0;
        } else if (initialMonth == 0 && change != 0) {
            return "NA";
        }else if (initialMonth == 0 && change == 0) {
            return 0;
        } else {
            if (change >= 0) {
                return ((change/initialMonth) * 100).toFixed(toFixed);
            } else {
                return ((change/initialMonth) * 100).toFixed(toFixed).toString().replace(/\-/, '');
            }
        }
    }
}

function formatNumber(num) {
    let origNum = num;

    if (num && num !== 'NA') {

        // Billions
        if (Math.abs(num) >= 1000000000) {
			num /= 1000000000;
			num = Number(Math.floor(num + 'e' + 1) + 'e-1').toFixed(1);
            num = num + "B";
        }
        // millions
        else if(Math.abs(num) >= 1000000 && Math.abs(num) < 1000000000) {
			num /= 1000000;
			num = Number(Math.floor(num + 'e' + 1) + 'e-1').toFixed(1);
            num = num + "M";
        } 
        else if (Math.abs(num) >= 1000 & Math.abs(num) < 1000000) {
			num = parseInt(num / 1000);
            num = num + "K";
        }
        else if (Math.abs(num) < 1000 && chartType !== 'spOpRatio') {
            num = parseInt(num);
        }

        if (chartType !== 'fsldMsi' && chartType !== 'spOpRatio') {

            if (origNum.toString().indexOf('.')) {
                num = num.toString().replace(/\.[0-9]{1}$/, '');
            }
        } else if (chartType === 'fsldMsi') {
            num = origNum;
        }

        if (chartType === 'soldUnits' || chartType === 'newUnits' || chartType === 'ucUnits') {
            origNum = parseInt(origNum);
            if (origNum < 0 ) {
                num = origNum.toString().replace(/\-/, '');
            } else {
                num = origNum.toString();
            }

            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    
    return dollar + num.toString().replace(/\-/, '');
    }
    
    return dollar + num;    
}

function formatMonth(period) {
    let res = period.split("<br>");

    periodSplits = {
		"month": res[0],
		"year": res[1]
    };
    
    return periodSplits.month + " " + periodSplits.year;
}

function formatMonthOnly(period) {
    let res = period.split("<br>");

    periodSplits = {
		"month": res[0],
		"year": res[1]
    };
    
    return periodSplits.month;
}

function formatYear(period) {
    let res = period.split("<br>");

    periodSplits = {
		"month": res[0],
		"year": res[1]
    };
    
    return periodSplits.year;
}

function formatLastPeriod(period) {
    let newPeriod = period + " " + year;

    if (period.includes('<br>')) {
        let res = period.split("<br>");

        periodSplits = {
            "month": res[0],
            "year": res[1]
        };

        newPeriod = periodSplits.month + " " + periodSplits.year;
    }
  
    return newPeriod;
}

function rowType(ct, row) {

    if (row === 1) {
        if(ct === 'supplyDemand') {
            return 'Supply';
        } else {
            return 'For Sale';
        }
    }
    
    if (row === 2) {
        if(ct === 'supplyDemand') {
            return 'Demand';
        } else {
            return 'Sold';
        }
    }
}

let showChart = true;

function toggleDisplayChart() {
    showChart = showChart === true ? false : true;
    let chart = document.querySelector('.chart');
    if (chart) {
        if (!showChart && showTable) {
            chart.style.display = 'none';
        } else {
            chart.style.display = 'block';
        }
    }


}

let showTable = true;

function toggleDisplayTable() {
    showTable = showTable === true ? false : true;
    let table = document.querySelector('.tabular-wrapper');
    if (table) {
        if (!showTable & showChart) {
            table.style.display = 'none';
        } else {
            table.style.display = 'block';
        }
    }
}

</script>

<style>

    .kmi-wrapper-inner {
        display: block;
        text-align: center;
        background-color: #ffffff;
        height: 60px;
    }

    .kmi-wrapper-sd {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: 100%;
        height: 161px;
    }

    .kmi-wrapper-double {
        display: grid;
        text-align: center;
        background-color: #ffffff;
        height: 80px;
        width: 100%;
    }

    .right{
        grid-template-columns: 100%; 
    }

    .left {
        grid-template-columns: 100%;
    }
    
    .button-wrapper {
        width: 10%;
        display: table-cell;
        margin-right: 10px;
        line-height: 60px;
        vertical-align: bottom;
        text-align: right;
    }

    .button-wrapper-double {
        width: 10px;
        text-align: right;
        margin-right: 10px;
        margin-left: 5px;
        margin-top: auto;
        margin-bottom: auto;
    }

    .button {
        margin-right: 10px;
    }

    .button-small {
        display: inline-flex;
    }


    /* Desktop only settings */
    @media only screen and (min-width: 1025px) {
        .kmi-wrapper-inner {
            display: grid;
            grid-template-columns: auto;
            text-align: center;
            background-color: #ffffff;
            width: 100%;
        }

        .kmi-wrapper-inner-double {
            display: grid;
            grid-template-columns: 120px auto;
            grid-gap: 54px;
            background-color: #ffffff;
            width: 100%;
        }
    }

    @media only screen and (max-width: 1024px) and (min-width: 481px) {
        .kmi-wrapper {
            display: block;
            text-align: center;
            background-color: #ffffff;
            width: 80%;
        }

        .kmi-wrapper-inner {
            display: grid;
            grid-template-columns: auto;
            text-align: center;
            background-color: #ffffff;
            width: 100%;
        }

        .kmi-wrapper-inner-double {
            display: grid;
            grid-template-columns: 120px auto;
            grid-gap: 54px;
            background-color: #ffffff;
            width: 100%;
        }

    }

    @media only screen and (max-width: 1023px) {
        .button-wrapper {
            display: none;
        }

        .kmi-wrapper {
            width: 100%;
        }
    }

    /* Smart Phones */
    @media only screen and (max-width: 480px) {
        .kmi-wrapper-inner {
            display: grid;
            grid-template-columns: auto;
            text-align: center;
            background-color: #ffffff;
            width: 100%;
        }

        .kmi-wrapper-sd {
            height: 131px;
        }
    }

</style>

{#if data.length !== 0 && searchType !== 'mnth-ytd'}
        {#if chartType !== 'saleMedianSoldMedian' && chartType !== 'supplyDemand'}
            <div class="kmi-wrapper-inner">
                <DivDisplay 
                    rpOne={formatMonth(reportPeriod[0])}
                    rpTwo={formatLastPeriod(reportPeriod[reportPeriod.length - 1])}
                    initMonth={ formatNumber(initialMonth) }
                    lastMonth={formatNumber(lastMonth)}
                    change={formatNumber(change)}
                    {chngPercent}
                />
            </div>
        {:else}    
            <div class="kmi-wrapper-inner">
                <DoubleDivDisplay
                    rpOne={formatMonth(reportPeriod[0])}
                    rpTwo={formatLastPeriod(reportPeriod[reportPeriod.length - 1])}
                    initMonth={formatNumber(initialMonth)}
                    lastMonth={formatNumber(lastMonth)}
                    initMonthTwo={formatNumber(initialMonthTwo)}
                    lastMonthTwo={formatNumber(lastMonthTwo)}
                    change={formatNumber(change)}
                    changeTwo={formatNumber(changeTwo)}
                    {chngPercent}
                    {chngPercentTwo}
                    {p_color}
                    {s_color}
                />
            </div>
        {/if}
    <div class="button-wrapper">
        <a on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="20" height="20" alt='chart toggle' /></a>
        <a on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="20" height="20" alt='table toggle' /></a>
    </div>
{/if}


{#if searchType === 'mnth-ytd'}
   
    {#if (chartType !== 'supplyDemand')}
        <div class="kmi-wrapper-inner">
            <DivDisplayMnthYtd
                rpOne={formatYear(reportPeriod[0])} 
                rpTwo={formatYear(reportPeriod[2])}
                initMonth={formatNumber(data[0])}
                lastMonth={formatNumber(data[2])}
                initMonthTwo={formatNumber(data[1])}
                lastMonthTwo={formatNumber(data[3])}
                {monthDate}
                mthChange={formatNumber(mthChange)}
                percentMnthChange={formatNumber(percentMnthChange)}
                ytdChange={formatNumber(ytdChange)}
                percentYtdChange={formatNumber(percentYtdChange)}
                {p_color}
                {s_color}
            />
        </div>    
        <!-- button or buffer -->
        {#if kmi !== 'left' || kmi !== 'bottom' || kmi !== 'bottom'}
            <div class="button-wrapper">
                <a class="button" on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="20" height="20" alt='chart toggle' /></a>
                <a class="button" on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="20" height="20" alt='table toggle' /></a>
            </div>
        {/if}

    {:else if (chartType === 'supplyDemand' && kmi !== 'bottom' && kmi !== 'top')}
        <div class:right={kmi === 'right'} class:left={kmi === 'left'} class="kmi-wrapper-double">
            <DoubleDivDisplayMnthYtd
                rpOne={formatMonth(reportPeriod[0])} 
                rpTwo={formatMonth(reportPeriod[2])}
                mnth={formatMonthOnly(reportPeriod[0])}
                initMonth={formatNumber(data[0])}
                lastMonth={formatNumber(data[2])}
                initMonthTwo={formatNumber(data[1])}
                lastMonthTwo={formatNumber(data[3])}
                {monthDate}
                mthChange={formatNumber(mthChange)}
                percentMnthChange={formatNumber(percentMnthChange)}
                ytdChange={formatNumber(ytdChange)}
                {percentYtdChange}
                {p_color}
                {s_color}
                {kmi}
            />
        </div>
        
    {:else if (chartType === 'supplyDemand' && (kmi === 'bottom' || kmi === 'top'))}
            <div class="kmi-wrapper-sd">
            <DoubleDivDisplayMnthYtd
                rpOne={formatMonth(reportPeriod[0])} 
                rpTwo={formatMonth(reportPeriod[2])}
                mnth={formatMonthOnly(reportPeriod[0])}
                initMonth={formatNumber(data[0])}
                lastMonth={formatNumber(data[2])}
                initMonthTwo={formatNumber(data[1])}
                lastMonthTwo={formatNumber(data[3])}
                {monthDate}
                mthChange={formatNumber(mthChange)}
                percentMnthChange={formatNumber(percentMnthChange)}
                ytdChange={formatNumber(ytdChange)}
                {percentYtdChange}
                {p_color}
                {s_color}
                {kmi}
            />
        </div>   
        {#if kmi === 'left' || kmi === 'bottom' || kmi === 'top'}
            <div class="div-buffer-double"></div>
        {:else}
            <div class="button-wrapper-double">
                <a class="button-small" on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="15" height="15" alt='chart toggle' /></a>
                <a class="button-small" on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="15" height="15" alt='table toggle' /></a>
            </div>
        {/if}
    {/if}
    <!-- end of supply demmand -->
{/if}
