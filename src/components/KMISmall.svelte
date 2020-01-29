<script>
import Icon from "./Icon.svelte";

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

$: initialMonth = data[0];
$: lastMonth = data[data.length - 1];
$: change = (lastMonth - initialMonth).toFixed(1);
$: monthTwo = data[2];
$: mthChange = (monthTwo - initialMonth).toFixed(1);

$: ytdChange = (data[3] - data[1]).toFixed(1);
$: percentMnthChange = Math.ceil(((mthChange / initialMonth) * 100)).toFixed(1);
$: percentYtdChange = Math.ceil(((ytdChange / data[3]) * 100)).toFixed(1);

let periodSplits;

function formatNumber(num) {

    if (num) {

        if (chartType !== 'fsldMsi') {
            num = num.replace(/\.[0-9]{1}$/, '');
        }

        if (num < 0 ) {
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            num = num.replace(/\-/, '');
            num =  dollar + num;
        } else {
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

</script>

<style>
    .table-wrapper {
        display: block;
        text-align: center;
        background-color: #ffffff;
    }

    table {
        margin-left: auto;
        margin-right: auto;
        width: 300px;
        border-collapse: collapse;
        height: 40px;
    }

    .table-mnth-ytd {
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        width: 300px;
    }

    th {
        height: 22px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 700;
        width: 75px;
        color: #666666;
        text-align: center;
        padding-bottom: 3px;
        padding-top: 12px;
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

    .chng {
        font-size: 10px;
    }

    .td-mnth-ytd {
        height: 14px;
        line-height: 14px;
        font-size: 14px;
    }

    .percent-change {
        text-align: right;
    }

</style>

<div class="table-wrapper">
{#if data.length !== 0 && searchType !== 'mnth-ytd'}
        <table>
            <thead>
                <tr>
                    <th width="75">{formatMonth(reportPeriod[0])}</th>
                    <th width="75">{reportPeriod[reportPeriod.length - 1]} {year}</th>
                    <th width="75">Change</th>
                    <th width="75">% Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td width="75" id="inital-month">{ formatNumber(initialMonth) }</td>
                    <td width="75" id="last-month">{ formatNumber(lastMonth) }</td>
                    <td width="75" id="change">{ formatNumber(change) }</td>
                    <td width="75">
                        {#if change >= 0}
                            {((change/initialMonth) * 100).toFixed(1)}%
                            <i class="chng chng-up-small"><Icon class="chng-up-small" tempId="change-pcrt-up" icon={icon[0]} /></i>
                        {:else}
                            ({((change/initialMonth * 100)).toFixed(1).toString().replace(/\-/, '')}%)
                            <i class="chng chng-dn"><Icon class="chng-dn-small" tempId="change-prct-dn-small" icon={icon[1]} /></i>
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
                    <th></th>
                    <th><i><Icon customColor={p_color} class="year" tempId="previous-year" icon={icon[2]} /></i>{formatYear(reportPeriod[0])}</th>
                    <th><i><Icon customColor={s_color} class="year" tempId="current-year" icon={icon[2]} /></i>{formatYear(reportPeriod[2])}</th>
                    <th>Change</th>
                    <th>% Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class='td-mnth-ytd'>{formatMonthOnly(reportPeriod[0])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[0])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[2])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(mthChange)}</td>
                    <td class='td-mnth-ytd percent-change'>
                        {#if mthChange >= 0}
                            {percentMnthChange}%
                        {:else}
                            ({percentMnthChange}%)
                        {/if}
                        
                    </td>
                </tr>
                <tr>
                    <td class='td-mnth-ytd'>YTD</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[1])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(data[3])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(ytdChange)}</td>
                    <td class='td-mnth-ytd percent-change'>
                        {#if ytdChange >= 0}
                            {percentYtdChange}%
                            <i class="chng chng-up"><Icon class="chng-up-ytd-small" tempId="change-up-small" icon={icon[0]} /></i>
                        {:else}
                            ({percentYtdChange}%)
                            <i class="chng chng-dn"><Icon class="chng-dn-ytd-small" tempId="change-prct-dn-small" icon={icon[1]} /></i>
                        {/if}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
{/if}
</div>