<script>
import Icon from "./Icon.svelte";
import {faBars, faDownload, faSearch, faBookmark, faCloudDownloadAlt, faFilter, faPlus} from '@fortawesome/free-solid-svg-icons'
import Search from './Search.svelte';
import { onMount } from 'svelte';
import MobileLink from '../components/MobileLink.svelte';
import DownloadMenu from '../components/DownloadMenu.svelte';
import chartData from '../helpers/chart';
import { drawChart } from '../helpers/draw';
import { createEventDispatcher } from 'svelte';
import Menu from './Menu.svelte';

const dispatch = createEventDispatcher();

// icons for nav bar
let icon = [faFilter, faDownload, faBars, faCloudDownloadAlt, faPlus];

// props
export let background_color;
export let logo = false;
export let tempData = {};
export let searchParams;
export let baseSearchUrl;

let data;

let keys = false;

const d = chartData.subscribe(cData  => {
    tempData = cData;
});

$: keys = tempData.keys;
$: options = keys.map((t) => {
    let label = tempData.chartData[t].label;
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
    
    if(showClass){
        showDownload = false;
    }
}

let showHamburger = false;

function setPlusColor() {
    if(background_color) {
        document.getElementById('hamburger').style.color = background_color;
        document.getElementById('hamburger').style.fontSize = '12px';
    }
}

onMount(() => {
    setPlusColor();
});

function toggleShowHamMenu() {
    showHamburger = showHamburger === true ? false : true;
}

function setKey(e) {
    let newActiveId = e.detail.text;
    let newAciveElm = document.getElementById(newActiveId).click();

    dispatch('passKey', {
        text: newActiveId
    });
}

// toggle the menu on or off
window.onclick = function(e) {
    // console.log(e.target);
    if(!e.target.matches('.dropbtn') 
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
        ) {

        if (showClass) {
            toggleShowMenu();
        }

        if (showHamburger) {
            toggleShowHamMenu();
        }
    }  
}

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
        list-style: none;
        margin-top: 0px;
        height: 30px;
        padding: 0 !important;
        text-align: center;
        position: relative;
    }

    .nav-item {
        width: 30px;
        height: 30px;
        display: inline-block;
    }

    img {
        width: 100%;
        max-height: 65px;
        max-width: 202px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #F2F2F2;
    }

    .pull-right {
        float: right;
        margin-right: 5px;
        height: 30px;
    }

    .pull-left {
        float: left;
        margin-right: 5px;
        height: 30px;
    }

    i {
        line-height: 30px;
        height: 30px;
    }

    .dropbtn {
        color: white;
        padding: 0;
        border: none;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
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
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 5px 0 5px 0;
        background-color: white;
        max-width: 1280;
        position: relative;
        z-index: 9999;
        text-align: left;
    }

    @media only screen and (min-width: 769px) {
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
</style>

<div class="navbar-wrapper">
    {#if logo}
	<div class="logo">
		<img src={logo} alt={'brand image'}/>
	</div>
    {/if}
	<div class="navbar-td" id="navbar-td" style="background-color: {background_color};">
		<div class="menu-wrapper">
            <div class="menu">
                <div class="dropdown nav-item center-item">
                    <a 
                        on:click|preventDefault
                        on:click={toggleShowMenu}
                        href="."
                        class="dropbtn"><i><Icon tempId="search-menu" icon={icon[0]} /></i>
                    </a>
                        
                </div> <!-- end dropdown -->
                <div class="nav-item pull-right">
                    <a 
                        on:click|preventDefault 
                        on:click={toggleShowDownload}
                        href=".">
                        <i><Icon tempId='download-menu' icon={icon[3]} /></i>
                    </a>
                </div>
                <div class:showDownload="{showDownload === true}" class="download-menu">
                    <DownloadMenu options={options} btnColor={background_color} on:closeDlMenu={toggleShowDownload}/>
                </div>
			</div>
		</div>
	</div>
</div>
<div class:show="{showClass === true}" class="dropdown-content" id="search-menu-content">
    <Menu params={searchParams} url={baseSearchUrl}/>
</div>
<div class="ham-menu">
    <a 
        class='res-menu-link'
        on:click|preventDefault 
        on:click={toggleShowHamMenu}
        href=".">
        Market Area Trends
        <i><Icon tempId='hamburger' icon={icon[4]} /></i>
    </a>
</div>
<div class="hamburger" class:showHamburger="{showHamburger === true}" id="hamburger-menu-content">
    <MobileLink data={tempData.chartData} keys={keys} on:mobileKey={setKey}/>
</div>