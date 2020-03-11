<script>
import { onMount, afterUpdate } from "svelte";
import Icon from "./Icon.svelte";
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { createEventDispatcher } from 'svelte';
import AreaValueSelect from './AreaValuesSelect.svelte';
import SubSelect from './PropertySelect.svelte';
import HRbar from './HRBar.svelte';

const dispatch = createEventDispatcher();
let icon = [faCaretRight, faCaretDown];

export let items = [];
export let menuTitle = '';
export let itemType = 'propertyTypes';
export let parentId;
export let areaTypes = [];
export let type = '';
export let searchParam = '';
export let typeSelected = '';
export let initialAreaType = '';
export let initialPropertyClassList = '';
let unChecked = false;

let currentChecked = '';

$: param = searchParam;
$: areaType = decodeURI(typeSelected);
$: typeSelected = decodeURI(typeSelected);
let currentGroupId = '';
let currentAreaSubMenuType = '';

let allAreaChecked;


let options = [];
let tempType = '';
let notAllSelected = [];
let allSelected = [];

function checkAllOption(itemType, items, searchParam) {

    if(itemType === 'property-types') {
        let paramsSelected = param.split(',');
        let ps = paramsSelected.map((t) => {
            return parseInt(t);
        });

        items.map((item) => {
            tempType = item.value;
            options[tempType] = item.children.map((opt) => {
                return opt.value;
            });
        });
        
        let keys = Object.keys(options);
        keys.forEach((o) => {
            let opts = options[o];
            let optsCount = opts.length;
            let notSelectedCount = 0;
            let itemCount = 0;
            
            opts.forEach((i) => {
                
                if (ps.indexOf(i) === -1) {
                    notSelectedCount++;
                }

                itemCount++;

                if (itemCount === optsCount && notSelectedCount == 0) {
                    allSelected.push(o.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase());
                }
            });
        });
        
        if (keys.length === allSelected.length) {
            let allPropertyEl = document.querySelector('.all-property-input-select');
            allPropertyEl.checked = true;
        }
    }

}

/**
 * show property menus
 * */
function showOptions(groupId) {

    closeOpenedMenus();
    if (currentGroupId !== groupId) {
        let parentMenuEl = document.getElementById(groupId + '-menu');
        let subMenuEl = document.getElementById(groupId);
        subMenuEl.style.display = 'block';
        currentGroupId = groupId;
    } else {
        currentGroupId = '';
    }

    
    
}

/**
 * close property menus
 * */
function closeOpenedMenus() {
    let els = document.querySelectorAll('.sub-menu-property');
    els.forEach((el) => {
        el.style.display = 'none';
    });
}

/**
 * show area menus
 * */
function showAreaOptions(type, checked) {
    currentChecked = type;

    let id = "parent-" + type.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
    let target = document.getElementById(id);

    let targetChecked = target.checked;

    if (type === currentChecked && targetChecked) {
        closeOpenedAreaMenus();
        if (!allAreaChecked) {
            let tempType = type.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
            if (currentAreaSubMenuType !== tempType) {
                let menuBlock = document.getElementById('area-types-menu');
                let menuBlockHeight = menuBlock.offsetHeight - 3;
                let menuBlockLeft = menuBlock.style.left - 1;
                let parentMenuEl = document.getElementById(tempType + '-menu');
                let subMenuEl = document.getElementById(tempType);
                subMenuEl.style.display = 'block';
                subMenuEl.style.top = menuBlockHeight + 'px';
                subMenuEl.style.left = menuBlockLeft + 'px';

                if (window.innerWidth <= 480) {
                    subMenuEl.style.width = menuBlock.style.width;
                }
                currentAreaSubMenuType = tempType;
            } else {
                currentAreaSubMenuType = '';
            }
        }
    }
 }

/**
 * close area menus
 * */
function closeOpenedAreaMenus() {
    let els = document.querySelectorAll('.sub-menu-area');
    els.forEach((el) => {
        el.style.display = 'none';
    });
}

let allPropertyChecked = false;

$: propertyChecked(allPropertyChecked);

function propertyChecked(checked) {

    let els = document.querySelectorAll('.property-input-select');
    let elsSubItems = document.querySelectorAll('.property-input-select-item');
    // All properies checked/unchecked
    els.forEach((el) => {
        el.checked = checked;
    });

    elsSubItems.forEach((elSubItem) => {
        elSubItem.checked = checked;
    });

}

let groupChecked = false;

function groupCheckedItems(checked) {
    let propItems = document.querySelectorAll('.property-input-select-item.' + checked);
    propItems.forEach((propEl) => {
        propEl.checked = document.querySelector('.property-input-select.' + checked).checked;
    });
}
// time menu settings
let timeValues = [
    {description: '3 Years', value: 37},
    {description: '1 Year', value: 13},
    {description: 'Mnth/YTD', value: 'mth'}
];

function toggle() {
    dispatch('close', {
        t: 0
    });
    removeActiveFilters();
}

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

function checkAllArea(e) {

    if (e.checked === true) {
        unChecked = false;
    }

    let parent = e.dataset.type;
    let classId = parent.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
    let checked = e.checked;
    let parentAreaEls = document.querySelectorAll('.area-input-select');
    let subParentAreaEls = document.querySelectorAll('.all-subparent-select');
    let areaEls = document.querySelectorAll('.ng');
    
    dispatch('avType', {
        type: parent
    });

    showAreaOptions(parent, checked);

    parentAreaEls.forEach((pEl) => {
        if (parent !== pEl.dataset.type) {
            pEl.checked = false
        }
    });

    subParentAreaEls.forEach((sPEl) => {
        if (sPEl.name === 'all-' + classId) {
            if (e.checked == true) {
                sPEl.checked = true;
            } else {
                sPEl.checked = false;
            }
        } else {
            sPEl.checked = false;
        }
    });

    areaEls.forEach((el) => {
        if (parent === el.dataset.parent){
            if (e.checked == true) {
                el.checked = true;
            } else {
                el.checked = false;
            }
        } else {
            el.checked = false;
        }
    });
}

onMount(() => {
    if(initialPropertyClassList){
        if (initialPropertyClassList.toLowerCase() === 'all') {
            allPropertyChecked = true;
        }
    }

    checkAllOption(itemType, items, searchParam);

    // closes all opened menus on mount
    closeOpenedAreaMenus();
});

function selectAllArea() {
    let allAreas = document.querySelectorAll('.area-input-select-item');
    let allArea = document.querySelector('.all-area-input-select');
    let allCatAreas = document.querySelectorAll('.area-input-select');
    if (allArea.checked) {
        allAreas.forEach((el) => {
            el.checked = true;
        });

        closeOpenedAreaMenus();
        unChecked = true;
    }

}

</script>

<style>

    button {
        color: #333;
        background-color: #FFF;
        outline: none;
        border-radius: 5px;
        width: 50px;
        height: 15px;
        line-height: 10px;
        font-size: 10px;
    }

    .select-menu-block {
        display: block;
        width: 460px;
        background-color: white;
        position: absolute;
        border-top: 1px solid #CCCCCC;
        border-left: 1px solid #CCCCCC;
        border-right: 1px solid #CCCCCC;
        border-bottom: 5px solid #666666;
    }
 
    .option-wrapper {
        height: 20px;
        line-height: 10px;
        text-align: left;
    }

    .option-wrapper > input {
        text-align: left;
    }

    input {
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        /* margin-left: 10px; */
        margin-right: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
    }   

    a > label {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: #666666;
    } 

    a:visited {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: #666666;
    } 

    hr {
        margin-top: 10px;
        margin-bottom: 0;
        color: #CCCCCC;
    }

    .pull-right {
        float: right;
    }

    .property-type-menu-item {
        float: right;
    }

    .area-type-menu-item {
        float: right;
    }

    .time-type-menu-item {
        float: right;
    }

    .done-btn {
        margin-top: 0;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        margin-right: 10px;
        margin-bottom: 5px;
    }

    i {
        line-height: 15px;
        height: 15px;
    }

    h3 {
        padding-left: 10px;
        font-size: 12px;
        color: #666666;
        font-weight: 800;
        margin: 0px !important;
        line-height: 30px;
        height: 30px;
    }

    .hr-title {
        margin-top: 0 !important;
    }

    @media only screen and (min-width: 1025px) {
        .item-group {
            margin-right: 0 !important;
        }
    }

    @media only screen and (max-width: 1024px) {

        .option-wrapper {
            margin-left: 30px;
        }

        .property-input-select {
            margin-left: 30px;
        }

        .area-input-select {
            margin-left: 30px;
        }

        .option-wrapper {
            height: 30px;
        }

        .input-select {
            line-height: 30px;
        }

        .select-menu-block {
            width: 458px;
        }

        div.option-wrapper {
            height: 30px;
            line-height: 30px;
        }

        label {
            line-height: 30px;
            height: 30px;
        }

        
    }

    @media only screen and (max-width: 768px) {
        

        #time-values-menu {
            top: 76px;
        }

		.select-menu-block {
            position: absolute;
        }
        
        .sub-menu-area-group, .option-wrapper {
            text-align: left;
        }

        .sub-menu-area {
            width: 100% !important;
            left: 0px !important;
            text-align: left;
        }

        .area-wrapper {
            text-align: left !important;
        }

    }

    @media only screen and (max-width: 480px) {
        .select-menu-block {
            left: 0 !important;
        }
        #area-types-menu {
            top: 40px;
        }
    }

    @media only screen and (min-width: 481px) {
        label {
            margin-bottom: 0 !important;
        }
    }

    @media only screen and (min-width: 412px) and (max-width: 768px) {
        .select-menu-block {
            width: 458px;
            top: 33px;
        }
    }

    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        #time-values-menu {
            top: 76px;
        }

        #area-types-menu {
            top: 33px;
        }

        #property-types-menu {
            top: -10px;
        }
    }
    
    @media only screen and (max-width: 480px) {
        #time-values-menu {
            top: 76px;
        }

        #area-types-menu {
            top: 33px;
        }

        #property-types-menu {
            top: -11px;
        }
    }

</style>

{#if itemType === 'property-types'}
    <div class='select-menu-block' id='property-types-menu'>
        {#if items.length > 0}
            {#if window.innerWidth > 1024}
                <h3>{menuTitle}</h3>
                <HRbar />
            {/if}
        <div class='option-wrapper all-property-items ml-30' id='{'all-group-menu'}'>
            <input 
                class='all-property-input-select' 
                type='checkbox' 
                name='all' 
                value='all' 
                bind:checked={allPropertyChecked}>
            <a href='.' on:click|preventDefault>
                <label>ALL</label>
            </a>
        </div>
            {#each items as item}
            
                <div class='option-wrapper poperty-item ml-60' id='{item.group + '-menu'}'>
                        <input 
                            class='property-input-select {item.group}' 
                            type='checkbox' data-type='{item.group}' 
                            name='{item.group}' 
                            value='{item.group}' 
                            on:click={() => {groupCheckedItems(item.group)}}>
                        <a href='.' on:click|preventDefault on:click={() => showOptions(item.group)}>
                        <label>{item.value}</label>
                        {#if currentGroupId !== item.group}
                            <i class="property-type-menu-item"><Icon class="item-menu item-group" tempId="{item + '-item'}" icon={icon[0]} /></i>
                        {:else}
                            <i class="property-type-menu-item"><Icon class="item-menu item-group" tempId="{item + '-item'}" icon={icon[1]} /></i>
                        {/if}
                        </a>
                </div>
                <SubSelect type={item.group} data={item.children} parentId={'property-types'} params={param}/>
            {/each}
        {/if}
        <hr />
        <div class="pull-right done-btn">
            <button on:click|preventDefault class="sub-menu-btn" on:click="{toggle}">Done</button>
        </div>
    </div>
{/if}

{#if itemType === 'area-types'}
    <div class="select-menu-block" id='area-types-menu'>
        {#if items.length > 0}
            {#if window.innerWidth > 1024}
                <h3>{menuTitle}</h3>
                <HRbar />
            {/if}
            <div class='option-wrapper all-area-option-menu ml-30' id='{'all-group-menu'}'>
                {#if initialAreaType.toLowerCase() === 'all'}
                    <input class='all-area-input-select' type='radio' name='area-type' value='all' checked='checked'  on:click="{selectAllArea}">
                {:else}
                    <input class='all-area-input-select' type='radio' name='area-type' value='all' on:click="{selectAllArea}">
                {/if}
                <a href='.' on:click|preventDefault>
                    <label>ALL</label>
                </a>
            </div>
            {#each items as item}
                <div class='option-wrapper area-option-menu ml-30' id='{item.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() + '-menu'}'>
                    {#if item === typeSelected && initialAreaType.toLowerCase() !== 'all'}
                        <input 
                            class='input-select area-input-select'
                            type='radio'
                            data-type="{item}"
                            name='area-type'
                            value='{item}'
                            checked='checked'
                            id="parent-{item.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}"
                            on:change="{(e) => checkAllArea(e.target)}" />
                    {:else}
                        <input 
                            class='input-select area-input-select' 
                            type='radio' 
                            data-type="{item}" 
                            name='area-type' 
                            value='{item}' 
                            id="parent-{item.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}"
                            on:change="{(e) => checkAllArea(e.target)}" />
                    {/if}
                    <a href='.' on:click|preventDefault on:click={() => showAreaOptions(item)}>
                        <label>{item}</label>
                        {#if currentAreaSubMenuType !== item.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() || unChecked == true }
                            <i class="area-type-menu-item"><Icon class="item-menu item-group" tempId="{item + '-item'}" icon={icon[0]} /></i>
                        {:else}
                            <i class="area-type-menu-item"><Icon class="item-menu item-group" tempId="{item + '-item'}" icon={icon[1]} /></i>
                        {/if}
                    </a>
                </div>
                    <div class="type-menu">
                        <AreaValueSelect areaValueData={areaTypes[item].finalAreaValues} type={item} params={param} typeSelected={areaType} initialAreaType={initialAreaType}/>
                    </div>
                
            {/each}
        {/if}
        
        <hr />
        <div class="pull-right done-btn">
            <button on:click|preventDefault class="sub-menu-btn" on:click="{toggle}">Done</button>
        </div>
    </div>        
{/if}

{#if itemType === 'time-values'}
    <div class="select-menu-block" id='time-values-menu'>
        {#if window.innerWidth > 1024}
            <h3>{menuTitle}</h3>
            <HRbar />
        {/if}
        {#each timeValues as tv}
            <div class='option-wrapper ml-30'>
                {#if parseInt(param) === tv.value}
                    <input class='input-select input-select-time' type='radio' name='time' value='{tv.value}' checked='checked'>
                {:else if parseInt(param) !== 13 && parseInt(param) !== 37}
                    <input class='input-select input-select-time' type='radio' name='time' value='{tv.value}' checked='checked'>
                {:else}    
                    <input class='input-select input-select-time' type='radio' name='time' value='{tv.value}'>
                {/if}    
                <a href='.' on:click|preventDefault>
                    <label>{tv.description}</label>
                </a>
            </div>
        {/each}
        <hr />
        <div class="pull-right done-btn">
                <button on:click|preventDefault class="sub-menu-btn" on:click="{toggle}">Done</button>
        </div>
    </div>
{/if}