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
export let primary_fill_color;
// seondary fill color
export let secondary_fill_color;

</script>

<style>
    /* all kmi rows */
    .kmi-row {
        display: flex;
        flex-wrap: wrap;
    }

    /* data kmi rows */
    .kmi-data-row {
        margin-top: 4px;
    }

    /* div header cells */
    .div-header {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        font-weight: 800;
        width: 150px;
        color: #666666;
        text-align: center;
        margin-top: 2px;
    }

    /* div "body" cells */
    .div-cell {
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 600;
        width: 150px;
        color: #666666;
        vertical-align: unset;   
    }
</style>

<!-- KMI HEADER-->
<div class="kmi-row">
    <div class="div-header"></div>
    <div class="div-header">{rpOne}</div>
    <div class="div-header">{rpTwo}</div>
    <div class="div-header">Change</div>
    <div class="div-header">% Change</div>
</div>

<!-- KMI ROW ONE-->
<div class="kmi-row kmi-data-row">
    <div class="div-cell">
        <i>
            <Icon customColor={primary_fill_color} class="year" tempId="line-one" icon={icon[2]} />
        </i>
        {monthDate}
    </div>
    <div class="div-cell">{initMonth}</div>
    <div class="div-cell">{lastMonth}</div>
    <div class="div-cell">
        {#if mthChange >= 0}
            {mthChange} <ChangeArrows change={mthChange} />
        {:else}
            ({mthChange}) <ChangeArrows change={mthChange} />
        {/if}
    </div>
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
</div>

<!-- KMI ROW TWO -->
<div class="kmi-row kmi-data-row">
    <div class="div-cell">
        <i>
            <Icon customColor={secondary_fill_color} class="year" tempId="line-two" icon={icon[2]} />
        </i>
        YTD
    </div>
    <div class="div-cell">{initMonthTwo}</div>
    <div class="div-cell">{lastMonthTwo}</div>
    <div class="div-cell">
        {#if ytdChange >= 0}
            {ytdChange} <ChangeArrows change={ytdChange} />
        {:else}
            ({ytdChange}) <ChangeArrows change={ytdChange} />
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
