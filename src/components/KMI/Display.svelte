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
export let primary_fill_color = '';
export let secondary_fill_color = '';

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
			num = Number(Math.round(num + 'e' + 1) + 'e-1').toFixed(1);
            num = num + "B";
        }
        // millions
        else if(Math.abs(num) >= 1000000 && Math.abs(num) < 1000000000) {
			num /= 1000000;
			num = Number(Math.round(num + 'e' + 1) + 'e-1').toFixed(1);
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
        if (!showChart) {
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
        if (!showTable) {
            table.style.display = 'none';
        } else {
            table.style.display = 'block';
        }
    }
}

</script>

<style>

    .kmi-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: 80%;
        height: 60px;
    }

    .kmi-wrapper-double {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: calc(100% - 30px);
        height: 80px;
        float: left;
    }

    .button-wrapper {
        width: 10%;
        display: table-cell;
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

    .div-buffer {
        width: 10%;
    }

    .button {
        margin-right: 10px;
    }

    .button-small {
        display: inline-flex;
    }


/* Desktop only settings */
@media only screen and (min-width: 1025px) {
}

@media only screen and (max-width: 1024px) and (min-width: 481px) {
    .kmi-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: 80%;
    }

    table {
        margin-left: auto;
        margin-right: auto;
        height: 50px;
        border-collapse: collapse;
    }

    .table-mnth-ytd {
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
    }

    th {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 600;
        width: 125px;
        color: #666666;
        text-align: center;
        padding-bottom: 3px;
        padding-top: 12px;
    }

    .th-double-kmi {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 800;
        width: 108px;
        color: #666666;
        text-align: center;
        padding-bottom: unset !important;
        padding-top: 5px;
    }

    .th-mnth-ytd {
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 800;
        width: 125px;
        color: #666666;
        text-align: center;
        padding-bottom: unset !important;
        padding-top: 5px;
    }

    td {
        padding-top: 3px;
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 600;
        width: 125px;
        color: #666666;
        vertical-align: unset;
    }

    .td-double-kmi {
        height: 14px !important;
        line-height: 14px !important;
        font-size: 14px !important;
        width: 108px;
    }

    .td-mnth-ytd {
        height: 14px !important;
        line-height: 14px !important;
        font-size: 14px !important;
        width: 125px;
    }

    .td-lead {
        text-align: right;
    }
}

@media only screen and (max-width: 480px) {
    .kmi-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: 80%;
    }

    table {
        margin-left: auto;
        margin-right: auto;
        height: 50px;
        border-collapse: collapse;
    }

    .table-mnth-ytd {
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    th {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 600;
        width: 75px;
        color: #666666;
        text-align: center;
        padding-bottom: 3px;
        padding-top: 12px;
    }

    .th-mnth-ytd {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 800;
        width: 75px;
        color: #666666;
        text-align: center;
        padding-bottom: unset !important;
        padding-top: 5px;
    }

    i {
        font-size: 8px;
    }

    td {
        padding-top: 3px;
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 15px;
        font-weight: 600;
        width: 75px;
        color: #666666;
        vertical-align: unset;
    }

    .td-mnth-ytd {
        height: 12px !important;
        line-height: 12px !important;
        font-size: 12px !important;
        width: 75px;
    }

    .td-lead {
        text-align: right;
    }
}


</style>



{#if data.length !== 0 && searchType !== 'mnth-ytd'}
    <div class="div-buffer"></div>
    <div class="kmi-wrapper">
        {#if chartType !== 'saleMedianSoldMedian' && chartType !== 'supplyDemand'}
            <DivDisplay 
                rpOne={formatMonth(reportPeriod[0])}
                rpTwo={formatLastPeriod(reportPeriod[reportPeriod.length - 1])}
                initMonth={ formatNumber(initialMonth) }
                lastMonth={formatNumber(lastMonth)}
                change={formatNumber(change)}
                {chngPercent}
            />
        {:else}    
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
                {primary_fill_color}
                {secondary_fill_color}
            />
        {/if}
    </div>
    <div class="button-wrapper">
        <a on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="20" height="20" alt='chart toggle' /></a>
        <a on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="20" height="20" alt='table toggle' /></a>
    </div>
{/if}


{#if searchType === 'mnth-ytd'}
   
    {#if (chartType !== 'supplyDemand')}
        <div class="div-buffer"></div>
        <div class="kmi-wrapper">
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
                {primary_fill_color}
                {secondary_fill_color}
            />
        </div>    
        <!-- button or buffer -->
        {#if kmi === 'left'}
            <div class="div-buffer-double"></div>
        {:else}
            <div class="button-wrapper">
                <a class="button" on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="20" height="20" alt='chart toggle' /></a>
                <a class="button" on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="20" height="20" alt='table toggle' /></a>
            </div>
        {/if}

    {:else if (chartType === 'supplyDemand')}
        <!-- <div class="div-buffer-double"></div> -->
        <div class="kmi-wrapper-double">
            <DoubleDivDisplayMnthYtd
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
                {percentYtdChange}
                {primary_fill_color}
                {secondary_fill_color}
                {kmi}
            />
        </div>
        {#if kmi === 'left'}
            <div class="div-buffer-double"></div>
        {:else}
            <div class="button-wrapper-double">
                <a class="button-small" on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="15" height="15" alt='chart toggle' /></a>
                <a class="button-small" on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="15" height="15" alt='table toggle' /></a>
            </div>
        {/if}
    {/if}
{/if}
