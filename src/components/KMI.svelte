<script>
import Display from './KMI/Display.svelte';

export let data = [];
export let dataTwo = []
export let reportPeriod;
export let year;
export let searchType;

// primary color prop
export let p_color = false;
export let s_color = false;
export let showDollar;
export let chartType = '';

export let kmi = '';

</script>

<style>

</style>

<Display 
    {data} 
    {searchType} 
    {showDollar} 
    {chartType} 
    {reportPeriod} 
    {dataTwo}
    {year}
    primary_fill_color={p_color}
    secondary_fill_color={s_color}
    {kmi} />
