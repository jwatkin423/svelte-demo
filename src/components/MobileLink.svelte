<script>
import {onMount} from 'svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let keys;
export let data;
let active;

onMount(() => {
    active = data[keys[0]].key;
});

// set key
export function setChart(k) {
    active = k;
    
    dispatch('mobileKey', {
        text: k
    });
}

</script>

<style>
    .td-list-par {
		height: 25px;
		vertical-align: middle;
		list-style-type: none;
	}

	.td-list-active {
		font-weight: bold;
		color: #000000 !important;
	}

	.td-list-item-link {
		background-color: #ffffff;
		color: #666666;
		font-size: 16px !important;
		margin-left: 10px;
		text-decoration: none;
	}

	.td-list-item-link:hover {
		text-decoration: none;
		color: #000000;
		font-weight: bold;
	}
</style>

{#each keys as key}
    <li class="td-list-par">
        <a  
            on:click|preventDefault={() => {setChart(key); }}
            class:td-list-active={active === key}
            class="td-list-item-link"
            href="."
            id={'m-' + key}>
            {data[key].label}
        </a>
    </li>
{/each}