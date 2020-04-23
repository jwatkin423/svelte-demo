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

export function setActiveCol(key) {
    
    let els = document.querySelectorAll('div.td-value');
    els.forEach((el) => {
        let res = el.className.split(" ");

        if (res.indexOf(key) !== -1) {
            let bgColor = hexAToRGBA(p_color, 15);
            el.style.backgroundColor = bgColor;
        } else {
            el.style.backgroundColor = '';
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
        currentYear = res[1].substr(-2);
        currentDate = res[0] + ' ' + currentYear;
    } else {
        currentDate = rp + ' ' + currentYear;
    }
    let currentKey = '';
    data.forEach((element, t) => {
        report_row_data[t] = [];
        report_row_data[t] = {'value': element[1].data[i], 'key': keys[t]};
    });
    
    return {
        currentDate,
        report_row_data
    }; 
});

// build the row headers
let row_headers = [];
row_headers = data.map((report, i) => {
    return report[1].label;
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

onMount(() => {
    // set the table header colors
    let thEls = document.querySelectorAll('th');
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

</script>

<style>

    .table-wrapper{
        padding: 5px;
        background-color: white;
    }

    th {
        font-size: 10px;
        color: white;
        text-align: right;
    }

    .time-period-th {
        /* width: 44px; */
    }

    .column-th {
        /* width: 83px; */
    }

    td {
        font-size: 10px;
        vertical-align: middle;
        line-height: 20px;
        height: 20px;
        color: #333333;
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

</style>

{#if data.length > 0}
    <div class="table-wrapper">

        <table id="datatable" bind:this={tableElement} class="order-column" style="width: 100%;">
            <thead>
                <tr>
                    <th class="time-period-th">Time Period</th>
                {#each row_headers as row_header, i}
                    <th class="column-th" id="{keys[i]}">{row_header}</th>
                {/each}
                    <!-- <th class="column-th">Supply & Demmand1</th>
                    <th class="column-th">Average Sales Price2</th>
                    <th class="column-th">Expired Listings3</th> -->
                </tr>
            </thead>
            <tbody>
            {#each allData as row,i}
                <tr>
                    <td align="right" data-order='{unixTimeStamp(row.currentDate)}'>{row.currentDate}</td>
                    {#each row.report_row_data as data}
                        <td class="{data.key}" align="right">
                            <div class:active={data.key === key} class="td-value {data.key}">{data.value}</div>
                        </td>
                    {/each}    
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}