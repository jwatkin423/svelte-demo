<script>

export let chartTitle = '';

</script>

<style>
    .text-center {
        text-align: center;
    }

.title-text {
        font-size: 14px;
        color: #666666;
        margin-bottom: 0 !important;
        height: 40px;
        vertical-align: middle;
        display: table-cell;
        width: inherit;
    }

    .chart-title-bar {
        background-color: #F2F2F2;
        height: 40px;
        text-align: center;
        line-height: 40px;
        display: table;
        width: 100%
    }
</style>

<div class="chart-title-bar">
        <div class="title-text">
            <h3 class="text-center">{chartTitle}</h3>
        </div>
    </div>