<script>
import { onMount } from "svelte";

export let monthYear;
export let xValue;
export let dyValue = "1em";
export let xLen;
export let date;
$: xLen = xValue;
$: date = monthYear.month + " " + monthYear.year.replace('20', "'");

</script>

<style>

tspan {
    text-anchor: top;
}

</style>

<tspan x={xLen}>{date}</tspan>