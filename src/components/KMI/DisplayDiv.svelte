<script>
import Icon from "../Icon.svelte";
import ChangeArrows  from '../ChangeArrows.svelte';
import {faCaretUp, faCaretDown, faCircle} from '@fortawesome/free-solid-svg-icons';

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

</script>

<style>
    /* all kmi rows */
    .kmi-row {
        display: flex;
        flex-wrap: wrap;
    }

    /* data kmi rows */
    .kmi-data-row {
        margin-top: 8px;
    }

    /* div header cells */
    .div-header {
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 800;
        color: #666666;
        text-align: center;
        margin-top: 10px;
        width: 25%;
    }

    /* div "body" cells */
    .div-cell {
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 600;
        color: #666666;
        vertical-align: unset;   
        width: 25%;
    }
 
@media only screen and (max-width: 480px) {

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
        font-weight: 600;
        color: #666666;
        vertical-align: unset;
    }

}
</style>

<div class="kmi-row">
    <div class="div-header">{rpOne}</div>
    <div class="div-header">{rpTwo}</div>
    <div class="div-header">Change</div>
    <div class="div-header">% Change</div>
</div>
<div class="kmi-row kmi-data-row">
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