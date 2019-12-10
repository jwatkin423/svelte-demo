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

let icon = [faCaretUp, faCaretDown, faCircle];

let count = [];

$: initialMonth = data[0];
$: lastMonth = data[data.length - 1];
$: change = (lastMonth - initialMonth).toFixed(2);
$: monthTwo = data[2];
$: mthChange = (monthTwo - initialMonth).toFixed(2);
$: ytdChange = (data[3] - data[1]).toFixed(2);
$: percentMnthChange = Math.ceil(((mthChange / monthTwo) * 100)).toFixed(2);
$: percentYtdChange = Math.ceil(((ytdChange / data[3]) * 100)).toFixed(2);


let periodSplits;

function formatNumber(num) {
    if (num) {
        if (num < 0 ) {
            // num = num.toString().replace(/\-/, '');
            num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            num = "(" + num + ")";
        } else {
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        margin-left: 10px;
    }

    table {
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        border-collapse: collapse; 
        border-spacing: 0;
    }

    .table-mnth-ytd {
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        width: 336px;
    }

    th {
        height: 10pt;
        line-height: 10px;
        font-size: 10pt;
        font-weight: 600;
        width: 150px;
    }

    td {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 600;
        width: 150px;
    }

    .chng {
        font-size: 16pt;
    }

    .td-mnth-ytd {
        height: 14px;
        line-height: 14px;
        font-size: 14px;
    }

    .percent-change {
        text-align: right;
    }

    @media only screen and (max-width: 768px) {
        div {
             margin-left: 0 !important;
         }
    }

    @media only screen and (min-width: 547px) and (max-width: 768px) {
 		table {
            margin-left: 124px;
            margin-right: 124px;
         }

         
     }
     
    thead {
        border-bottom: 1px solid #d0d0d0;
    }

     @media only screen and (max-width: 546px) {
 		table {
            margin-left: 80px;
            margin-right: 80px;
         }
     }
     
     @media only screen and (max-width: 501px) {
 		table {
            margin-left: 10px;
            margin-right: 10px;
         }
 	}

</style>

{#if data.length !== 0 && searchType !== 'mnth-ytd'}
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>{formatMonth(reportPeriod[0])}</th>
                    <th>{reportPeriod[reportPeriod.length - 1]} {year}</th>
                    <th>Change</th>
                    <th>% Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="inital-month">{dollar}{ formatNumber(initialMonth) }</td>
                    <td id="last-month">{dollar}{ formatNumber(lastMonth) }</td>
                    <td id="change">{dollar}{ formatNumber(change) }</td>
                    <td>
                        {#if change >= 0}
                            <i class="chng chng-up"><Icon class="chng-up" tempId="change-pcrt-up" icon={icon[0]} /></i>
                            {(lastMonth/initialMonth).toFixed(2)}
                        {:else}
                            <i class="chng chng-dn"><Icon class="chng-dn" tempId="change-prct-dn" icon={icon[1]} /></i>
                            (-{(lastMonth/initialMonth).toFixed(2)})
                        {/if}
                        %
                     </td>
                </tr>
            </tbody>
        </table>
    </div>
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
                    <td class='td-mnth-ytd'>{dollar}{formatNumber(data[0])}</td>
                    <td class='td-mnth-ytd'>{dollar}{formatNumber(data[2])}</td>
                    <td class='td-mnth-ytd'>{formatNumber(mthChange)}</td>
                    <td class='td-mnth-ytd percent-change'>
                        {#if mthChange >= 0}
                            {percentMnthChange}
                        {:else}
                            (-{percentMnthChange})
                        {/if}
                        %
                    </td>
                </tr>
                <tr>
                    <td class='td-mnth-ytd'>YTD</td>
                    <td class='td-mnth-ytd'>{dollar}{formatNumber(data[1])}</td>
                    <td class='td-mnth-ytd'>{dollar}{formatNumber(data[3])}</td>
                    <td class='td-mnth-ytd'>{dollar}{formatNumber(ytdChange)}</td>
                    <td class='td-mnth-ytd percent-change'>
                        {#if ytdChange >= 0}
                            {percentYtdChange}
                            <i class="chng chng-up"><Icon class="chng-up-ytd" tempId="change-up" icon={icon[0]} /></i>
                        {:else}
                            (-{percentYtdChange})
                            <i class="chng chng-dn"><Icon class="chng-dn-ytd" tempId="change-prct-dn" icon={icon[1]} /></i>
                        {/if}
                        %
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
{/if}