<script>
import { onMount } from 'svelte';
import Sorted from './Sorted.svelte';

export let areaValueData = {};
export let type;
export let typeSelected;
export let params;
export let initialAreaType;

$: areaValueTypeSelected = typeSelected;

let tempKey = 0;
$: idClass = type.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
$: areaValueParams = params;

let data = [];
$: data = Object.keys(areaValueData).map((i) => areaValueData[dataKeys[i]]);
let dataKeys = [];
$: dataKeys = Object.keys(areaValueData);
let anchorKeys = [];

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
                    element.checked =  true;
                }
                
            }
            
        });
    }
}

onMount(() => {
    areaValueSelected();
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

</script>

<style>
    .sub-menu-area {
        display: none;
        background-color: white;
        position: relative;
        width: 220px;
        max-height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-color: #CCCCCC #C6C6C6;
        scrollbar-width: thin;       
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
        font-size: 10px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
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

    @media only screen and (max-width: 768px) {
		.sub-menu-area {
            display: inline-block;
            text-align: left;
            margin-left: 60px;
            width: -webkit-fill-available;
            margin-right: 10px;
        }

	}

</style>

{#if data.length > 0}
    <div class="sub-menu-area" id="{idClass}">
        <div class="sub-menu-item">
            <div class='option-wrapper'>
                <input class='area-input-select-item input-select-item all-{idClass}' type='checkbox' name='all-{idClass}' value='all' on:click="{() => {
                        let elsClassName = '.' + idClass;
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

                    }}">
                    <label class="all-{type}">All</label>
            </div>
        </div>
        <hr />
        <Sorted sortKeys={dataKeys} type={idClass}/>
        <hr />
    {#each dataKeys as item, i}
        {#each areaValueData[item] as menuItem}
            <div class="sub-menu-area-group" id="{setAnchorId(i)}">
                    <div class="sub-menu-item" >
                        <div class='option-wrapper area-wrapper'>
                            <input 
                                class='area-input-select-item input-select-item {idClass}'
                                data-parent='{type}'
                                type='checkbox' 
                                name='areaValue' 
                                value='{menuItem.areaValue}'
                                on:change={(e) => { currentAVType(e.target) }}>
                            <label class="{type}">{menuItem.areaValue}</label>
                            <span class='pull-right area-value-count'>({menuItem.areaCount})</span>
                        </div>
                    </div>
                </div>
        {/each}
        <hr />
    {/each}
    </div>
{/if}