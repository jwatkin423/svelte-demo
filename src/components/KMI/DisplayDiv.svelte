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

    /* div header cells */
    .div-header {
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 800;
        color: #666666;
        text-align: center;
        margin-top: 10px;
    }

    /* div "body" cells */
    .div-cell {
        padding-bottom: 0px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666666;
        vertical-align: unset;   
    }
 
    @media only screen and (min-width: 1025px) {

        .kmi-container {
            display: grid;
            grid-template-columns: repeat(4, minmax(auto, 150px));
            margin-left: auto;
            margin-right: auto;
        }

        .div-header {
            height: 10px;
            line-height: 10px;
            font-size: 10px;
            font-weight: bold;
            color: #666666;
            text-align: center;
            margin-top: 12px;
        }

        .div-cell {
            height: 16px;
            line-height: 16px;
            font-size: 15px;
            color: #666666;
            margin-top: 6px;
        }
    }

    @media only screen and (min-width: 769px) and (max-width: 1024px) {

        .kmi-container {
            display: grid;
            grid-template-columns: repeat(4, minmax(auto, 150px));
            margin-left: auto;
            margin-right: auto;
        }

        .div-header {
            height: 10px;
            line-height: 10px;
            font-size: 10px;
            font-weight: bold;
            color: #666666;
            text-align: center;
            margin-top: 12px;
        }

        .div-cell {
            height: 16px;
            line-height: 16px;
            font-size: 15px;
            color: #666666;
            margin-top: 6px;
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {

        .kmi-container {
            display: grid;
            grid-template-columns: repeat(4, minmax(auto, 150px));
            margin-left: auto;
            margin-right: auto;
        }

        .div-header {
            height: 10px;
            line-height: 10px;
            font-size: 10px;
            font-weight: bold;
            color: #666666;
            text-align: center;
            margin-top: 12px;
        }

        .div-cell {
            height: 16px;
            line-height: 16px;
            font-size: 15px;
            color: #666666;
            margin-top: 6px;
        }
    }

    @media only screen and (max-width: 480px) {

        .kmi-container {
            display: grid;
            grid-template-columns: repeat(4, auto);
            grid-gap: 45px;
            margin-left: auto;
            margin-right: auto;
        }

        .div-header {
            height: 10px;
            line-height: 10px;
            font-size: 10px;
            font-weight: bold;
            color: #666666;
            text-align: center;
            margin-top: 12px;
        }

        .div-cell {
            height: 16px;
            line-height: 16px;
            font-size: 15px;
            color: #666666;
            margin-top: 6px;
        }

    }
</style>

<div class="kmi-container">
    <div class="kmi-col-one">
        <div class="div-header div-header-one">{rpOne}</div>
        <div class="div-cell div-cell-one">{initMonth}</div>
    </div>
    <div class="kmi-col-two">
        <div class="div-header div-header-two">{rpTwo}</div>
        <div class="div-cell div-cell-two">{lastMonth}</div>
    </div>
    <div class="kmi-col-three">
        <div class="div-header div-header-three">Change</div>
        <div class="div-cell div-cell-three">
            {#if change >= 0}
                {change} 
                <ChangeArrows change={change} />
            {:else}
                ({change.toString().replace(/\-/, '')})
                <ChangeArrows change={change} />
            {/if}
        </div>
    </div>
    <div class="kmi-col-four">
        <div class="div-header div-header-four">% Change</div>
        <div class="div-cell div-cell-four">
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
</div>