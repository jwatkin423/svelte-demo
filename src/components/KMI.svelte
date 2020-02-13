<script>
import Icon from "./Icon.svelte";
import ChangeArrows  from './ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';

export let data = [];
export let reportPeriod;
export let year;
export let searchType;

export let p_color;
export let s_color;

export let showDollar;
$: dollar = showDollar ? '$' : '';

export let chartType = '';


let icon = [faCaretUp, faCaretDown, faCircle];

let count = [];

$: toFixed = chartType === 'spOpRatio' ? 2 : 1;
$: initialMonth = data[0];
$: lastMonth = data[data.length - 1];
$: change = (lastMonth - initialMonth).toFixed(1);
$: monthTwo = data[2];
$: mthChange = (monthTwo - initialMonth).toFixed(1);
$: chngPercent = ((change/initialMonth) * 100).toFixed(toFixed);

$: ytdChange = (data[3] - data[1]).toFixed(1);

$: percentMnthChange = Math.ceil(((mthChange / initialMonth) * 100)).toFixed(toFixed);
$: percentYtdChange = Math.ceil(((ytdChange / data[3]) * 100)).toFixed(toFixed);

let periodSplits;

function formatNumber(num) {
    let origNum = num;

    if (num) {

        if (num >= 1000000000) {
			num /= 1000000000;
			num = Number(Math.round(num + 'e' + 1) + 'e-1').toFixed(1);
            num = num + "B";
        }
        else if(num >= 1000000 && num < 1000000000) {
			num /= 1000000;
			num = Number(Math.round(num + 'e' + 1) + 'e-1').toFixed(1);
            num = num + "M";
        } 
        else if (num >= 1000 & num < 1000000) {
			num /= 1000;
			num = Number(Math.round(num + 'e' + 1) + 'e-1');
            num = num + "K";
        }


        if (chartType !== 'fsldMsi' && chartType !== 'spOpRatio') {
            num = num.replace(/\.[0-9]{1}$/, '');
        }

        if (origNum < 0 ) {
            num = num.toString().replace(/\-/, '');
            num =  dollar + num;
        } else {
            num = num.toString();
            num = dollar + num;
        }
    }

    return num;
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
    let newPeriod = period + year;

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
                    <td id="change">{ formatNumber(change) } <ChangeArrows change={change} /></td>
                    <td>
                        {#if change >= 0}
                            {((change/initialMonth) * 100).toFixed(toFixed)}%
                            <ChangeArrows change={change} />
                        {:else}
                            ({((change/initialMonth * 100)).toFixed(toFixed).toString().replace(/\-/, '')}%)
                            <ChangeArrows change={change} />
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
                    <th class="th-mnth-ytd"><i><Icon customColor={p_color} class="year" tempId="previous-year" icon={icon[2]} /></i>{formatYear(reportPeriod[0])}</th>
                    <th class="th-mnth-ytd"><i><Icon customColor={s_color} class="year" tempId="current-year" icon={icon[2]} /></i>{formatYear(reportPeriod[2])}</th>
                    <th class="th-mnth-ytd">Change</th>
                    <th class="th-mnth-ytd">% Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class='td-mnth-ytd'>{formatMonthOnly(reportPeriod[0])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[0])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[2])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(mthChange)} <ChangeArrows change={mthChange} /></td>
                    <td class='td-mnth-ytd percent-change'>
                        {#if mthChange >= 0}
                            {percentMnthChange}%
                            <ChangeArrows change={mthChange} />
                        {:else}
                            ({percentMnthChange}%)
                            <ChangeArrows change={mthChange} />
                        {/if}
                    </td>
                </tr>
                <tr>
                    <td class='td-mnth-ytd'>YTD</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[1])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[3])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(ytdChange)} <ChangeArrows change={ytdChange} /></td>
                    <td class='td-mnth-ytd percent-change'>
                        {#if ytdChange >= 0}
                            {percentYtdChange}%
                            <ChangeArrows change={ytdChange} />
                        {:else}
                            ({percentYtdChange.toString().replace(/\-/, '')}%)
                            <ChangeArrows change={ytdChange} />
                        {/if}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
{/if}
</div>