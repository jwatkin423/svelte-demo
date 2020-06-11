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

export let data = [];
export let dataTwo = []
export let reportPeriod;
export let year;
export let searchType;

export let chartType = '';

export let showDollar;
$: dollar = showDollar ? '$' : '';

// primary color
export let primary_fill_color = '';
export let secondary_fill_color = '';

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


// second second data set
$: initialMonthTwo = (chartType === 'saleMedianSoldMedian' || chartType === 'supplyDemand') ? parseFloat(dataTwo[0]) : 0;
$: lastMonthTwo = (chartType === 'saleMedianSoldMedian' || chartType === 'supplyDemand') ? dataTwo[dataTwo.length - 1] : 0;
$: changeTwo = (chartType === 'saleMedianSoldMedian' || chartType === 'supplyDemand') ? (lastMonthTwo - initialMonthTwo).toFixed(toFixed) : 0;
$: chngPercentTwo = (chartType === 'saleMedianSoldMedian' || chartType === 'supplyDemand') ? changePercentage(changeTwo, initialMonthTwo) : 0;


// month year-to-date data set one
$: yearOne = data[1];
$: yearTwo = data[3];
$: monthTwo = data[2];

$: monthDate = formatMonthOnly(reportPeriod[0]);

$: mthChange = (monthTwo - initialMonth).toFixed(toFixed);
$: ytdChange = (data[3] - data[1]).toFixed(toFixed);
$: percentMnthChange = mnthYtdChangePercentage(mthChange, initialMonth);
$: percentYtdChange = mnthYtdChangePercentage(ytdChange, yearOne);

// month year-to-date data set one
$: yearOneDsT = dataTwo[1];
$: yearTwoDsT = dataTwo[3];
$: monthTwoDsT = dataTwo[2];

$: mthChangeDsT = (monthTwoDsT - initialMonth).toFixed(toFixed);
$: ytdChangeDsT = (dataTwo[3] - dataTwo[1]).toFixed(toFixed);
$: percentMnthChangeDsT = mnthYtdChangePercentage(mthChangeDsT, initialMonthTwo);
$: percentYtdChangeDsT = mnthYtdChangePercentage(ytdChangeDsT, yearOneDsT);

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

</script>

<style>

/* Desktop */
@media only screen and (min-width: 1025px) {
    .table-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: 80%;
        height: 60px;
    }

    table {
        /* margin-top: 10px; */
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
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 800;
        width: 150px;
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
        width: 150px;
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
        width: 150px;
        color: #666666;
        vertical-align: unset;
    }

    .td-mnth-ytd {
        height: 14px !important;
        line-height: 14px !important;
        font-size: 14px !important;
        width: 150px;
    }

    .td-double-kmi {
        height: 14px !important;
        line-height: 14px !important;
        font-size: 14px !important;
        width: 108px;
    }
    
    .td-lead {
        text-align: right;
    }
}

@media only screen and (max-width: 1024px) and (min-width: 481px) {
    .table-wrapper {
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
    .table-wrapper {
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



<div class="table-wrapper">

{#if data.length !== 0 && searchType !== 'mnth-ytd'}
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
                {chngPercent}
                changeTwo={formatNumber(changeTwo)}
                {chngPercentTwo}
                {primary_fill_color}
                {secondary_fill_color}
            />
        {/if}    
{:else}
    {#if chartType !== 'saleMedianSoldMedian' && chartType !== 'supplyDemand'}
        <DivDisplayMnthYtd 
            rpOne={formatYear(reportPeriod[0])} 
            rpTwo={formatYear(reportPeriod[2])}
            initMonth={formatNumber(data[0])}
            lastMonth={formatNumber(data[2])}
            initMonthTwo={formatNumber(data[1])}
            lastMonthTwo={formatNumber(data[3])}
            {monthDate}
            {mthChange}
            {percentMnthChange}
            {ytdChange}
            {percentYtdChange}
            {primary_fill_color}
            {secondary_fill_color}
        />
    {:else}
        <!-- DsT -->
        <!-- 
            $: yearOneDsT = dataTwo[1];
            $: yearTwoDsT = dataTwo[3];
            $: monthTwoDsT = dataTwo[2];

            $: mthChangeDsT = (monthTwoDsT - initialMonth).toFixed(toFixed);
            $: ytdChangeDsT = (dataTwo[3] - dataTwo[1]).toFixed(toFixed);
            $: percentMnthChangeDsT = mnthYtdChangePercentage(mthChangeDsT, initialMonthTwo);
            $: percentYtdChangeDsT = mnthYtdChangePercentage(ytdChangeDsT, yearOneDsT);
         -->
        <DoubleDivDisplayMnthYtd
            rpOne={formatYear(reportPeriod[0])} 
            rpTwo={formatYear(reportPeriod[2])}
            initMonth={formatNumber(data[0])}
            lastMonth={formatNumber(data[2])}
            initMonthTwo={formatNumber(data[1])}
            lastMonthTwo={formatNumber(data[3])}
            {monthDate}
            {mthChange}
            {percentMnthChange}
            {ytdChange}
            {percentYtdChange}
            {mthChangeDsT}
            {percentMnthChangeDsT}
            {ytdChangeDsT}
            {percentYtdChangeDsT}
            {primary_fill_color}
            {secondary_fill_color}
        />
    {/if}
{/if}
</div>