<script>
import Icon from "./Icon.svelte";
import {faBars, faDownload, faSearch, faBookmark, faCloudDownloadAlt, faFilter, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
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
import { PixService } from '../pix/pix.service.ts';

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
        document.querySelector('.res-menu-link').style.color = background_color;
    }
}

onMount(() => {
    setPlusColor();
});

function toggleShowHamMenu() {
    showHamburger = showHamburger === true ? false : true;
    console.log("show ham menu");
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
        ) {

        if (showClass) {
            toggleShowMenu();
        }

        if (showHamburger) {
            toggleShowHamMenu();
        }
    }
}

window.ontouchend = function(e) {
    if (!e.target.matches('circle.enabled')) {
        closeOpenHovers();
    }
}

let width = 1280;
let screenSize = window.innerWidth; 

$: setChart(width);

function setChart() {
	screenSize = window.innerWidth;
}

let dataUrl = '';

let tempImg;
let resizeImg;

$: url2pix(logo);

function url2pix(logo) {
    const img = new Image();

    fetch(logo)
    .then((res) => {
        return res.data();
    })
    .then((i) => {
        resizeImg = resizeStep(i, 202, 65);
        return resizeImg;
    })
    .then((resizeImg) => {
        dataUrl = resizeImg.src;
    });

}

// function setLogoSize(logo) {
//     console.log(logo);
//     let pix = new PixService;
//     dataUrl = pix.url2pix(logo);
//     console.log(dataUrl);
// }

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
        height: 65px;
        width: 202px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .pull-right {
        float: right;
        margin-right: 10px;
        height: 30px;
    }

    i {
        line-height: 30px;
        height: 30px;
    }

    a {
        font-size: 18px;
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
    }

    @media only screen and (max-width: 480px) {
        .navbar-td, .menu-wrapper, .menu {
            height: 55px;
        }

        .nav-icons {
            height: 55px;
            line-height: 55px;
        }

        .nav-item {
            height: 55px;
            line-height: 55px;
        }

        .nav-item > a {
            line-height: 55px;
            height: 55px;
            vertical-align: middle;
            font-size: 18px;
        }

        img {
            height: 45px;
            width: 145px;
        }
        
        .logo {
            height: 55px;
        }
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

</style>

<div class="navbar-wrapper" bind:clientWidth={width}>
    <div class="logo">
        {#if logo}
            <!-- {setLogoSize(logo)} -->
            <img src={logo} alt={'brand image'}/>
        {/if}
    </div>    
	<div class="navbar-td" id="navbar-td" style="background-color: {theme_color};">
		<div class="menu-wrapper">
            <div class="menu">
                <div class="dropdown nav-item center-item">
                    <a 
                        on:click|preventDefault
                        on:click={toggleShowMenu}
                        href="."
                        class="dropbtn">
                        <i class="nav-icons"><Icon class="search-menu-button" tempId="search-menu" icon={icon[0]} /></i>
                    </a>
                        
                </div> <!-- end dropdown -->
                <div class="nav-item pull-right">
                    <a 
                        on:click|preventDefault 
                        on:click={toggleShowDownload}
                        href="."
                        class="dropbtn">
                        <i class="nav-icons"><Icon class="dropdown-menu-button dd-dl" tempId='download-menu' icon={icon[3]} /></i>
                    </a>
                </div>
                <div class:showDownload="{showDownload === true}" class="download-menu">
                    <DownloadMenu options={options} btnColor={theme_color} on:closeDlMenu={toggleShowDownload}/>
                </div>
			</div>
		</div>
	</div>
</div>
<div class:show="{showClass === true}" class="dropdown-content" id="search-menu-content">
    {#if screenSize > 768}
        <Menu params={searchParams} url={baseSearchUrl} mlsId={mlsId}/>
    {:else if (screenSize <= 768 && screenSize > 480)}
        <TabletMenu params={searchParams} url={baseSearchUrl} mlsId={mlsId}/>
     {:else}   
        <SmartPhoneMenu params={searchParams} url={baseSearchUrl} mlsId={mlsId}/>
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