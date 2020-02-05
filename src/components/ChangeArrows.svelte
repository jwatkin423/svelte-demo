<script>
export let change;
</script>

<style>

    .chng-up-small {
        color: green !important;
        font-size: 6px;
        height: 6px;
        line-height: 6px;
        margin-left: 0 !important;
        margin-bottom: 0px !important;
        width: 10px !important;
    }

    .chng-dn-small {
        color: red !important;
        font-size: 6px;
        height: 6px;
        line-height: 6px;
        margin-left: 0 !important;
        margin-bottom: 0px !important;
        width: 10px !important;
    }

</style>

{#if change >= 0}
    <svg
        class="chng-up-small"
        height="168.6615"
        width="297.40411"
        sodipodi:docname="chng-up-small.svg"
        version="1.1"
        viewBox="0 0 297.40411 168.6615"
        role="img"
        id="change-pcrt-up"
        aria-hidden="true">
        <path
            inkscape:connector-curvature="0"
            id="path37"
            d="m 277.36384,168.6615 h -257.324 c -17.8179998,0 -26.7409998,-21.543 -14.1419998,-34.142 L 134.55984,5.8575 c 7.81,-7.81 20.474,-7.81 28.284,0 l 128.662,128.662 c 12.6,12.599 3.676,34.142 -14.142,34.142 z"
            fill="currentColor" />
        </svg>
{:else}
    <svg
        class="chng-dn-small"
        height="168.64999"
        width="297.3096"
        sodipodi:docname="chng-up-small.svg"
        version="1.1"
        viewBox="0 0 297.3096 168.64999"
        role="img"
        id="change-prct-dn"
        aria-hidden="true">
        <path
            inkscape:connector-curvature="0"
            id="path37"
            d="M 20.004806,0 H 277.30481 c 17.8,0 26.7,21.5 14.1,34.1 l -128.6,128.7 c -7.8,7.8 -20.5,7.8 -28.3,0 L 5.9048057,34.1 c -12.6,-12.6 -3.7,-34.1 14.1000003,-34.1 z"
            fill="currentColor" />
    </svg>
{/if}