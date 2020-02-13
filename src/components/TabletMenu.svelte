<script>
import { onMount, afterUpdate } from 'svelte';
import Select from './Select.svelte';
import Icon from "./Icon.svelte";
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Elipsis from './Elipsis.svelte';
import SubSelect from './SubSelect.svelte';
import AreaValueSelect from './AreaValuesSelect.svelte';
import TimeSelect from './TimeSelect.svelte';
import searchData from '../helpers/searchdata';

export let params;
export let url;
export let p_color;

let initialPropertyClassList = 'none';
$: initialPropertyClassList = typeof (params) === 'undefined' ? false : params.propertyClassList;

let initalAreaType = 'none';
$: initialAreaType = params ? params.areaType : false;

//&set=MTAvNTk=

let pathname = window.location.pathname;
let isLoading = true;

export let mlsId;
let data;
let searchMenuData = false;
$: searchMenuData =  data;
let searchURL;

const propertyTypesURL = '/demo/data/get-property-types';

$: searchURL = url + propertyTypesURL + '/' + mlsId;
$: searchParamsURL = url;

let icon = [faCaretRight, faCaretDown];

let leftEl;

// property types after processing
let pTypes = [];
let allAreaTypes = [];
let subAreaTypes;
let apiAreaTypes;
// from the raw input
let areaTypes = {};
// area types
let atKeys = [];

let parentIds = [
    'property-types',
    'area-types'
];

let tempSubPTypes = [];
function createSearchMenus(data) {

    if (data) {
        areaTypes = data.allAreaTypes;

        atKeys = Object.keys(areaTypes);
        
        let i = 0;
        for (let atKey of atKeys) {
            allAreaTypes[atKeys[i]] = areaTypes[atKey].finalAreaValues;
            i++;
        }

        pTypes = data.propertyTypes.map((pType, i) => {
            let label = pType.label;
            let group = label.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
            let value = label;

            return  {'value': value, 'group': group, 'label': label, 'children': pType.children};
        });
    }
} 

let timeIcon = 0;

let showPropertyMenu = false;
let showTimeMenu = false;

function toggleShowPopertyMenu() {
    showPropertyMenu = showPropertyMenu === true ? false : true;
    let prtyBtn = document.getElementById('btn-proptery');
    // toggle other menus off
    // set the position of the menu
    if (showPropertyMenu) {
        prtyBtn.style.color = p_color;
        showAreaTypesMenu = false
        showTimeMenu = false
        setLeft('property-types');
    } else {
        prtyBtn.style.removeProperty('color');
    }
}

function setLeft(id)  {

    let el = document.getElementById(id);
    let menu = document.getElementById(id + '-menu');
    menu.style.removeProperty('left');
    menu.style.removeProperty('top');
    // leftEl = el.offsetLeft + 'px';
    // menu.style.left = leftEl;

    if (window.innerWidth <= 768) {
        menu.style.top = '-11px';
    }

    let els = document.querySelectorAll('.sub-menu-property');
    els.forEach((el) => {
        let lEl = parseInt(leftEl);
        // el.style.left = '10px';
        el.style.zIndex = 1;
    });
    
}

let showAreaTypesMenu = false;

function toggleShowAreaTypesMenu() {
    showAreaTypesMenu = showAreaTypesMenu === true ? false : true;
    let prtyBtn = document.getElementById('btn-area');
    // toggle other menus off
    // set the position of the menu
    if (showAreaTypesMenu) {
        prtyBtn.style.color = p_color;
        showPropertyMenu = false;
        showTimeMenu = false
        setAreaLeft('area-types');
    } else {
        prtyBtn.style.removeProperty('color');
    }
   
}

function setAreaLeft(id)  {

    let el = document.getElementById(id);
    let menu = document.getElementById(id + '-menu');
    menu.style.removeProperty('left');
    menu.style.removeProperty('top');
    // leftEl = el.offsetLeft + 'px';
    // menu.style.left = leftEl;
    // menu.style.top = '35px';

    let els = document.querySelectorAll('.sub-menu-area');
    els.forEach((el) => {
        el.style.zIndex = 9;
        // el.style.left = '10px';
    });
    
}

function closeAreaMenu() {
    showAreaTypesMenu = false;
}

function toggleShowTimeMenu() {

    showTimeMenu = showTimeMenu === true ? false : true;
    let prtyBtn = document.getElementById('btn-time');
    // toggle other menus off
    // set the position of the menu
    if (showTimeMenu) {
        prtyBtn.style.color = p_color;
        timeIcon = 1;
        showPropertyMenu = false;
        showAreaTypesMenu = false;
        
        setTimeMenuleft('time-values');

        document.getElementById('time-values-menu').style.display = 'block';
    } else {
        timeIcon = 0;
        prtyBtn.style.removeProperty('color');
    }
}

function setTimeMenuleft(id) {

    let el = document.getElementById(id);
    let menu = document.getElementById(id + '-menu');
    menu.style.removeProperty('left');
    menu.style.removeProperty('top');
    // leftEl = el.offsetLeft + 'px';
    // menu.style.left = leftEl;

    if (window.innerWidth > 411 && window.innerWidth <= 768) {
        let menuTop = el.style.top;
        menu.style.top = menuTop + 80 + 'px';
    }

    if (window.innerWidth <= 411) {
        let menuTop = el.style.top;
        menu.style.top = menuTop + 80 + 'px';
        menu.style.width = el.style.width + 'px';
    }

    let els = document.querySelectorAll('.sub-menu-time');
    els.forEach((el) => {
        let lEl = parseInt(leftEl);
        let leftTotal = lEl + 230;
        el.style.left = leftTotal + 'px';
    });
}

function closePropertyMenu() {
    showPropertyMenu = false;
}

function closeTimeMenu() {
    showTimeMenu = false;
}

let propertySelectedArr = [];
let propertyDisplayValueArr = [];
let propertySelected = '';
let areaType = '';
$: areaType = params ? params.areaType : ''; 
let areaValueSelectedArr = [];
let areaValueSelected = '';
let timePeriod;
$: timePeriod = params ? params.timePeriod : '';
let timePeriodValue;
$: timePeriodValue = params ? params.timePeriodValue : '';
let search = '' 
$: search = params ? params.search : '';
let timeEls = [];
let areaValuesDisplayText;
let areaValuesDisplayTextArr = [];
$: areaValuesDisplayText = params ? params.areaValuesDisplayText : '';
let propertyTypeDisplayText;
$: propertyTypeDisplayText = params ? params.propertyTypeDisplayText : '';
let areaValue;

function setAvType(e) {
    areaValue = e.detail.type;
}

function clearAll() {
    let propertyCheckedBoxes = document.querySelectorAll(".property-input-select-item:checked");
    let areaValueCheckedBoxes = document.querySelectorAll(".area-input-select-item:checked");
    propertyCheckedBoxes.forEach((propEl) => {
        propEl.checked = false;
    });

    areaValueCheckedBoxes.forEach((avEl) => {
        avEl.checked = false;
    });

}


function buildSearchParams() {
    propertySelectedArr = [];
    propertySelected = '';
    areaValueSelectedArr = [];
    areaValueSelected = '';
    propertyDisplayValueArr = [];
    areaValuesDisplayText = '';

    let propertyItems = document.querySelectorAll('.property-input-select-item:checked');
    let allArea = document.querySelector('.all-area-input-select').checked;
    let areaValueItems = [];

    let inputAreaTypes = document.querySelectorAll('.area-input-select');
    inputAreaTypes.forEach((cEl) => {
        if (cEl.checked) {
            areaType = cEl.dataset.type;
        }
    });
    
    if (!allArea) {
        areaValueItems = document.querySelectorAll('input[data-parent="' + areaType + '"]:checked');
    }

    if ((propertyItems.length > 0 && areaValueItems.length > 0) || (propertyItems.length > 0 && allArea)) {

        propertyItems.forEach((propEl) => {
            if (propEl.checked && propEl.value !== 'all') {
                propertySelectedArr.push(propEl.value);
                propertyDisplayValueArr.push(propEl.dataset.value);
            }
            
        });
        
        propertySelected = propertySelectedArr.join();
        propertyTypeDisplayText = propertyDisplayValueArr.join();

        if (!areaValue) {
            areaValueItems.forEach((av) => {
                if (av.checked) {
                    areaValueSelectedArr.push(av.value.replace(',', '|'));
                    areaValuesDisplayTextArr.push(av.value);
                }
            });

            areaValueSelected = areaValueSelectedArr.join();
            areaValuesDisplayText = areaValuesDisplayTextArr.join();
        } else {
            areaValueSelected = 'ALL';
            areaValuesDisplayText = 'ALL';
        }

        timeEls = document.querySelectorAll('.input-select-time');    
        timeEls.forEach((tEl) => {
            if (tEl.checked) {
                timePeriodValue = tEl.value;
            }
        });

        if (timePeriodValue == 13 || timePeriodValue == 37 ) {
            search = 'normal';
            timePeriod = 'mth';
        } else {
            search = 'mnth-ytd';
            timePeriodValue = '';
            timePeriod = '';
        }

        let querySrting = 'mlsId=' + mlsId + '&search=' + search + '&timePeriod=' + timePeriod + '&timePeriodValue=' + timePeriodValue + '&areaType=' + areaType + '&areaValueList=' + areaValueSelected + '&propertyTypeList=' + propertySelected + '&areaValuesDisplayText=' + areaValuesDisplayText +'&propertyTypeDisplayText=' + propertyTypeDisplayText;
        let newUrl = url + pathname + '?' + encodeURI(querySrting);
        // newUrl = newUrl.replace('http://localhost:5000', 'http://staging.jw');

        location.replace(newUrl);

    } else {
        alert("Please select at least one area type and one property type");
    }
}

let e;

onMount(() => {
    searchData.subscribe(value => {
        e = value;
    });

    if (!e) {
        fetch(searchURL)
        .then(res => {
            if(!res.ok){
                throw new Error("Failed to fetch");
            }
            
            return res.json();
        })
        .then(d => {
            isLoading = false;
            searchData.set(d);
            createSearchMenus(d);
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        isLoading = false;
        createSearchMenus(e);
    }
});

</script>

<style>

    form {
        height: 170px;
        width: 100%;
        background-color: white;
    }

    .type-menu {
        display: none;
        margin-right: 10px;
    }

    .themed {
        width: 460px;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #666666;
        --borderRadius: 15px;
        --placeHolderColor: #3F4F5F;
        margin-left: 10px;
    }

    button {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        float: left;
        margin-left: 10px;
        text-decoration: none;
        color: #666666;
        width: 100%;
        background-color: white;
        border: none;
        margin-left: 0 !important;
    }

    button:active {
        background-color: lightgrey;
        box-shadow: 0 5px #666;
    }
    .search-menu-button {
        border-radius: 5px;
        text-align: center !important;
        padding: 0 !important;
    }

    .search-button-wrapper {
        display: inline-block;
        width: 100%;
        text-align: center;
    }

    .search-button-themed {
        width: 60px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #666666;
        border-radius: 5px;
        margin-left: 0;
        display: inline-block;
    }

    .label {
        display: block;
        padding-top: 0px;
    }
    
    i {
        line-height: 24px;
        height: 30px;
        float: right;
    }

    .showPropertyMenu {
        display: block;
        position: absolute;
        top: 45px;
    }

    .showAreaTypesMenu {
        display: block;
        position: absolute;
        top: 45px;
    }

    .showTimeMenu {
        display: block;
        position: absolute;
        top: 45px;
    }

    .search-menu-wrapper {
        display: block;
    }

    .search-menu-wrapper > .themed {
        display: inline-block;
    }

    .elipsis-container {
        width: 100%;
        height: 30px;
    }

    .center-elipsis {
        text-align: center;
    }

    .type-menu {
        color: black;
    }

    .menu-button {
        height: 28px;
        line-height: 27px;
    }

    .first-search-button-themed {
        margin-right: 20px;
    }
    
    .menu-button {
        text-align: left;
    }

    @media only screen and (max-width: 1024px) {
        form {
            width: 460px;
            margin-left: auto;
            margin-right: auto;
        }

        .themed {
            margin-left: 0 !important;
        }
    }

</style>
<form>
    {#if !isLoading}
    <div class="search-menu-wrapper" >
        {#if pTypes.length > 0}
        <div class="themed" id='property-types'>
            <div class='label'>
                <button class='menu-button' on:click|preventDefault on:click={toggleShowPopertyMenu} href="." id='btn-proptery'>Property Type
                    {#if !showPropertyMenu}
                        <i><Icon class="item-menu" tempId="property-type-menu-right" icon={icon[0]} /></i>
                    {:else}
                        <i><Icon class="item-menu" tempId="property-type-menu-down" icon={icon[1]} /></i>
                    {/if} 
                    </button>
            </div>
        </div>
        <div class:showPropertyMenu class="type-menu">
                <Select 
                    items={pTypes} 
                    menuTitle={'Property Types'} 
                    itemType="property-types" 
                    parentId={'property-types'} 
                    initialPropertyClassList={initialPropertyClassList}
                    initialAreaType={initialAreaType}
                    on:close={closePropertyMenu}
                    searchParam={params.propertyTypeList} />
            </div>
        {/if}


        {#if atKeys.length > 0}
            <div class="themed" id="area-types">
                <div class='label'>
                    <button class='menu-button' on:click|preventDefault on:click={toggleShowAreaTypesMenu} href="." id='btn-area'>Area Types
                        {#if !showAreaTypesMenu}
                            <i><Icon class="item-menu" tempId="area-type-menu-right" icon={icon[0]} /></i>
                        {:else}
                            <i><Icon class="item-menu" tempId="area-type-menu-down" icon={icon[1]} /></i>
                        {/if}
                    </button>
                </div>
            </div>
            <div class:showAreaTypesMenu class="type-menu">
                <Select 
                    on:avType={setAvType}
                    items={atKeys} 
                    menuTitle={'Area Types'} 
                    itemType="area-types" 
                    parentId={'area-types'} 
                    on:close={closeAreaMenu} 
                    areaTypes={areaTypes}
                    initialPropertyClassList={initialPropertyClassList}
                    initialAreaType={initialAreaType}
                    typeSelected={params.areaType}
                    searchParam={params.areaValueList}/>
            </div>
        {/if}

            <div class="themed" id='time-values'>
                <div class="label" >
                    <button class="menu-button" on:click|preventDefault on:click={toggleShowTimeMenu} href="." id='btn-time'>Time Frame
                        {#if !showTimeMenu }
                            <i><Icon class="item-menu" tempId="time-type-menu-right" icon={icon[0]} /></i>
                        {:else}
                            <i><Icon class="item-menu" tempId="time-type-menu-down" icon={icon[1]} /></i>
                        {/if} 
                    </button>
                </div>
            </div>
            <div class:showTimeMenu class="type-menu">
                    <Select 
                        items={[]} 
                        menuTitle='Time Frame' 
                        itemType="time-values" 
                        parentId='time-values' 
                        on:close={closeTimeMenu} 
                        searchParam={params.timePeriodValue}/>
            </div>
        <div class="search-button-wrapper">
            <div class="search-button-themed first-search-button-themed">
            <div class="label">
                <button on:click|preventDefault on:click={clearAll} class="menu-button search-menu-button">Reset</button>
            </div>
            </div>
            <div class="search-button-themed">
                <div class="label">
                    <button on:click|preventDefault class="menu-button search-menu-button" on:click={buildSearchParams}>Search</button>
                </div>
            </div>
        </div>
    </div>
    
    {:else} 
        <div class="elipsis-container">
            <div class="center-elipsis">
                <Elipsis />
            </div>
        </div>
    {/if}
</form>