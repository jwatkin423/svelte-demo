<script>
import { onMount, afterUpdate } from "svelte";
import Icon from "./Icon.svelte";
import {faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { createEventDispatcher } from 'svelte';
import AreaValueSelect from './AreaValuesSelect.svelte';
import SubSelect from './SubSelect.svelte';
// import  AutoComplete from 'svelte-autocomplete/dist/index';


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

$: param = searchParam;
$: areaType = typeSelected;
let currentGroupId = '';
let currentAreaSubMenuType = '';

let allAreaChecked;

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
    closeOpenedAreaMenus();
    if (!allAreaChecked) {
        let tempType = type.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
        if (currentAreaSubMenuType !== tempType) {
            let parentMenuEl = document.getElementById(tempType + '-menu');
            let subMenuEl = document.getElementById(tempType);
            subMenuEl.style.display = 'block';
            currentAreaSubMenuType = tempType;
        } else {
            currentAreaSubMenuType = '';
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
    showOptions(checked);
}
// time menu settings
let timeValues = [
    {description: '1 Year', value: 13},
    {description: '3 Years', value: 37},
    {description: 'Mnth/YTD', value: 'mth'}
];

function toggle() {
    dispatch('close', {
        t: 0
    });
}

function checkAllArea(e) {
    let parent = e.dataset.type;
    let checked = e.checked;
    let parentAreaEls = document.querySelectorAll('.area-input-select');
    let areaEls = document.querySelectorAll('.area-input-select-item');
    
    dispatch('avType', {
        type: parent
    });

    showAreaOptions(parent, checked);

    parentAreaEls.forEach((pEl) => {
        if (parent !== pEl.dataset.type) {
            pEl.checked = false
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
    // closes all opened menus on mount
    closeOpenedAreaMenus();
});

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
    }

    .select-menu-block {
        display: block;
        width: 230px;
        background-color: white;
        position: absolute;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: 3px solid black;
    }
 
    .option-wrapper {
        height: 20px;
        line-height: 10px;
        text-align: left;
    }

    .option-wrapper > input {
        display: inline-block;
        text-align: left;
    }

    input {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        margin-left: 10px;
        margin-right: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
    }   

    a > label {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: black;
    } 

    a:visited {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: black;
    } 

    hr {
        margin-top: 10px;
        margin-bottom: 0;
        color: #666666;
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
    }

    @media only screen and (max-width: 768px) {
        .all-property-items {
            margin-left: 30px;
        }
        
        .poperty-item {
            margin-left: 60px;
        }

        #poperty-types-menu {
            top: 0px;
        }

        #area-types-menu {
            top: 25px;
        }

        #time-values-menu {
            top: 41px;
        }

		.select-menu-block {
            width: 400px;
            position: absolute;
            margin-top: 5px;
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

        .area-option-menu {
            margin-left: 30px;
        }

        .all-area-option-menu {
            margin-left: 30px;
        }

    }
    
</style>

{#if itemType === 'property-types'}
    <div class='select-menu-block' id='property-types-menu'>
        {#if items.length > 0}
        <h3>{menuTitle}</h3>
        <div class='option-wrapper all-property-items' id='{'all-group-menu'}'>
            <input class='all-property-input-select' type='checkbox' name='all' value='all' bind:checked={allPropertyChecked}>
            <a href='.' on:click|preventDefault>
                <label>ALL</label>
            </a>
        </div>
            {#each items as item}
                <div class='option-wrapper poperty-item' id='{item.group + '-menu'}'>
                        <input class='property-input-select {item.group}' type='checkbox' data-type='{item.group}' name='{item.group}' value='{item.group}' on:click={() => {groupCheckedItems(item.group)}}>
                        <a href='.' on:click|preventDefault on:click={() => showOptions(item.group)}>
                        <label>{item.value}</label>
                        {#if currentGroupId !== item.group}
                            <i class="property-type-menu-item"><Icon class="item-menu" tempId="{item + '-item'}" icon={icon[0]} /></i>
                        {:else}
                            <i class="property-type-menu-item"><Icon class="item-menu" tempId="{item + '-item'}" icon={icon[1]} /></i>
                        {/if}
                        </a>
                </div>
                <SubSelect type={item.group} data={item.children} parentId={'property-types'} params={param}/>
            {/each}
        {/if}
        <hr />
        <div class="pull-right done-btn">
            <button on:click|preventDefault class="sub-menu-btn" on:click="{toggle}">done</button>
        </div>
    </div>
{/if}

{#if itemType === 'area-types'}
    <div class="select-menu-block" id='area-types-menu'>
        {#if items.length > 0}
            <h3>{menuTitle}</h3>
            <div class='option-wrapper all-area-option-menu' id='{'all-group-menu'}'>
                {#if initialAreaType.toLowerCase() === 'all'}
                    <input class='all-area-input-select' type='radio' name='area-type' value='all' checked='checked'>
                {:else}
                    <input class='all-area-input-select' type='radio' name='area-type' value='all' >
                {/if}
                <a href='.' on:click|preventDefault>
                    <label>ALL</label>
                </a>
            </div>
            {#each items as item}
                <div class='option-wrapper area-option-menu' id='{item.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() + '-menu'}'>
                    {#if item === typeSelected && initialAreaType.toLowerCase() !== 'all'}
                        <input 
                            class='input-select area-input-select'
                            type='radio'
                            data-type="{item}"
                            name='area-type'
                            value='{item}'
                            checked='checked'
                            on:change="{(e) => checkAllArea(e.target)}" />
                    {:else}
                        <input 
                            class='input-select area-input-select' 
                            type='radio' 
                            data-type="{item}" 
                            name='area-type' 
                            value='{item}' 
                            on:change="{(e) => checkAllArea(e.target)}" />
                    {/if}
                    <a href='.' on:click|preventDefault on:click={() => showAreaOptions(item)}>
                        <label>{item}</label>
                        {#if currentAreaSubMenuType !== item.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() }
                            <i class="area-type-menu-item"><Icon class="item-menu" tempId="{item + '-item'}" icon={icon[0]} /></i>
                        {:else}
                            <i class="area-type-menu-item"><Icon class="item-menu" tempId="{item + '-item'}" icon={icon[1]} /></i>
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
            <button on:click|preventDefault class="sub-menu-btn" on:click="{toggle}">done</button>
        </div>
    </div>        
{/if}

{#if itemType === 'time-values'}
    <div class="select-menu-block" id='time-values-menu'>
        <h3>{menuTitle}</h3>
        {#each timeValues as tv}
            <div class='option-wrapper'>
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
                <button on:click|preventDefault class="sub-menu-btn" on:click="{toggle}">done</button>
        </div>
    </div>
{/if}