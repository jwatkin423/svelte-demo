<script>
import { onMount } from 'svelte';
import Sorted from './Sorted.svelte';
import  AutoComplete from 'simple-svelte-autocomplete';
// import  AutoCompleteTwo from 'svelte-autocomplete/dist/index';

export let areaValueData = {};
export let type;
export let typeSelected;
export let params;
export let initialAreaType;

$: areaValueTypeSelected = typeSelected;

let tempKey = 0;
let idClass = '';
$: idClass = type.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
$: areaValueParams = params;

let dataKeys = [];
$: dataKeys = Object.keys(areaValueData);
let data = [];
$: data = Object.keys(areaValueData).map((i) => areaValueData[dataKeys[i]]);

let anchorKeys = [];

let searchAreaValues = [];

let temp;
temp = Object.keys(areaValueData).forEach((key) => {
    let avd = areaValueData[key];
    let aV = avd.map((a, i) => {
        if (typeof(a.areaValue) !== undefined)  {
            searchAreaValues.push(a.areaValue);
        }
        
    });
    return aV;
});


$: anchorKeys = dataKeys.map((key, i) => {
    if (key.toLowerCase() === 'a' || key === 'b' || key === 'c' && (tempKey !== 1)){
        tempKey = i;
        return {group: 1, index: i, groupId: 'ac'};
    }

    if (key.toLowerCase() === 'd' || key === 'e' || key === 'f' && (tempKey !== 2)){
        tempKey = 2;
        return {group: 2, index: i, groupId: 'df'}
    }

    if (key.toLowerCase() === 'g' || key === 'h' || key === 'i' && (tempKey !== 3)){
        tempKey = 3;
        return {group: 3, index: i, groupId: 'gi'}
    }

    if (key.toLowerCase() === 'j' || key === 'k' || key === 'l' && (tempKey !== 4)){
        tempKey = 4;
        return {group: 4, index: i, groupId: 'jl'}
    }

    if (key.toLowerCase() === 'm' || key === 'n' || key === 'o' && (tempKey !== 5)){
        tempKey = 5;
        return {group: 5, index: i, groupId: 'mo'}
    }

    if (key.toLowerCase() === 'p' || key === 'q' || key === 'r' && (tempKey !== 6)){
        tempKey = 6;
        return {group: 6, index: i, groupId: 'pr'}
    }

    if (key.toLowerCase() === 's' || key === 't' || key === 'u' && (tempKey !== 7)){
        tempKey = 7;
        return {group: 7, index: i, groupId: 'su'}
    }

    if (key.toLowerCase() === 'v' || key === 'w' || key === 'x' || key === 'y' || key === 'z' && (tempKey !== 8)){
        tempKey = 8;
        return {group: 8, index: i, groupId: 'vz'}
    }

    if (key === '0' || key === '1' && (tempKey !== 9)) {
        tempKey = 9;
        return {group: 9, index: i, groupId: '01'}
    }

    if (key === '2' || key === '3' && (tempKey !== 10)) {
        tempKey = 10;
        return {group: 10, index: i, groupId: '23'}
    }

    if (key === '4' || key === '5' && (tempKey !== 11)) {
        tempKey = 11;
        return {group: 11, index: i, groupId: '45'}
    }

    if (key === '6' || key === '7' && (tempKey !== 12)) {
        tempKey = 12;
        return {group: 12, index: i, groupId: '67'}
    }

    if (key === '8' || key === '9' && (tempKey !== 13)) {
        tempKey = 13;
        return {group: 13, index: i, groupId: '89'}
    }

    return {group: -1, index: -1, groupId: '-1'};
});

let aVsSelected;
let aVEls;
let areaTypeSelected;
$: areaTypeSelected = typeSelected;

let uncheckedCount = 0;
function areaValueSelected() {
    
    if (params) {
        aVsSelected = areaValueParams.split(',').map((i) => {
            return decodeURI(i);
        });
        
        aVEls = document.querySelectorAll('.area-input-select-item');
        aVEls.forEach(element => {
            let value = element.value;
            let currentType = element.dataset.parent;
            if (aVsSelected.find(d => d == value)) {
                if(currentType === areaTypeSelected) {
                    element.checked = true;
                } else {
                    uncheckedCount++;
                }
                
            }
            
        });
    }

    if(uncheckedCount == 0) {
        let allAVcb = document.querySelector('.all-' + idClass);
        allAVcb.checked = true;
    }
    uncheckedCount == 0;
}

function setAnchorAll() {
    let allEls = document.querySelectorAll('.' + 'item-group');

    dataKeys.forEach((key) => {
        let groupEls = document.querySelectorAll('.' + idClass + '.set-' + key);
        let count = 0;

        groupEls.forEach((el) => {
            if (el.checked == false) {
                count++;
            }
        });

        if (count == 0) {
            let groupAllEl = document.querySelector('.all-' + key + '-' + idClass);
            groupAllEl.checked = true;
        }
    });
} 

let groupCountUnchecked = 0;
function selectAllArea() {
    let allAreaSelEl = document.querySelector('.all-' + idClass);
    let allGroupSelEls = document.querySelectorAll('.all-group-' + idClass);

    allGroupSelEls.forEach((el) => {
        if (el.checked == false) {
            groupCountUnchecked++;
        }
    });

    if (groupCountUnchecked == 0) {
        allAreaSelEl.checked = true;
    }
}

onMount(() => {
    areaValueSelected();
    setAnchorAll();
    selectAllArea();

});

let tempId = -1;
function setAnchorId(i) {
    let id = '';
    if (anchorKeys.length > 0 && tempId != i) {
        anchorKeys.forEach((aKey) => {
            if (aKey.index == i) {
                id = idClass + '-' + aKey.groupId;
            }
            
        });
    tempId = i;
    return id;
    }
}

let currentAV = '';
function currentAVType(thisEl) {
    let parentType = thisEl.dataset.parent
    let els = document.querySelectorAll('.area-input-select-item');
    els.forEach((el) => {
        if (el.dataset.parent !== parentType && initialAreaType.toLowerCase() !== 'all') {
            el.checked = false;
        }
    });
}
let selectedAreaValue = '';

$: showSearched(selectedAreaValue);

function showSearched(e) {

    let sav = selectedAreaValue;
    let allEls = document.querySelectorAll('.div-area-input-select-item.div-' + idClass);
    let selAll = document.querySelector('.div-all-' + idClass);
    let hrSelAll = document.querySelector('.hr-all-' + idClass);
    let selAllGroup = document.querySelectorAll('.div-all-group-' + idClass);
    let hrSelAllGroup = document.querySelectorAll('.hr-all-group-' + idClass);

    allEls.forEach((el) => {
        el.style.display = 'inline-block';
    });

    if (sav !== '') {
        selAll.style.display = 'none';
        selAllGroup.forEach((el) => {
            el.style.display = 'none';
        });
        
        hrSelAllGroup.forEach((el) => {
            el.style.display = 'none';
        });

        sav = (sav).toLowerCase().replace(/ /g, '-').replace(/,/g, '-');
        let id = 'div-' + idClass + '-' + sav;

        allEls.forEach((el) => {
            if (el.id !== id) {
                el.style.display = 'none';
            } else {
                el.style.textAlign = 'left';
            }
        });
    } else {
        if (sav == '') {
            allEls.forEach((el) => {
                
            if (el.style.display === 'none') {
                el.style.removeProperty('display');
                el.style.removeProperty('text-align');
                el.styl.display = 'inline-block';
            }
        });
        }
    }

}

function clearSearched() {
    let searchEl = document.querySelector('.input.autocomplete-input');

    if (searchEl) {
        let searchVal = searchEl.value;

        let allEls = document.querySelectorAll('.div-area-input-select-item.div-' + idClass);

        allEls.forEach((el) => {
            if (el.style.display === 'none') {
                el.style.display = 'inline-block';
            }
        });

        let selAll = document.querySelector('.div-all-' + idClass);
        let hrSelAll = document.querySelector('.hr-all-' + idClass);
        let selAllGroup = document.querySelectorAll('.div-all-group-' + idClass);
        let hrSelAllGroup = document.querySelectorAll('.hr-all-group-' + idClass);

        selAll.style.display = 'block';
        selAllGroup.forEach((el) => {
            el.style.display = 'block';
        });
        
        hrSelAllGroup.forEach((el) => {
            el.style.display = 'block';
        });

        selectedAreaValue = '';
    }
    
}

</script>

<style>
    .sub-menu-area {
        display: none;
        background-color: white;
        position: absolute;
        width: 230px;
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        border-top: 1px solid #CCCCCC;
        border-left: 1px solid #CCCCCC;
        border-right: 1px solid #CCCCCC;
        border-bottom: 3px solid #333;
    }


    div.option-wrapper {
        height: 20px;
        line-height: 10px;
    }

    div.option-wrapper > input {
        display: inline-block;
    }

    label {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: #666666;
    } 

    input {
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        margin-left: 20px;
        margin-right: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
    }  

    .done-btn {
        margin-top: 0;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        margin-right: 10px;
        margin-bottom: 5px;
    }

    .pull-right {
        float: right;
    }

    .area-value-count {
        padding-right: 10px;
        display: block;
        font-size: 10px;
    }

    .search-area-wrapper {
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
    }

    @media only screen and (min-width: 1025px) {
        .ng {
            margin-left: 40px;
        }
    }

    @media only screen and (max-width: 1024px) {
        
        .all-area-select {
            margin-left: 30px !important;
         }

        input {
            margin-left: 60px
        }

        .sub-menu-area {
            width: 460px;
        }

        div.option-wrapper {
            height: 30px;
            line-height: 30px;
            text-align: left;
        }

        input {
            line-height: 30px;
        }
        
        label {
            height: 30px;
            line-height: 30px;
            margin-bottom: 0 !important;
        }

    }

    .clear-search {
        float: right;
        height: 20px;
        line-height: 20px;
        padding: 0;
        width: 20px;
    }

    .search-area-title {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #666666;
        margin-left: 10px;
        margin-top: 0;
        margin-bottom: 0;
    }

    @media only screen and (max-width: 1024px) {
        .hr-search-title {
            margin-top: 0px;
        }
    }

    @media only screen and (max-width: 768px) {
		.sub-menu-area {
            display: inline-block;
            text-align: left;
            margin-right: 10px;
        }

	}

    @media only screen and (max-width: 480px) {
        .sub-menu-area {
            margin-left: 0 !important;
        }
    }

</style>

{#if data.length > 0}
    <div class="sub-menu-area" id="{idClass}">
        {#if window.innerWidth <= 1024}
            <h3 class="search-area-title">Specific Area Type</h3>
        {/if}    
    <hr class="hr-search-title" />
        <div class="search-area-wrapper">
            <!-- <input type='text' placeholder="Search" id="search-area-{idClass}" class="search-area" /> -->
            <AutoComplete 
                items={searchAreaValues} 
                bind:selectedItem={selectedAreaValue} 
                noResultsText="No results found" 
                placeholder="Search"
                className={"search-area-" + idClass + " search-area-div"}
                onChange={showSearched()}
                maxItemsToShowInList={7}
                minCharactersToSearch={3}
                />
                <button class="clear-search" on:click|preventDefault on:click={clearSearched}>X</button>
        </div>
        <!-- <Sorted sortKeys={dataKeys} type={idClass}/> -->
        <hr class="hr-all-{idClass}" />
        <div class="sub-menu-item">
            <div class='option-wrapper div-all-{idClass}'>
                <input 
                    class='area-input-select-item input-select-item all-{idClass} all-area-select' 
                    type='checkbox' 
                    name='all-{idClass}'
                    value='all' 
                    on:click="{() => {
                        let elsClassName = '.set-' + idClass;
                        let els = document.querySelectorAll(elsClassName);
                        let allEl = document.querySelector('.all-' + idClass);
                        let allElChecked = allEl.checked;
                        
                        els.forEach((el) => {
                            if(allElChecked) {
                                el.checked = true;
                            } else {
                                el.checked = false;
                            }
                        });

                        let allGroupEls = document.querySelectorAll('.all-group-' + idClass);
                        allGroupEls.forEach((el) => {
                            if(allElChecked) {
                                el.checked = true;
                            } else {
                                el.checked = false;
                            }
                        });

                    }}">
                    <label class="all-{type}">All</label>
            </div>
        </div>
        
    {#each dataKeys as item, i}
        <div class="sub-menu-item">
            <div class='option-wrapper div-all-group-{idClass}'>
                <input 
                    class='area-input-select-item input-select-item all-{item}-{idClass} all-area-select item-group all-group-{idClass}'
                    type='checkbox'
                    name='all-{item}'
                    value='all'
                    on:click="{() => {
                        let elsClassName = '.' + idClass + '.set-' + item;
                        let els = document.querySelectorAll(elsClassName);
                        let allEl = document.querySelector('.all-' + item + '-' + idClass);
                        let allElChecked = allEl.checked;
                        
                        els.forEach((el) => {
                            if(allElChecked) {
                                el.checked = true;
                            } else {
                                el.checked = false;
                            }
                        });

                    }}">
                    <label class="all-{type}">{item}</label>
            </div>
        </div>
        {#each areaValueData[item] as menuItem}
            <div class="sub-menu-area-group" id="{setAnchorId(i)}">
                    <div class="sub-menu-item" >
                        <div class='option-wrapper area-wrapper div-area-input-select-item div-{idClass}' id="div-{idClass}-{(menuItem.areaValue).toLowerCase().replace(/ /g, '-').replace(/,/g, '-')}">
                            <input
                                id="{idClass}-{(menuItem.areaValue).toLowerCase().replace(/ /g, '-').replace(/,/g, '-')}"
                                class='area-input-select-item input-select-item {idClass} set-{item} set-{idClass} ng'
                                data-parent='{type}'
                                data-item={item}
                                type='checkbox' 
                                name='areaValue' 
                                value='{menuItem.areaValue}'
                                on:change={(e) => { currentAVType(e.target) }}>
                            <label class="{type}">{menuItem.areaValue} ({menuItem.areaCount})</label>
                            
                        </div>
                    </div>
                </div>
        {/each}
        <hr class="hr-all-group-{idClass}" />
    {/each}
    </div>
{/if}