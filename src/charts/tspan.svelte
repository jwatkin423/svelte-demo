<script>
import { onMount } from "svelte";

export let monthYear;
export let xValue;
export let date;

// $: xLen = xValue;
$: date = monthYear.month + " " + monthYear.year.replace('20', "'");

onMount(() => {
});

</script>

<style>

tspan {
    text-anchor: top;
}

</style>

<tspan x={xValue}>{date}</tspan>