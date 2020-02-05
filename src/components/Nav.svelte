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

let showLargeClass = true;
let showSmallClass = false;

$: showSmallLogo(width);

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
        list-style: none;
        margin-top: 0px;
        height: 30px;
        padding: 0 !important;
        text-align: right;
        position: relative;
    }

    .nav-item {
        width: 30px;
        height: 30px;
        display: inline-block;
    }

    .center-item {
        width: 33%;
        text-align: center;
    }
    .right-item {
        width: 33%;
        height: 30px;
        padding-right: 10px;
    }

    svg {
        line-height: 18px;
        height: 18px;
        width: 30px;
        fill: #ffffff;
        vertical-align: middle;
    }

    a {
        font-size: 18px;
        color: #ffffff;
        line-height: 18px;
    }

    .dropbtn {
        color: white;
        padding: 0;
        border: none;
        cursor: pointer;
        height: 30px;
        line-height: 18px;
        vertical-align: sub;
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

    .showLargeClass {
        display: block !important;
    }

    .showSmallClass {
        display: block !important;
    }

    .logo-container {
        display: none;
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
    </div>    
	<div class="navbar-td" id="navbar-td" style="background-color: {theme_color};">
		<div class="menu-wrapper">
            <div class="menu">
                <!-- <div class="nav-item left-item"></div> -->
                <div class="dropdown nav-item center-item">
                    <a 
                        on:click|preventDefault
                        on:click={toggleShowMenu}
                        href="."
                        class="dropbtn">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                width="971.986px" height="971.986px" viewBox="0 0 971.986 971.986" style="enable-background:new 0 0 971.986 971.986;"
                                xml:space="preserve">
                            <g>
                                <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3
                                    c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873
                                    c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"/>
                            </g>
                        </svg>
                    </a>
                        
                </div> <!-- end dropdown -->
                <div class="nav-item pull-right right-item">
                    <a 
                        on:click|preventDefault 
                        on:click={toggleShowDownload}
                        href="."
                        class="dropbtn">
                        <svg
                            xmlns:dc="http://purl.org/dc/elements/1.1/"
                            xmlns:cc="http://creativecommons.org/ns#"
                            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                            xmlns:svg="http://www.w3.org/2000/svg"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                            inkscape:version="1.0beta2 (2b71d25, 2019-12-03)"
                            sodipodi:docname="cloud-download-rs.svg"
                            xml:space="preserve"
                            enable-background="new 0 0 512 512"
                            viewBox="0 0 450 400.22299"
                            height="400.22299"
                            width="450"
                            y="0px"
                            x="0px"
                            id="Layer_1"
                            version="1.1"><metadata
                            id="metadata82"><rdf:RDF><cc:Work
                                rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
                                    rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
                            id="defs80" /><sodipodi:namedview
                            inkscape:current-layer="Layer_1"
                            inkscape:window-maximized="0"
                            inkscape:window-y="85"
                            inkscape:window-x="2610"
                            inkscape:cy="200.112"
                            inkscape:cx="225"
                            inkscape:zoom="2.0371094"
                            inkscape:guide-bbox="true"
                            showguides="true"
                            showgrid="false"
                            id="namedview78"
                            inkscape:window-height="1126"
                            inkscape:window-width="1917"
                            inkscape:pageshadow="2"
                            inkscape:pageopacity="0"
                            guidetolerance="10"
                            gridtolerance="10"
                            objecttolerance="10"
                            borderopacity="1"
                            inkscape:document-rotation="0"
                            bordercolor="#666666"
                            pagecolor="#ffffff"><sodipodi:guide
                            id="guide84"
                            orientation="0,-1"
                            position="103.99521,400.64023" /><sodipodi:guide
                            id="guide86"
                            orientation="0,-1"
                            position="74.54171,-0.90914205" /></sodipodi:namedview>
                            <g transform="translate(-31,-55.888)" id="g75">
                                <path inkscape:connector-curvature="0" id="path71"
                                    d="m 442.55,203.072 c 4.172,-11.615 6.45,-24.132 6.45,-37.184 0,-60.751 -49.248,-110 -110,
                                    -110 -34.805,0 -65.829,16.169 -85.985,41.4 -12.395,-6.021 -26.31,-9.4 -41.015,-9.4 -51.915,
                                    0 -94,42.085 -94,94 0,0.28 0.008,0.559 0.011,0.839 C 68.92,189.095 31,231.062 31,281.888 c 0,55.229 44.771,
                                    100 100,100 h 63.646 l -60.209,-73.732 h 89.538 v -93.102 h 88.667 v 93.102 l 88.729,0.002 -60.207,73.73 H 
                                    381 c 55.229,0 100,-44.771 100,-100 0,-32.015 -15.046,-60.513 -38.45,-78.816 z" />
                                <polygon id="polygon73" points="232.923,224.085 232.923,317.047 154.35,317.047 211.128,386.578 267.904,456.111 324.68,
                                    386.578 381.456,317.049 302.885,317.047 302.885,224.085 " />
                        </g>
                    </svg>
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