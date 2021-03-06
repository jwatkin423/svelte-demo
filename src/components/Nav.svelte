<script>
import Icon from "./Icon.svelte";
import {faBars, faDownload, faSearch, faBookmark, faCloudDownloadAlt, faFilter, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import Search from './Search.svelte';
import { onMount } from 'svelte';
import MobileLink from '../components/MobileLink.svelte';
import DownloadMenu from '../components/DownloadMenu.svelte';
import chartData from '../helpers/chart';
import { drawChart } from '../helpers/draw';
import { createEventDispatcher } from 'svelte';
import Menu from './Menu.svelte';
import TabletMenu from './TabletMenu.svelte';
import SmartPhoneMenu from './SmartPhoneMenu.svelte';
import Logo from './PictureResize.svelte';

const dispatch = createEventDispatcher();

// icons for nav bar
let icon = [
    faFilter, 
    faDownload, 
    faBars, 
    faCloudDownloadAlt, 
    faPlus, 
    faMinus
];

// props
export let background_color = false;
$: theme_color = background_color ? background_color : '#019184';
export let logo = false;
export let tempData = {};
export let searchParams;
export let baseSearchUrl;
export let mlsId = '';
export let searchable;

export let officeName
export let address
export let city
export let state
export let zipcode
export let website
export let phone;

let data;

let keys = false;

const d = chartData.subscribe(cData  => {
    tempData = cData;
});

$: keys = tempData.keys;
$: options = keys.map((t) => {
    let label = tempData.chartData[t].link;
    let dlKey = tempData.chartData[t].key;
    return {'value': dlKey, 'label':label};
});

let showDownload = false;

function setShowDownload() {
    showDownload = false;
}

function toggleShowDownload() {
    showDownload = showDownload === true ? false : true;

    if(showDownload){
        showClass = false;
    }
}

let showClass = false;

function toggleShowMenu() {
    showClass = showClass === true ? false : true;
    showHamburger = false;
    
    if(showClass){
        showDownload = false;
    }
}

let showHamburger = false;

function setPlusColor() {
    if(theme_color) {
        document.getElementById('hamburger').style.color = theme_color;
        document.getElementById('hamburger').style.fontSize = '12px';
        document.querySelector('.res-menu-link').style.color = theme_color;
    }
}

function setOfficeNameColor() {
    if(theme_color) {
        document.getElementById('office-name').style.color = theme_color;
    }
}

onMount(() => {
    setPlusColor();
    setOfficeNameColor();
});

function toggleShowHamMenu() {
    showHamburger = showHamburger === true ? false : true;
    showClass = false;
    
}

function setKey(e) {
    let newActiveId = e.detail.text;
    let newAciveElm = document.getElementById(newActiveId).click();

    dispatch('passKey', {
        text: newActiveId
    });
}

function closeOpenHovers() {
    let desc = document.querySelector('.description');
    if (desc) {
        desc.classList.remove("enabled");
        desc.classList.remove("heyo");
        desc.classList.remove("active");
    }
	
}

// toggle the menu on or off
window.onclick = function(e) {
    // console.log(e.target);
    if(!e.target.matches('.dropbtn') 
        && !e.target.matches('svg.svg-btn') 
        && !e.target.matches('svg.fa-svelte') 
        && !e.target.matches('path') 
        && !e.target.matches('path.path-line') 
        && !e.target.matches('select')
        && !e.target.matches('.themed')
        && !e.target.matches('.select-menu-block')
        && !e.target.matches('.select-menu-block-outter')
        && !e.target.matches('.search-menu-wrapper')
        && !e.target.matches('.input-select')
        && !e.target.matches('.all-property-input-select')
        && !e.target.matches('.property-input-select')
        && !e.target.matches('.property-input-select-item')
        && !e.target.matches('.sub-menu-property > .sub-menu-item > label')
        && !e.target.matches('.sub-menu-property > .sub-menu-item > input')
        && !e.target.matches('a.menu-button')
        && !e.target.matches('button.menu-button')
        && !e.target.matches('i')
        && !e.target.matches('.option-wrapper')
        && !e.target.matches('.option-wrapper > *')
        && !e.target.matches('input.input-select')
        && !e.target.matches('div.option-wrapper > a > label')
        && !e.target.matches('div.option-wrapper > input')
        && !e.target.matches('.sub-menu-btn')
        && !e.target.matches('.sub-menu-container')
        && !e.target.matches('.sub-menu-area')
        && !e.target.matches('a.sorted-group-item')
        && !e.target.matches('.select-menu-block > h3')
        && !e.target.matches('a.res-menu-link')
        && !e.target.matches('input.autocomplete-input')
        && !e.target.matches('div.autocomplete-list-item')
        && !e.target.matches('button.clear-search')
        && !e.target.matches('b')
        ) {

        if (showClass) {
            toggleShowMenu();
            removeActiveFilters();
        }

        if (showHamburger) {
            toggleShowHamMenu();
            removeActiveFilters();
            
        }
    }
}

// remove active filters
function removeActiveFilters() {
    let prtyBtn = document.getElementById('btn-property');
    let areaBtn = document.getElementById('btn-area');
    let timeBtn = document.getElementById('btn-time');

    if (prtyBtn && areaBtn && timeBtn) {
        prtyBtn.style.removeProperty('color');
        areaBtn.style.removeProperty('color');
        timeBtn.style.removeProperty('color');
    }
   
}

// close pop-ups on iPad
window.ontouchend = function(e) {
    if (!e.target.matches('circle.enabled')) {
        closeOpenHovers();
    }
}

let width = 1280;
let screenSize = window.innerWidth; 

$: hideMobileMenu(width);

// hide menu if over 1024 px
function hideMobileMenu(width) {
    if (width > 1024) {
        showHamburger = false;
    }
}

$: setChart(width);

function setChart() {
	screenSize = window.innerWidth;
}

let showLargeClass = true;
let showSmallClass = false;

$: showSmallLogo(width);

// show small logo on screen sizes
// below 480 PX
function showSmallLogo(width) {

    if (width > 480) {
        showLargeClass = true;
        showSmallClass = false;
    } else {
        showLargeClass = false;
        showSmallClass = true;
    }
}

let dataUrl = '';

let tempImg;
let resizeImg;

</script>

<style>

	.navbar-wrapper {
		background-color: #ffffff;
	}

    .navbar-td {
        height: 30px;
        padding-left: 0 !important;
    }

    .menu {
        margin-top: 0px;
        height: 30px;
        display: grid;
        grid-template-columns: 25% 50% 25%;
        grid-template-rows: auto 18px auto;
        grid-template-areas: "left-item center-item right-item";
    }

    .nav-item {
        height: 18px;
        grid-row: 2/3;
    }

    .center-item {
        text-align: center;
        align-self: auto;
    }

    .right-item {
        height: 30px;
        text-align: right;
    }

    .right-item > a {
        margin-right: 10px;
    }

    svg {
        line-height: 18px;
        height: 18px;
        width: 30px;
        fill: #ffffff;
        vertical-align: middle;
    }

    a, button.btn-drpdn {
        font-size: 18px;
        color: #ffffff;
        line-height: 18px;
        height: 18px;
        background-color: transparent;
    }

    .dropbtn {
        color: white;
        padding: 0;
        border: none;
        cursor: pointer;
        height: 30px;
        width: 30px;
        line-height: 18px;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        right: 0;
        left: 0;
        background-color: white;
        max-width: 1280;
        border-bottom: 5px solid #666666;
        position: relative;
        z-index: 9999;
        padding: 5px 0 5px 0;
    }

    .res-menu-link {
        text-decoration: none;
    }

    .ham-menu {
        position: relative;
        background-color: #FFF;
        width: 100%;
        text-align: center;
        height: 55px;
        line-height: 55px;
        font-size: 14px;

    }

    .hamburger {
        display: none;
        border-bottom: 5px solid #666666;
        padding: 5px 0 5px 0;
        background-color: white;
        max-width: 1280;
        position: relative;
        z-index: 9999;
        text-align: left;
    }

    .show {
        display: block;
    }

    .showHamburger {
        display: block;
    }

    .download-menu{
        display: none;
    }

    .showDownload {
        display: block;
    }

    .logo {
        height: 75px;
        display: flex;
    }

    .div-address {
        margin-right: 10px;
        margin-left: auto;
        height: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
        line-height: 11px;
    }

    .comp-name {
        font-size: 14px;
        line-height: 14px;
        width: 100%;
        display: inline-block;
        text-align: right;
    }

    .comp-info {
        font-size: 11px;
        line-height: 11px;
        height: 11px;
        color: #666666;
        width: 100%;
        display: inline-block;
        text-align: right;
    }

    .comp-website > a {
        font-size: 11px;
        line-height: 11px;
        height: 11px;
        width: 100%;
        display: inline-block;
        text-align: right;
        color: #3366cc;;
    }

    @media only screen and (min-width: 1025px) {
        .ham-menu {
            display:none;
        }
    }

    @media only screen and (max-width: 1279px) {
        .navbar-wrapper{
            width: 100%;
        }
        
        .menu {
            width: 100%;
        }

        .menu-wrapper {
            width: 100%;
            z-index: auto;
        }

        .dropdown-content {
            width: 100%;
        }
    }

    .showLargeClass {
        display: block !important;
    }

    .showSmallClass {
        display: block !important;
    }

    .logo-container {
        display: none;
        width: 300px;
    }

    @media only screen and (max-width: 480px) {
        .navbar-td, .menu-wrapper, .menu {
            height: 55px;
        }

        .nav-item {
            height: 18px;
            line-height: 18px;
        }

        .logo {
            height: 55px;
        }

        .div-address {
            line-height: 8px;
        }

        .comp-name {
            font-size: 10px;
            line-height: 6px;
            height: 6px;
        }

        .comp-info {
            font-size: 8px;
            line-height: 6px;
            height: 6px;
        }

        .comp-website {
            font-size: 8px;
            line-height: 6px;
            height: 6px;
        }

    }

    

</style>

<div class="navbar-wrapper" bind:clientWidth={width}>
    <div class="logo">
        {#if logo}
                <div class:showLargeClass class="logo-container">
                    <Logo url={logo} width={202} height={65} />
                </div>
                <div class:showSmallClass class="logo-container">
                    <Logo url={logo} width={145} height={45} />
                </div>
        {/if}
        <div class="div-address">
            <span class="comp-name" id="office-name">{officeName}</span>
            <span class="comp-info">{address}</span>
            <span class="comp-info">{city}, {state} {zipcode}</span>
            <span class="comp-info">{phone}</span>
            {#if website !== ''}
                <span class="comp-website"><a href="{website}" target="_blank">{website}</a></span>
            {/if}
        </div>
    </div>    
	<div class="navbar-td" id="navbar-td" style="background-color: {theme_color};">
        
		<div class="menu-wrapper">
            <div class="menu">
                {#if searchable !== 'NA'}
                    <div class="nav-item left-item"></div>
                    <div class="dropdown nav-item center-item">
                        <button 
                            on:click|preventDefault
                            on:click={toggleShowMenu}
                            href="."
                            class="dropbtn btn-drpdn">
                            <svg 
                                version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlns:xlink="http://www.w3.org/1999/xlink" 
                                x="0px" y="0px"
                                width="971.986px" 
                                height="971.986px" 
                                viewBox="0 0 971.986 971.986" 
                                style="enable-background:new 0 0 971.986 971.986;"
                                class="svg-btn"
                                xml:space="preserve">
                                    <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3
                                        c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873
                                        c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"/>
                            </svg>
                        </button>
                            
                    </div> <!-- end dropdown -->
                    <div class="nav-item pull-right right-item">
                        <a 
                            on:click|preventDefault 
                            on:click={toggleShowDownload}
                            href="."
                            class="dropbtn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><title>Download</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M19.35,6a7.49,7.49,0,0,0-14-2A6,6,0,0,0,6,16H19a5,5,0,0,0,.35-10ZM17,9l-5,5L7,9h3V5h4V9Z"/></g></g></svg>
                        </a>
                    </div>
                {/if}
                <div class:showDownload="{showDownload === true}" class="download-menu">
                    <DownloadMenu options={options} btnColor={theme_color} on:closeDlMenu={toggleShowDownload}/>
                </div>
			</div>
		</div>
	</div>
</div>
<div class:show="{showClass === true}" class="dropdown-content" id="search-menu-content">
    {#if screenSize > 1024}
        <Menu params={searchParams} url={baseSearchUrl} mlsId={mlsId} p_color={theme_color}/>
    {:else if (screenSize <= 1024 && screenSize > 480)}
        <TabletMenu params={searchParams} url={baseSearchUrl} mlsId={mlsId} p_color={theme_color}/>
     {:else}   
        <SmartPhoneMenu params={searchParams} url={baseSearchUrl} mlsId={mlsId} p_color={theme_color}/>
    {/if}
</div>
<div class="ham-menu">
    <a 
        class='res-menu-link'
        on:click|preventDefault 
        on:click={toggleShowHamMenu}
        href=".">
        Market Area Trends
        {#if !showHamburger}
            <i class="nav-chart-menu-icons"><Icon tempId='hamburger' icon={icon[4]} /></i>
        {:else}
            <i class="nav-chart-menu-icons"><Icon tempId='hamburger' icon={icon[5]} /></i>
        {/if}
    </a>
</div>
<div class="hamburger" class:showHamburger="{showHamburger === true}" id="hamburger-menu-content">
    <MobileLink data={tempData.chartData} keys={keys} on:mobileKey={setKey}/>
</div>