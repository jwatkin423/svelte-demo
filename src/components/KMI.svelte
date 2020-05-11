<script>
import Icon from "./Icon.svelte";
import ChangeArrows  from './ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';

export let data = [];
export let dataTwo = []
export let reportPeriod;
export let year;
export let searchType;

// primary color prop
export let p_color = false;
export let s_color = false;

// primary color
let primary_fill_color = '';
let secondary_fill_color = '';
$: primary_fill_color = p_color;
$: secondary_fill_color = s_color;

export let showDollar;
$: dollar = showDollar ? '$' : '';

export let chartType = '';

let icon = [faCaretUp, faCaretDown, faCircle];

let count = [];
let change = 'NA';
let chnageTwo = 'NA';
let lastMonth = 1.0;
let lastMonthTwo = 1.0;
let initialMonth = 0.0;
let initialMonthTwo = 0.0;

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


// month year-to-date
$: yearOne = data[1];
$: yearTwo = data[3];
$: monthTwo = data[2];
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
    .table-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
        width: 80%;
    }

    .button-wrapper {
        width: 10%;
        display: table-cell;
        line-height: 60px;
        vertical-align: bottom;
    }

    button {
        height: 20px;
    }

    .div-buffer {
        width: 10%;
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

</style>

<div class="div-buffer">
</div>
<div class="table-wrapper">
    {#if data.length !== 0 && searchType !== 'mnth-ytd'}
        {#if chartType !== 'saleMedianSoldMedian' && chartType !== 'supplyDemand'}
        <table>
            <thead>
                <tr>
                    <th>{formatMonth(reportPeriod[0])}</th>
                    <th>{formatLastPeriod(reportPeriod[reportPeriod.length - 1])}</th>
                    <th>Change</th>
                    <th>% Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="inital-month">{ formatNumber(initialMonth) }</td>
                    <td id="last-month">{ formatNumber(lastMonth) } </td>
                    {#if change >= 0}
                        <td id="change">{ formatNumber(change) } <ChangeArrows change={change} /></td>
                    {:else}
                        <td id="change">({ formatNumber(change) }) <ChangeArrows change={change} /></td>
                    {/if}
                    <td>
                        {#if chngPercent !== 'NA' && chngPercent != 0}
                            {#if change >= 0}
                                {chngPercent}%
                                <ChangeArrows change={change} />
                            {:else}
                                ({chngPercent.toString().replace(/\-/, '')}%)
                                <ChangeArrows change={change} />
                            {/if}
                        {:else if chngPercent == 0}
                            0%
                        {:else if chngPercent === 'NA'}
                            NA
                        {/if}
                     </td>
                </tr>
            </tbody>
        </table>
        {:else}
            <table class="table-double-kmi">
                <thead>
                    <tr>
                        <th class="th-double-kmi"></th>
                        <th class="th-double-kmi">{formatMonth(reportPeriod[0])}</th>
                        <th class="th-double-kmi">{formatLastPeriod(reportPeriod[reportPeriod.length - 1])}</th>
                        <th class="th-double-kmi">Change</th>
                        <th class="th-double-kmi">% Change</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- First data set -->
                    <tr>
                        <td class="td-double-kmi td-lead">
                            <i>
                                <Icon customColor={primary_fill_color} class="year" tempId="line-one" icon={icon[2]} />
                            </i>
                            {rowType(chartType, 1)}
                            </td>
                        <td class="td-double-kmi" id="inital-month">{ formatNumber(initialMonth) }</td>
                        <td class="td-double-kmi" id="last-month">{ formatNumber(lastMonth) } </td>
                        {#if change >= 0}
                            <td class="td-double-kmi" id="change">{ formatNumber(change) } <ChangeArrows change={change} /></td>
                        {:else}
                            <td class="td-double-kmi" id="change">({ formatNumber(change) }) <ChangeArrows change={change} /></td>
                        {/if}
                        <td class="td-double-kmi">
                            {#if chngPercent !== 'NA' && chngPercent != 0}
                                {#if change >= 0}
                                    {chngPercent}%
                                    <ChangeArrows change={change} />
                                {:else}
                                    ({chngPercent.toString().replace(/\-/, '')}%)
                                    <ChangeArrows change={change} />
                                {/if}
                            {:else if chngPercent == 0}
                                0%
                            {:else if chngPercent === 'NA'}
                                NA
                            {/if}
                        </td>
                    </tr>
                    <!-- Second data set -->
                    <tr>
                        <td class="td-double-kmi td-lead">
                            <i>
                                <Icon customColor={secondary_fill_color} class="year" tempId="line-two" icon={icon[2]} />
                            </i>
                            {rowType(chartType, 2)}
                        </td>
                        <td class="td-double-kmi" id="inital-month">{ formatNumber(initialMonthTwo) }</td>
                        <td class="td-double-kmi" id="last-month">{ formatNumber(lastMonthTwo) } </td>
                        {#if changeTwo >= 0}
                            <td class="td-double-kmi" id="change">{ formatNumber(changeTwo) } <ChangeArrows change={changeTwo} /></td>
                        {:else}
                            <td class="td-double-kmi" id="change">({ formatNumber(changeTwo) }) <ChangeArrows change={changeTwo} /></td>
                        {/if}
                        <td class="td-double-kmi">
                            {#if chngPercentTwo !== 'NA' && chngPercentTwo != 0}
                                {#if changeTwo >= 0}
                                    {chngPercentTwo}%
                                    <ChangeArrows change={changeTwo} />
                                {:else}
                                    ({chngPercentTwo.toString().replace(/\-/, '')}%)
                                    <ChangeArrows change={changeTwo} />
                                {/if}
                            {:else if chngPercentTwo == 0}
                                0%
                            {:else if chngPercentTwo === 'NA'}
                                NA
                            {/if}
                        </td>
                    </tr>
                </tbody>
            </table>
        {/if}
    {:else}
        <div class="div-mnth-ytd">
            <table class="table-mnth-ytd">
                <thead>
                    <tr>
                        <th class="th-mnth-ytd"></th>
                        <th class="th-mnth-ytd"><i><Icon customColor={primary_fill_color} class="year" tempId="previous-year" icon={icon[2]} /></i>{formatYear(reportPeriod[0])}</th>
                        <th class="th-mnth-ytd"><i><Icon customColor={secondary_fill_color} class="year" tempId="current-year" icon={icon[2]} /></i>{formatYear(reportPeriod[2])}</th>
                        <th class="th-mnth-ytd">Change</th>
                        <th class="th-mnth-ytd">% Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class='td-mnth-ytd'>{formatMonthOnly(reportPeriod[0])}</td>
                        <td class='td-mnth-ytd'>{formatNumber(data[0])}</td>
                        <td class='td-mnth-ytd'>{formatNumber(data[2])}</td>
                        {#if mthChange >= 0}
                            <td class='td-mnth-ytd'>{formatNumber(mthChange)} <ChangeArrows change={mthChange} /></td>
                        {:else if (mthChange < 0) }
                            <td class='td-mnth-ytd'>({formatNumber(mthChange)}) <ChangeArrows change={mthChange} /></td>
                        {:else }
                            0        
                        {/if}
                        <td class='td-mnth-ytd percent-change'>
                            {#if percentMnthChange !== 'NA' && percentMnthChange != 0 && percentMnthChange != 0.0}
                                {#if mthChange > 0}
                                    {percentMnthChange}%
                                    <ChangeArrows change={mthChange} />
                                {:else}
                                    ({percentMnthChange.toString().replace(/\-/, '')}%)
                                    <ChangeArrows change={mthChange} />
                                {/if}
                            {:else if percentMnthChange == 0}
                                    0%  
                            {:else if percentMnthChange === 'NA'}
                                NA
                            {/if}
                        </td>
                    </tr>
                    <tr>
                        <td class='td-mnth-ytd'>YTD</td>
                        <td class='td-mnth-ytd'>{formatNumber(data[1])}</td>
                        <td class='td-mnth-ytd'>{formatNumber(data[3])}</td>
                        {#if ytdChange > 0}
                            <td class='td-mnth-ytd'>{formatNumber(ytdChange)} <ChangeArrows change={ytdChange} /></td>
                        {:else if (ytdChange < 0) }
                            <td class='td-mnth-ytd'>({formatNumber(ytdChange)}) <ChangeArrows change={ytdChange} /></td>
                        {:else }
                            0    
                        {/if}
                        <td class='td-mnth-ytd percent-change'>
                            {#if percentYtdChange !== 'NA' && percentYtdChange != 0 && percentYtdChange != 0.0}
                                {#if ytdChange > 0}
                                    {percentYtdChange}%
                                    <ChangeArrows change={ytdChange} />
                                {:else}
                                    ({percentYtdChange.toString().replace(/\-/, '')}%)
                                    <ChangeArrows change={ytdChange} />
                                {/if}
                            {:else if percentYtdChange == 0}
                                    0%
                            {:else if percentYtdChange === 'NA'}
                                NA
                            {/if} 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    {/if}
</div>
<div class="button-wrapper">
    <a on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="20" height="20" alt='chart toggle' /></a>
    <a on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="20" height="20" alt='table toggle' /></a>
</div>