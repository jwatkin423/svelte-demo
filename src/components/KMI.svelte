<script>
import Icon from "./Icon.svelte";
import ChangeArrows  from './ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';

export let data = [];
export let reportPeriod;
export let year;
export let searchType;

// primary color prop
export let p_color = false;
export let s_color = false;

// primary color
let primary_fill_color = '';
let secondary_fill_color = '';
$: primary_fill_color = p_color ? p_color : '#019184';
$: secondary_fill_color = s_color ? s_color :' #666666';

export let showDollar;
$: dollar = showDollar ? '$' : '';

export let chartType = '';


let icon = [faCaretUp, faCaretDown, faCircle];

let count = [];
let change = 'NA';
let lastMonth = 1.0;
let initialMonth = 0.0;

$: toFixed = chartType === 'spOpRatio' ? 2 : 1;
$: initialMonth = parseFloat(data[0]);
$: lastMonth = data[data.length - 1];
$: change = (lastMonth - initialMonth).toFixed(toFixed);
$: monthTwo = data[2];
$: yearOne = data[1];
$: yearTwo = data[3];
$: mthChange = (monthTwo - initialMonth).toFixed(toFixed);
$: chngPercent = changePercentage(change, initialMonth);
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

</script>

<style>
    .table-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
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

    .chng {
        font-size: 16px;
    }

    .td-mnth-ytd {
        height: 14px !important;
        line-height: 14px !important;
        font-size: 14px !important;
        width: 150px;
    }

</style>

<div class="table-wrapper">
    {#if data.length !== 0 && searchType !== 'mnth-ytd'}
    
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