<script>
import { onMount } from 'svelte';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import Icon from "./Icon.svelte";

export let searchParams;
let areaValues = '';
let areaValueCf = '';
let propertyTypesCf = '';
$: timePeriodValue = searchParams.timePeriodValue;
$: propertyTypes = searchParams.propertyTypeDisplayText ? decodeURI(searchParams.propertyTypeDisplayText) : 'ALL';
$: propertyTypesCf = propertyTypes.replace(/\,/g, ', ');

let rawareaValues = 'ALL';
let areaType = '';

$: status = 'Sold';
$: areaType = searchParams.areaType ? searchParams.areaType : '';
$: rawareaValues = searchParams.areaValuesDisplayText ? searchParams.areaValuesDisplayText : '';
$: areaValues = rawareaValues ? decodeURI(rawareaValues) : 'ALL';
$: areaValueCf = areaValues.replace(/\,/g, ', ');
$: areaVformatted = areaValueCf.length > 22 ? areaValueCf.substr(0, 22) + '...' : areaValueCf;

// icons for nav bar
let icon = [faCircle];

let width = 1280;

</script>

<style>
    .container-search-params {
        width: 100%;
        background-color: transparent;
        color: #666666;
        font-size: 10px;
        display: block;
        position: relative;
    }

    span {
        font-weight: 600;
    }

    .top-search-params {
        width: 100%;
        display: inline-block;
        position: relative;
        line-height: 10px;
        min-height: 10px;
        margin-top: 10px;
    }

    .bottom-search-params {
        width: 100%;
        display: inline-block;
        position: relative;
        line-height: 10px;
        min-height: 10px;
    }

    .search-param-key-value {
        display: inline-block;
        line-height: 10px;
        min-height: 10px;
        font-size: 10px;
        vertical-align: middle;
    }

    .param-points{
        width: 2px;
        height: 10px;
        line-height: 5px;
        vertical-align: middle;
        margin-left: 0 !important;
    }
    
</style>

<div class="container-search-params" bind:clientWidth={width}>
    {#if searchParams}
        <div class="top-search-params">
            <div class="search-param-key-value">
                <span>Property Type:</span> {propertyTypesCf}
            </div>
            <div class="search-param-key-value">
                <i class="param-points"><Icon class="param-points-b" tempId='download-menu' icon={icon[0]} /></i>
                <span>Time Period:</span> 
                {#if timePeriodValue == 13} 
                    1 Year
                {:else}    
                    3 Years
                {/if}
            </div>
            <div class="search-param-key-value">
                <i class="param-points"><Icon class="param-points-b" tempId='download-menu' icon={icon[0]} /></i>
                <span>Status:</span> {status}
            </div>
        </div>
        <div class="bottom-search-params">
            <div class="search-param-key-value">
                <span>Area Type:</span> {areaType}
            </div>
            <div class="search-param-key-value">
                <i class="param-points"><Icon class="param-points-b" tempId='download-menu' icon={icon[0]} /></i>
                <span id='area-values-disp'>Area Values:</span> {areaValueCf}
                <!-- <span id='area-values-disp'>Area Values:</span> {areaVformatted} -->
            </div>
        </div>
    {/if}
</div>