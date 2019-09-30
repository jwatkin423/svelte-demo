<script>

import Nav from './components/Nav.svelte';
import Footer from './components/Footer.svelte';
import Index from './main/index.svelte';
import Test from './test.svelte';
import parser from 'query-string-parser';
import { onMount } from 'svelte';
import LoadingSpinner from './components/LoadingSpinner.svelte';
import Error from './components/Error.svelte';
const baseUrl = 'http://staging.jw';

let queryParams = window.location.search;
let rawLocation = window.location.pathname;
let location = rawLocation.replace('public', 'data');
let pageData = false;
let isLoading = true;
let errorStatus = false;
let error;
let data;

let url = baseUrl + location + queryParams;

onMount(() => {
	fetch(url)
	.then(res => {
		console.log('this the res');
		console.log(res);
		if(!res.ok) {
			throw new Error("Failed to fetch");
		} else {
			console.log(res);
		}
		console.log(res);
		return res.json();
	})
	.then(data => {
		isLoading = false;
		pageData = data;
		console.log(data);
	})
	.catch(err => {
		isLoading = false;
		error =  err;
		errorStatus = true;
		console.log("The error")
		console.log(errorStatus);
		console.log(error);
	});
});

</script>

<style>
	main {
        max-width: 1290px;
        max-height: 1024px;
		margin: auto;
        background-color: #F2F2F2;
    }

    div.content {
        max-width: 1280px;
		max-height: 1024px;
	}
	
	@media only screen and (max-width: 1024px) {
		main {
			width: 100%;
			height: 100%;
		}

		.content {
			width: 100%;
		}
	}

</style>

{#if isLoading} 
	<LoadingSpinner />
{:else}	
	<main>
		<div class="content">
			{#if !errorStatus}
				<Nav background_color={pageData.p_color} logo={baseUrl + '/' + pageData.logo_url}/>
						<Index ddsData={pageData} />
				<Footer disclaimer={pageData.strDisclaimer}/>
			{:else}	
				<Nav background_color='#019184'/>
					<Error />
			{/if}		
		</div>
	</main>
{/if}
