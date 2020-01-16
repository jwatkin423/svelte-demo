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

export function test(j) {
    active = j;
    dispatch('l', {
        text: j
    });
}

</script>

<style>
	.td-list-par {
		height: 25px;
		line-height: 25px;
		vertical-align: middle;
	}

	.td-list-active {
		font-weight: bold;
		color: #000000 !important;
	}

	.td-list-item-link {
		background-color: #ffffff;
		color: #666666;
		font-size: 12px !important;
		margin-left: 10px;
		text-decoration: none;
	}

	.td-list-item-link:hover {
		text-decoration: none;
		color: #000000;
		font-weight: bold;
	}

	@media only screen and (max-width: 768px) {
		li.td-list-par {
			height: 30px;
			line-height: 30px;
			margin-left: 150px;
		}
	}
</style>

{#each keys as key}
    <li class="td-list-par">
        <a  
            on:click|preventDefault={() => {test(key); }}
            class="td-list-item-link"
            class:td-list-active={active === key}
            href="."
            id={key}>
            {data[key].label}
        </a>
    </li>
{/each}