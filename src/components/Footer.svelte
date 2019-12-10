<script>

export let disclaimer;
export let userType;
export let mlsName;
export let mlsId;
export let sponsorDetails;
export let sponsorList;
let d = new Date();
let n = d.getFullYear();
</script>

<style>
    footer {
        width: 100%;
        background-color: #E4E4E4;
    }

    .footer-area {
		display: flex;
        color: #666666;
    }

    .sponsorship-text-wrapper {
		display: flex;
    }

    .sponsorship-text {
        color: #666666;
        margin-left: 10px;
        font-size: 10px;
    }


    .footer-disclaimer > p {
        color: #666666;
        display: inline-block;
        position: relative;
        margin-left: 10px;
    }
    
    .sponsorship-text {
        display: inline-block;
        width: 100%;
        font-size: 10px;
        margin-bottom: 5px;
    }

    .copy-right-wrapper {
        display: flex;
    }

    .copy-right {
        display: block;
        color: #9b9b9b;
        margin-left: 10px;
        font-size: 8px;
    }

    p {
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        margin-right: 0px;
    }

    .footer-area > div > p {
        margin-bottom: 5px;
        font-size: 8px;
    }

    .copy-right > p {
        margin-bottom: 5px;
    }


</style>

<footer>
    <div class="sponsorship-text-wrapper">
        <div class="sponsorship-text">
            {#if (userType == 'broker_sponcer' && sponsorDetails.length > 0)}
                Information presented by {@html sponsorList}
            {/if}
        </div>
    </div>
    <div class="footer-area">
        <div class="footer-disclaimer">
            <p>{@html disclaimer}</p>
        </div>
    </div>
    <div class="copy-right-wrapper">
        <div class="copy-right">
            <p>Copyright © {n} by {mlsName} All rights reserved. This data represents residential property.</p>
        </div>
    </div>    
</footer>    