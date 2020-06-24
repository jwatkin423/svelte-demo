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
// change
export let change;
// change percent
export let chngPercent;

// initial month
export let initMonthTwo;
// last month
export let lastMonthTwo;
// change
export let changeTwo;
// change percent
export let chngPercentTwo;

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
            For Sale
        </i>

    </div>
    <div class="div-cell">{initMonth}</div>
    <div class="div-cell">{lastMonth}</div>
    <div class="div-cell">
        {#if change >= 0}
            {change} 
            <ChangeArrows change={change} />
        {:else}
            ({change.toString().replace(/\-/, '')}) 
            <ChangeArrows change={change} />
        {/if}
    </div>
    <div class="div-cell">
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
    </div>
</div>

<!-- KMI ROW TWO -->
<div class="kmi-row kmi-data-row">
    <div class="div-cell">
        <i>
            <Icon customColor={secondary_fill_color} class="year" tempId="line-two" icon={icon[2]} />
        </i>
        Sold
    </div>
    <div class="div-cell">{initMonthTwo}</div>
    <div class="div-cell">{lastMonthTwo}</div>
    <div class="div-cell">
        {#if changeTwo >= 0}
            {changeTwo} 
            <ChangeArrows change={changeTwo} />
        {:else}
            ({changeTwo.toString().replace(/\-/, '')}) 
            <ChangeArrows change={changeTwo} />
        {/if}
    </div>
    <div class="div-cell">
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
    </div>
</div>