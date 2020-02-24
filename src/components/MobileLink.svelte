<script>
import {onMount} from 'svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let keys;
export let data;
let active;

onMount(() => {
	if (data.length > 0) {
		active = data[keys[0]].key;
	}
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
		font-size: 13px !important;
		margin-left: 10px;
		text-decoration: none;
	}

	.td-list-item-link:hover {
		text-decoration: none;
		color: #000000;
		font-weight: bold;
	}

	.mobile-right-arrow {
		float: right;
		font-size: 12px;
	}

	@media only screen and (max-width: 768px) {
		li.td-list-par {
			height: 30px;
			line-height: 30px;
			margin-left: 150px;
			margin-right: 150px;
		}
	}

	@media only screen and (max-width: 480px) {
		li.td-list-par {
			height: 30px;
			line-height: 30px;
			margin-left: 30px;
			margin-right: 30px;
		}
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
		<span class="mobile-right-arrow"> > </span>
    </li>
{/each}