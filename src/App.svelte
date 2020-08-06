<script>

import Nav from './components/Nav.svelte';
import Footer from './components/Footer.svelte';
import Index from './main/index.svelte';
import Test from './test.svelte';
import parser from 'query-string-parser';
import { onMount } from 'svelte';
import LoadingSpinner from './components/LoadingSpinner.svelte';
import Error from './components/Error.svelte';
import chartData from './helpers/chart';
import { getAllUrlParams } from './helpers/parse-search-query';
import SearchParams from './components/SearchParameters.svelte';

let baseUrl = '';

let queryParams = window.location.search;
let rawLocation = window.location.pathname;
let host = window.location.host;
let origin = window.location.origin;

let protocol = window.location.protocol;
let location = rawLocation.replace('public', 'data');
let pageData = false;
let isLoading = true;
let errorStatus = false;
let error;
let data;
let logo_url = false;
let key = false;
let mobileKey = false;
let searchable = false;

function getKey(event) {
	key = event.detail.text;
	return key;
}

if (host !== 'localhost:5000') {
	baseUrl = protocol + '//' + host;
} else {
	baseUrl = 'http://staging.jw';
}

let title = "Terradatum";

let url = baseUrl + location + queryParams;

let urlParams = getAllUrlParams(window.location.href);

onMount(() => {
	
	fetch(url)
	.then(res => {
		if(!res.ok) {
			throw new Error("Failed to fetch");
		}

		return res.json();
	})
	.then(data => {
		isLoading = false;
		pageData = data;
		if  (pageData.logo_url) {
			logo_url = baseUrl + '/' + pageData.logo_url;
		}
		title = pageData.title;
		searchable = pageData.searchable;
		// fill the store’
		chartData.set(pageData);
	})
	.catch(err => {
		isLoading = false;
		error =  err;
		errorStatus = true;
	});
});

</script>

<style>

	main {
        width: 1280;
        height: 100%;
		margin: auto;
        background-color: #F2F2F2;
    }

	.search-params {
		background-color: #F2F2F2;
		min-height: 40px;
		padding-left: 10px;
		padding-right: 10px;
		margin-bottom: 10px;
	}

	@media only screen and (min-height: 1024px) {
		main {
			/* height: 850px; */
		}
	}

	@media only screen and (max-height: 1023px) {
		main {
			height: 100%;
		}
	}

	@media only screen and (max-width: 1289px) {
		main {
			width: 100%;
		}
	}

	 @media only screen and (min-height: 400px) and (max-height: 1023px) {
 		main {
			height: 100%;
 		}
 	}

</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if isLoading} 
	<LoadingSpinner />
{:else}	
	<main>
		{#if !errorStatus}
			<Nav 
				background_color={pageData.p_color} 
				logo={logo_url} 
				on:passKey={getKey} 
				searchParams={urlParams} 
				baseSearchUrl={baseUrl}
				mlsId={pageData.mlsId}
				searchable={searchable}
				officeName={pageData.office_name}
				address={pageData.address}
				city={pageData.city}
				state={pageData.state}
				zipcode={pageData.zipcode}
				website={pageData.website}
				phone={pageData.phone}
				/>
			
			<Index ddsData={pageData} mobileKey={key} searchType={urlParams.search}/>
			
			<div class="search-params">
				<SearchParams searchParams={urlParams} chartType={key}/>
			</div>

			<Footer 
				disclaimer={pageData.strDisclaimer} 
				userType={pageData.userType} 
				mlsName={pageData.mlsName} 
				sponsorDetails={pageData.sponsor_detail}
				sponsorList={pageData.sponsor_list}
				/>
		{:else}	
			<Nav background_color='#019184'/>
				<Error />
		{/if}		
	</main>
{/if}
