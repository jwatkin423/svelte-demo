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

let groups = [];
keys.map((key, i) =>{
	let cg = data[key].group;
	if (!groups[cg]) {
		groups[cg] = [];
		groups[cg].push({'key': data[key].key, 'label': data[key].link});
	} else if (groups[cg]) {
		groups[cg].push({'key': data[key].key, 'label': data[key].link});
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
		font-size: 12px;
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
		font-size: 14px;
	}

	.separator {
		height: 20px;
		line-height: 20px;
		font-size: 20px;
		color: #ffffff;
	}

	.group:first-child {
        margin-top: 25px;
    }

	.group:last-child {
        margin-bottom: 20px;
    }

	@media only screen and (max-width: 1024px) and (min-width: 481px) {
		.separator {
			height: 18px;
			line-height: 18px;
			font-size: 18px;
			color: #ffffff;
		}	

		li.td-list-par {
			margin-top: 22px;
			width: 400px !important;
			margin-left: auto;
			margin-right: auto;
		}

		.td-list-par{
			height: 12px;
			line-height: 12px;
			vertical-align: bottom;
			list-style-type: none;
		}

		.td-list-item-link {
			font-size: 12px;
		}

	}

	@media only screen and (max-width: 480px) {
		li.td-list-par {
			margin-top: 22px;
			height: 12px;
			line-height: 12px;
			margin-left: 40px;
			margin-right: 40px;
		}
	}
</style>

{#each groups as group, i}
	<div class="group">
	{#each group as link}	
		<li class="td-list-par">
			<a  
				on:click|preventDefault={() => {setChart(link.key); }}
				class:td-list-active={active === link.key}
				class="td-list-item-link"
				href="."
				id={'m-' + link.key}>
				{link.label}
			</a>
			<span class="mobile-right-arrow"> > </span>
		</li>
	{/each}
	</div>
	{#if i + 1 < groups.length}
		<div class='separator'></div>
	{/if}
{/each}
