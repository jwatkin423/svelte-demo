<script>

export let disclaimer;

</script>

<style>
    footer {
        width: 100%
    }

    .footer-area {
		display: flex;
		background-color: #bfbfbf;
        color: #666666;
        height: 50px;
    }

    .footer-disclaimer > p {
        color: #666666;
        font-size: 8px;
        /* max-width: 994px; */
        display: inline-block;
        position: relative;
        margin-left: 10px;
    }

    .broker-metrics {
        width: 286px;
        height: 50px;
        display: inline-block;
        position: relative;
    }
    
</style>

<footer>
    <div class="footer-area">
        <div class="footer-disclaimer">
            <p>{disclaimer}</p>
        </div>
    </div>
</footer>    