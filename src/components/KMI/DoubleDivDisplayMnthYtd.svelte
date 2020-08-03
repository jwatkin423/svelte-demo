<script>
import Icon from "../Icon.svelte";
import ChangeArrows  from '../ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';

let icon = [faCaretUp, faCaretDown, faCircle];

// report period one
export let rpOne;
// report pertiod tow
export let rpTwo;
// report month
export let mnth;
// initial month
export let initMonth;
// last month
export let lastMonth;
// initial month two
export let initMonthTwo;
// last month two
export let lastMonthTwo;

// changes and percentages

// month change
export let mthChange;
// change percent
export let percentMnthChange;

// year change
export let ytdChange;
// change percent
export let percentYtdChange;

export let kmi;

// Colors:
// primary fill color
export let p_color
// seondary fill color
export let s_color;

let showChart = true;

function toggleDisplayChart() {
    showChart = showChart === true ? false : true;
    let chart = document.querySelector('.chart-wrapper-blank');
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
    /* div header cells */
    .div-header {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 800;
        color: #666666;
        text-align: center;
    }

    .div-header-bottom {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 800;
        color: #666666;
        text-align: center;
        margin-top: 4px;
    }

    /* div "body" cells */
    .div-cell {
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        vertical-align: unset;   
        margin-top: 4px;
    }

    .for-sale-sold {
        margin-top: 5px;
        text-align: left;
        width: 100%;
    }

    .span-for-sale-sold {
        margin-left: 5px;
    }

    .span-for-sale-sold {
        margin-left: 5px;
    }

    .span-for-sale-sold-bottom {
        margin-left: 5px;
        color: #ffffff;
    }

    .mnth-ytd-kmi-hr {
        padding: 0;
        margin: 0;
        color: #CCCCCC;
        margin-left: 5px;
        margin-right: 5px;
    }

    .kmi-container {
        display: grid;
        grid-template-rows: 80px 1px 80px;
        grid-template-columns: 63px auto repeat(2, minmax(auto 150px) ) 60px;
        grid-template-areas: 
            "kmi-col-one-top kmi-col-two-top kmi-col-three-top kmi-col-four-top kmi-col-five-top"
            "kmi-hr kmi-hr kmi-hr kmi-hr kmi-hr"
            "kmi-col-one-bottom kmi-col-two-bottom kmi-col-three-bottom kmi-col-four-bottom kmi-col-five-bottom";
    }

    .kmi-hr {
        grid-row: 2/3;
        grid-column-start: 1;
        grid-column-end: 6
    }

    .kmi-col-one-top {
        grid-area: kmi-col-one-top;
        display: grid;
        height: 60px;
        grid-row: 1/3;
    }

    .kmi-col-two-top {
        grid-area: kmi-col-two-top;
        margin-top: 10px;
        height: 60px;
        grid-row: 1/3;
        grid-template-rows: 20px 16px 16px;
    }

    .kmi-col-three-top {
        grid-area: kmi-col-three-top;
        margin-top: 10px;
        height: 60px;
        grid-row: 1/3;
    }

    .kmi-col-four-top {
        grid-area: kmi-col-four-top;
        margin-top: 10px;
        height: 60px;
        grid-row: 1/3;
    }

    .kmi-col-five-top {
        grid-area: kmi-col-five-top;
        margin-top: 10px;
        height: 60px;
        grid-row: 1/3;
        float: right;
    }

    .kmi-col-one-bottom {
        display: grid;
        height: 60px;
        grid-row: 3/3;
    }

    .kmi-col-two-bottom {
        margin-top: 10px;
        height: 60px;
        grid-row: 3/3;
        grid-template-rows: 20px 16px 16px;
    }

    .kmi-col-three-bottom {
        margin-top: 10px;
        height: 60px;
        grid-row: 3/3;
    }

    .kmi-col-four-bottom {
        margin-top: 10px;
        height: 60px;
        grid-row: 3/3;
    }

    .kmi-col-five-bottom {
        margin-top: 10px;
        display: grid;
        height: 60px;
        grid-row: 3/3;
        justify-items: right;
    }

    .button-wrapper-double {
        grid-row: 3/3;
    }

    .button-wrapper-double > a {
        margin-right: 10px;
    }

    .div-mnth {
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        vertical-align: unset;   
        margin-top: 4px;
    }

    .div-ytd {
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        vertical-align: unset;   
        margin-top: 4px;
    }

    .buffer-top {
        height: 10px;
    }

    .buffer-bottom {
        height: 10px;
        margin-top: 4px;
    }

    @media only screen and (max-width: 1024px) and (min-width: 481px){
        .kmi-top {
            grid-template-columns: minmax(63px, 25%) minmax(auto, 75px) repeat(2 ,minmax(auto, 150px)) 25%;
        }

        .kmi-bottom {
            grid-template-columns: minmax(63px, 25%) minmax(auto, 75px) repeat(2 ,minmax(auto, 150px)) 25%;
        }

        .button-wrapper-double {
            display: none;
        }
    }

    @media only screen and (max-width: 480px) {

        .kmi-container {
            display: grid;
            grid-template-rows: 65px 1px 65px;
            grid-template-columns: auto;
        }

        .kmi-top {
            grid-template-columns: minmax(40px, 25%) minmax(auto, 75px) repeat(2 ,minmax(auto, 150px)) 10%;
        }

        .kmi-bottom {
            grid-template-columns: minmax(40px, 25%) minmax(auto, 75px) repeat(2 ,minmax(auto, 150px)) 10%;
        }

        .kmi-bottom,
        .kmi-col-two-top,
        .kmi-col-two-bottom,
        .kmi-col-three-bottom,
        .kmi-col-four-bottom,
        .kmi-col-five-top,
        .kmi-col-five-bottom,
        .buffer-top,
        .buffer-bottom {
            margin-top: 0 !important;
        }

        .div-header-bottom, 
        .div-header {
            margin-top: 2px !important;
        }

        .div-cell{
            height: 14px;
            line-height: 14px;
            font-size: 14px !important;
        }

        .div-mnth{
            height: 14px;
            line-height: 14px;
            font-size: 14px !important;
        }

        .div-ytd {
            height: 14px;
            line-height: 14px;
            font-size: 14px !important;
        }
    }
</style>

<div class="kmi-container">
    <div class="kmi-col-one-top">
        <div class="div-header for-sale-sold">
            <span class="span-for-sale-sold">
                {#if kmi === 'left' || kmi === 'top'}
                    FOR SALE
                {:else}
                    SOLD
                {/if}
            </span>
        </div>
    </div>
    <div class="kmi-col-two-top">
        <div class="buffer-top">&nbsp;</div>
        <div class="div-mnth">{mnth}</div>
        <div class="div-ytd">YTD</div>
    </div>
    <div class="kmi-col-three-top">
        <div class="div-header"><i><Icon customColor={p_color} class="year-small-ml-0" tempId="line-one-{kmi}" icon={icon[2]} /></i> {rpOne}</div>
        <div class="div-cell">{initMonth}</div>
        <div class="div-cell">{initMonthTwo}</div>
    </div>
    <div class="kmi-col-four-top">
        <div class="div-header"><i><Icon customColor={s_color} class="year-small-ml-0" tempId="line-two-{kmi}" icon={icon[2]} /></i> {rpTwo}</div>
        <div class="div-cell">{lastMonth}</div>
        <div class="div-cell">{lastMonthTwo}</div>
    </div>
    <div class="kmi-col-five-top">&nbsp;</div>
    
    <div class="kmi-hr">
        <hr class="mnth-ytd-kmi-hr" />
    </div>

    <div class="kmi-col-one-bottom">
        <div class="div-header for-sale-sold">
            <span class="span-for-sale-sold-bottom">
                {#if kmi === 'left' || kmi === 'top'}
                    FOR SALE
                {:else}
                    SOLD
                {/if}
            </span>
        </div>
    </div>
    <div class="kmi-col-two-bottom">
        <div class="buffer-bottom">&nbsp;</div>
        <div class="div-mnth">{mnth}</div>
        <div class="div-ytd">YTD</div>
    </div>
    <div class="kmi-col-three-bottom">
        <div class="div-header-bottom">Change</div>
        <div class="div-cell">
            {#if mthChange >= 0}
                {mthChange} <ChangeArrows change={mthChange} />
            {:else}
                ({mthChange}) <ChangeArrows change={mthChange} />
            {/if}
        </div>
        <div class="div-cell">
            {#if ytdChange >= 0}
                {ytdChange} <ChangeArrows change={ytdChange} />
            {:else}
                ({ytdChange}) <ChangeArrows change={ytdChange} />
            {/if}
        </div>
    </div>
    <div class="kmi-col-four-bottom">
        <div class="div-header-bottom">% Change</div>
        <div class="div-cell">
            {#if percentMnthChange !== 'NA' && percentMnthChange != 0}
                {#if mthChange >= 0}
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
        </div>
        <div class="div-cell">
            {#if percentYtdChange !== 'NA' && percentYtdChange != 0}
                {#if ytdChange >= 0}
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
        </div>
    </div>
    <div class="kmi-col-five-bottom">
        {#if kmi === 'left' || kmi === 'top' || kmi === 'bottom'}
            <div class="div-buffer-double"></div>
        {:else}
            <div class="button-wrapper-double">
                <a class="button-small" on:click|preventDefault on:click={toggleDisplayChart} href='.'><img src='/images/chart.png' width="15" height="15" alt='chart toggle' /></a>
                <a class="button-small" on:click|preventDefault on:click={toggleDisplayTable} href='.'><img src='/images/table.png' width="15" height="15" alt='table toggle' /></a>
            </div>
        {/if}
    </div>
</div>