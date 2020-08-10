<script>
import Icon from "../Icon.svelte";
import ChangeArrows  from '../ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';

let icon = [faCaretUp, faCaretDown, faCircle];

// report period one
export let rpOne;
// report pertiod tow
export let rpTwo;
// initial month
export let initMonth;
// last month
export let lastMonth;
// initial month two
export let initMonthTwo;
// last month two
export let lastMonthTwo;

// month of the reports
export let monthDate;

// changes and percentages

// month change
export let mthChange;
// change percent
export let percentMnthChange;

// year change
export let ytdChange;
// change percent
export let percentYtdChange;

// Colors:
// primary fill color
export let p_color;
// seondary fill color
export let s_color;

</script>

<style>
    /* all kmi rows */
    .kmi-container {
        display: grid;
        grid-template-columns: repeat(5, auto);
    }

    /* div header cells */
    .div-header {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 800;
        color: #666666;
        text-align: center;
        margin-top: 2px;
    }

    /* div "body" cells */
    .div-cell {
        margin-top: 4px;
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        vertical-align: unset;
    }

    .sale-sold-container {
        display: grid;
        grid-template-columns: auto 54px;
        grid-template-rows: 16px repeat(2, auto);
        justify-items: end;
        justify-content: end;
    }

    .sale-item {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        grid-column: 1/2;
        grid-row: 2/3;
    }

    .sold-item {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        grid-column: 1/2;
        grid-row: 3/3;
    }

    @media only screen and (min-width: 481px) and (max-width: 1024px) {

        .sale-sold-container {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: 16px auto auto;
            justify-items: end;
            justify-content: end;
            grid-column: 1/2;
        }   

        .sale-item {
            grid-row: 2/3
        }

        .sold-item {
            padding-top: 4px;
            grid-row: 3/3
        }

        .kmi-container {
            display: grid;
            grid-template-rows: 16px auto auto;
        }

        .div-header {
            height: 10px;
            line-height: 10px;
            font-size: 10px;
        }

        .div-cell {
            height: 16px;
            line-height: 16px;
            font-size: 15px;
        }

    }


    @media only screen and (max-width: 480px) {

        .sale-sold-container {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: 16px auto auto;
            justify-items: end;
            justify-content: end;
            grid-column: 1/2;
        }   

        .sale-item {
            grid-row: 2/3
        }

        .sold-item {
            padding-top: 4px;
            grid-row: 3/3
        }

        .kmi-container {
            display: grid;
            grid-template-rows: 16px auto auto;
        }

        .div-header {
            height: 10px;
            line-height: 10px;
            font-size: 10px;
            font-weight: 600;
            color: #666666;
            text-align: center;
        }

        .div-cell {
            height: 16px;
            line-height: 16px;
            font-size: 15px;
            color: #666666;
            vertical-align: unset;
        }

    }

</style>

<div class="kmi-container">

    <div class="sale-sold-container">
        <div class="sale-item">
            <i>
                <Icon customColor={p_color} class="year" tempId="line-one" icon={icon[2]} />
            </i>
            {monthDate}
        </div>
        <div class="sold-item">
            <i>
                <Icon customColor={s_color} class="year" tempId="line-two" icon={icon[2]} />
            </i>
            YTD
        </div>
    </div>

    <!-- KMI HEADER-->
    <div class="kmi-col-one">
        <div class="div-header">{rpOne}</div>
        <div class="div-cell">{initMonth}</div>
        <div class="div-cell">{initMonthTwo}</div>
    </div>

    <!-- KMI HEADER-->
    <div class="kmi-col-two">
        <div class="div-header">{rpTwo}</div>
        <div class="div-cell">{lastMonth}</div>
        <div class="div-cell">{lastMonthTwo}</div>
    </div>

    <!-- KMI HEADER-->
    <div class="kmi-col-three">
        <div class="div-header">Change</div>
        <div class="div-cell">
            {#if mthChange > 0}
                {mthChange} 
                <ChangeArrows change={mthChange} />
            {:else}
                ({mthChange.toString().replace(/\-/, '')}) 
                <ChangeArrows change={mthChange} />
            {/if}
        </div>
        <div class="div-cell">
            {#if ytdChange > 0}
                {ytdChange} 
                <ChangeArrows change={ytdChange} />
            {:else}
                ({ytdChange.toString().replace(/\-/, '')}) 
                <ChangeArrows change={ytdChange} />
            {/if}
        </div>
    </div>

    <!-- KMI HEADER-->
    <div class="kmi-col-four">
        <div class="div-header">% Change</div>
        <div class="div-cell">
        {#if percentMnthChange !== 'NA' && percentMnthChange != 0}
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
</div>