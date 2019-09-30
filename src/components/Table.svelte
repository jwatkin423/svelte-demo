<script>

export let tableData;
let width = 1048;
let height = 800;

$: headerKeys = tableData.keys;
$: chartData = tableData.chartData;

</script>

<style>
th {
    font-size: 12px;
}
</style>

<div class="table-area" bind:clientWidth={width} bind:clientHeight={height}>

    <table>

    <thead>
    <tr>

    {#each headerKeys as header}
        <th>{chartData[header].label}</th>
    {/each}
    </tr>
    </thead>
    <tbody>
        <!-- {#each tData as td}
            <tr>
                <td>{td}</td>
            </tr>
        {/each} -->
        </tbody>
    </table>

</div>