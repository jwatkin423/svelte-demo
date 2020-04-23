<script>
import {onMount} from 'svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let keys;
export let data;

let active;
let currentGroup = 0;
onMount(() => {
    active = data[keys[0]].key;
});

export function setKey(j) {
    active = j;
    dispatch('l', {
        text: j
    });
}

let groups = [];
keys.map((key, i) =>{
	let cg = data[key].group;
	if (!groups[cg]) {
		groups[cg] = [];
		groups[cg].push({'key': data[key].key, 'label': data[key].label});
	} else if (groups[cg]) {
		groups[cg].push({'key': data[key].key, 'label': data[key].label});
	}
});

// remove empty element created durring initialization
groups = groups.filter((el) => {
	return el != null;
});

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

	.separator {
		height: 20px;
		line-height: 20px;
		font-size: 20px;
		color: #ffffff;
	}
	
	@media only screen and (max-width: 1024px) {
		li.td-list-par {
			height: 30px;
			line-height: 30px;
		}
	}

	@media only screen and (max-width: 768px) {
		.td-list-active, .td-list-item-link, .td-list-item-link:hover, .td-list-par {
			display: none;
		}
	}
</style>

{#each groups as group, i}
	<div class='group'>
		{#each group as link}
			<li class="td-list-par">
				<a  
					on:click|preventDefault={() => {setKey(link.key); }}
					class="td-list-item-link"
					class:td-list-active={active === link.key}
					href="."
					id={link.key}>
					{link.label}
				</a>
			</li>
		{/each}
	</div>
	{#if i + 1 < groups.length}
		<div class='separator'></div>
	{/if}	
{/each}