<script>

export let disclaimer;
export let userType;
export let mlsName;
export let sponsorDetails;
export let sponsorList;
let d = new Date();
let n = d.getFullYear();

let discChunks;

$: splitDisclaimer(disclaimer);

function splitDisclaimer(disc) {
    discChunks = disc.split('<br/>');
}

</script>

<style>
    footer {
        width: 100%;
        background-color: #E4E4E4;
    }

    .footer-area {
		display: flex;
        color: #666666;
        margin-right: 10px;
    }

    .sponsorship-text-wrapper {
		display: flex;
    }

    .sponsorship-text {
        margin-top: 5px;
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
        margin-bottom: 0;
    }

    .copy-right-wrapper {
        display: flex;
    }

    .copy-right {
        display: block;
        color: #666666;
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
    
    .footer-disc-top {
        margin-top: 5px;
    }

</style>

<footer>
    {#if (userType == 'broker_sponcer' && sponsorDetails.length > 0)}
        <div class="sponsorship-text-wrapper">
            <div class="sponsorship-text">
                       Information presented by {@html sponsorList}
            </div>
        </div>
    {/if}
    <div class="footer-area">
        <div class="footer-disclaimer">
            <p class="footer-disc-top">{discChunks[0]}</p>
            <p class="footer-disc-bottom">{discChunks[1]}</p>
        </div>
    </div>
    <div class="copy-right-wrapper">
        <div class="copy-right">
            <p>Copyright © {n} by {mlsName} All rights reserved. This data represents residential property.</p>
        </div>
    </div>    
</footer>    