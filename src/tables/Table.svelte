<script>
import { onMount } from 'svelte';
import jQuery from 'jquery';
import dt from 'datatables.net';

let sort_asc = '../images/sort_asc.png';

// initialize datatables
dt(jQuery);
let tableElement;

export let chartData = [];
export let key;
export let keys = [];
export let reportPeriod = [];
export let p_color;

let currentKey = '';
$: currentKey = key;

$: setActiveCol(currentKey);

let group = '';

export function setActiveCol(key) {
    
    let els = document.querySelectorAll('div.td-value');
    els.forEach((el) => {
        let className = el.className;
        let res = el.className.split(" ");
        let regex = /group\-[1-9]*/g
        
        // set he active column
        if (res.indexOf(key) !== -1) {
            let bgColor = hexAToRGBA(p_color, 15);
            el.style.backgroundColor = bgColor;
            group = className.match(regex);
            group = group[0];
        } else {
            el.style.backgroundColor = '';
        }
    });

    // display/hide tds in the same/different group respectively
    let tdCells =  document.querySelectorAll('td.td-cell');
    tdCells.forEach((el) => {

        let res = el.className.split(" ");
        if (res.indexOf(group) !== -1) {
            el.style.display = 'table-cell';
        } else {
            el.style.display = 'none';
        }
    });

    // display/hide ths in the same/different group respectively
    let columnHeaders = document.querySelectorAll('th.column-th');
    columnHeaders.forEach((thEl) => {
        let classNames = thEl.className.split(" ");
        if (classNames.indexOf(group) !== -1) {
            thEl.style.display = 'table-cell';
        } else {
            thEl.style.display = 'none';
        }
    });
}

// convert the data object into an iterable array
let data = Object.entries(chartData);

// merge report data and chart data into one object
let allData = [];
let currentYear = '';
allData = reportPeriod.map((rp, i) => {
    let report_row_data = [];
    let currentDate = '';
    let res = '';
    if (rp.includes('<br>')) {
        res = rp.split('<br>');
        if (res[1] !== '1970') {
            currentYear = res[1].substr(-2);
        } else {
            currentYear = currentYear;
        }

        currentDate = res[0] + ' ' + currentYear;
    } else {
        currentDate = rp + ' ' + currentYear;
    }
    
    let currentKey = '';
    
    // map rows
    data.forEach((element, t) => {
        report_row_data[t] = [];
        report_row_data[t] = {'value': element[1].data[i], 'key': keys[t], group: element[1].group};
    });
    
    return {
        currentDate,
        report_row_data
    }; 
});

// build the row headers
let row_headers = [];
row_headers = data.map((report, i) => {
    return {'label':report[1].label, 'group': report[1].group};
});


// convert the color to RGBA
// to allow for opacity changes
function hexAToRGBA(hex,opacity){
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}

function smvsm(value, col) {
    let sale = value[0];
    let sold = value[1];

    if (col === 1) {
        return formatValues(sale, 'saleMedianSoldMedian');
    } else if (col === 2) {
        return formatValues(sold, 'saleMedianSoldMedian');
    } else {
        return formatValues(sale - sold, 'saleMedianSoldMedian');
    }
}

onMount(() => {
    // set the table header colors
    let thEls = document.querySelectorAll('.data-table-header');
    thEls.forEach((element) => {
        element.style.backgroundColor = p_color;
    });

    jQuery(tableElement).DataTable(
        {
            searching: false,
            ordering: true,
            paging: false,
            header: false,
            footer: false,
            info: false
        }
    );

});

// convert month to int
let months = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
};
// comvert the date to a unix timestamp
// to make the sorting work properly for
// datatables
function unixTimeStamp(d) {
    let date_chunks = d.split(" ");
    let month = months[date_chunks[0]]
    let newDate = '01/' + month + "/20" + date_chunks[1];
    let unixTimeStamp = new Date(newDate).getTime() / 1000;

    return unixTimeStamp;
}

function setDollarSymbol(key) {

    let dollar = '';

	if (key === 'soldMedian' || key === 'soldAvgPriceSquareFt' || key === 'saleMedianSoldMedian' || key === 'avgSalePrice') {
		dollar = '$';
	} else {
		dollar = '';
	}
    
    return dollar;

}

// format table values
function formatValues(value, key) {

    if (value > 0) {
        let val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let newVal = val;
	
        newVal = setDollarSymbol(key) + val;

        return newVal;
    } else {
        let val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\-/, '');
        let newVal = val;
	
        newVal = '(' + setDollarSymbol(key) + val + ')';

        return newVal;
    }

}

let src = '/images/sort_carrots.png';

</script>

<style>

    .table-wrapper{
        padding: 5px;
        background-color: white;
        overflow-x: scroll;
    }

    table {
        border-collapse: collapse;
        min-width: 1040px;
    }

    th {
        font-size: 10px;
        color: white;
        padding: 0;
        width: 115px;
        text-align: center;
    }

    td > div {
        vertical-align: middle;
        text-align: center;
    }
    td {
        font-size: 10px;
        vertical-align: middle;
        line-height: 20px;
        height: 20px;
        color: #333333;
        padding: 0;
        text-align: center;
    }

    .active {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 9;
    }
    
    tr:nth-child(odd) {
        background-color: #F2F2F2;
    }

    tr:nth-child(even) {
        background-color: #FFFFFF;
    }

    .datetime-sort {
        display: none;
    }

    .th-div-header {
        width: 20%;
        text-align: center;
        vertical-align: middle;
        display: table-cell;
        height: 36px;
    }

    .time-th-div-header {
        width: 70%;
        text-align: right;
        vertical-align: middle;
        display: table-cell;
        height: 36px;
    }

</style>

{#if data.length > 0}
    <div class="table-wrapper">

        <table id="datatable" bind:this={tableElement} class="order-column" style="width: 100%;">
            <thead>
                <tr>
                    <th class="time-period-th data-table-header date-group"><div class="time-th-div-header">Time Period</div>
                    </th>
                {#each row_headers as row_header, i}
                       {#if row_header.label !== 'Median For Sale vs Median Sold' && row_header.label !== 'Median Sold Price' && row_header.label !== 'Median For Sale Price'}
                            <th class="column-th data-table-header group-{row_header.group}" id="{keys[i]}"><div class="th-div-header">{row_header.label}</div></th>
                        {:else if row_header.label === 'Median For Sale vs Median Sold'}
                            <th class="column-th data-table-header group-{row_header.group}" id="{keys[i]}-sale"><div class="th-div-header">Median For Sale Price</div></th>
                            <th class="column-th data-table-header group-{row_header.group}" id="{keys[i]}-sold"><div class="th-div-header">Median Sold Price</div></th>
                            <th class="column-th data-table-header group-{row_header.group}" id="{keys[i]}-delta"><div class="th-div-header">Median For Sale vs Sold</div></th>
                        {/if}
                {/each}
                </tr>
            </thead>
            <tbody>
            {#each allData as row,i}
                <tr>
                    <td align="right" data-order='{unixTimeStamp(row.currentDate)}'>{row.currentDate}</td>
                    {#each row.report_row_data as data}

                       {#if data.key !== 'saleMedianSoldMedian' && data.key !== 'soldMedian' && data.key !== 'forSaleMedian'}
                            {#if data.key === 'supplyDemand'}    
                                <td class="td-cell {data.key} group-{data.group}" align="right">
                                    <div class:active={data.key === key} class="td-value {data.key} group-{data.group}">{formatValues(data.value[0], data.key)}/{formatValues(data.value[1], data.key)}</div>
                                </td>
                            {:else}
                                <td class="td-cell {data.key} group-{data.group}" align="right">
                                    <div class:active={data.key === key} class="td-value {data.key} group-{data.group}">{formatValues(data.value, data.key)}</div>
                                </td>
                            {/if}
                        {:else if data.key === 'saleMedianSoldMedian'}
                            <td class="td-cell {data.key} group-{data.group}" align="right">
                                <div class:active={data.key === key} class="td-value forSaleMedian {data.key} group-{data.group}">{smvsm(data.value, 1)}</div>
                            </td>
                            <td class="td-cell {data.key} group-{data.group}" align="right">
                                <div class:active={data.key === key} class="td-value soldMedian {data.key} group-{data.group}">{smvsm(data.value, 2)}</div>
                            </td>
                            <td class="td-cell {data.key} group-{data.group}" align="right">
                                <div class:active={data.key === key} class="td-value {data.key} group-{data.group}">{smvsm(data.value, 3)}</div>
                            </td>
                        {/if}
                    {/each}    
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}