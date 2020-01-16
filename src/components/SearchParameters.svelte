<script>
export let searchParams;

$: timePeriodValue = searchParams.timePeriodValue;
$: propertyTypes = searchParams.propertyTypeDisplayText ? decodeURI(searchParams.propertyTypeDisplayText) : 'ALL';
$: status = 'Sold';
$: areaType = searchParams.areaType;
$: areaValues = searchParams.areaValuesDisplayText ? decodeURI(searchParams.areaValuesDisplayText) : 'ALL';

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
        height: 10px;
        margin-top: 10px;
    }

    .bottom-search-params {
        width: 100%;
        display: inline-block;
        position: relative;
        line-height: 10px;
        height: 10px;
    }

    .search-param-key-value {
        display: inline-block;
        margin-left: 10px;
        line-height: 10px;
        height: 10px;
        font-size: 10px;
    }

</style>

<div class="container-search-params">
    {#if searchParams}
        <div class="top-search-params">
            <div class="search-param-key-value">
                <span>Property Type:</span> {propertyTypes}
            </div>
            <div class="search-param-key-value">
                <span>Time Period:</span> 
                {#if timePeriodValue == 13} 
                    1 Year
                {:else}    
                    3 Years
                {/if}
            </div>
            <div class="search-param-key-value">
                <span>Status:</span> {status}
            </div>
        </div>
        <div class="bottom-search-params">
            <div class="search-param-key-value">
                <span>Area Type:</span> {areaType}
            </div>
            <div class="search-param-key-value">
                <span>Area Values:</span> {areaValues}
            </div>
        </div>
    {/if}
</div>