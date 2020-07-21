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

// let anchorKeys = [];

let searchAreaValues = [];

let temp;
temp = Object.keys(areaValueData).forEach((key) => {
    let avd = areaValueData[key];
    let aV = avd.map((a, i) => {
        if (typeof(a.v) !== undefined)  {
            searchAreaValues.push(a.v);
        }
        
    });
    return aV;
});

let aVsSelected;
let aVEls;
let areaTypeSelected;
$: areaTypeSelected = typeSelected;

let uncheckedCount = 0;
function areaValueSelected() {

    if (params) {
        if (params !== 'ALL') {
            
            aVsSelected = areaValueParams.split(',').map((i) => {
                return decodeURI(i);
            });
            
            if (aVsSelected.length === 1 && type === initialAreaType) {
                aVsSelected = aVsSelected[0];
                let id = idClass + "-" + aVsSelected.toLowerCase().replace(/ /g, '_').replace(/,/g, '_');
                let tempInput = document.getElementById(id);
                if (tempInput) {
                    tempInput.checked = true;
                }
            }

        } else {
            aVsSelected = params
        }

        if (type === initialAreaType && typeof(aVsSelected) !== 'object') {

            if (aVsSelected.toLowerCase === 'all') {
                let areaItemEls = document.querySelectorAll('.' + idClass);
                    areaItemEls.forEach((el) => {
                    el.checked = true;
                });

                document.querySelector('.all-' + idClass).checked = true;
            }

        } else {
            let avItems = document.querySelectorAll('.ng.' + idClass);

            if (aVsSelected.length == avItems.length) {
                document.querySelector('input.all-' + idClass).checked = true;
            }

            if (typeof(aVsSelected) === 'object') {
                aVsSelected.forEach((avS) => {
                    let tempSel = avS.toLowerCase().replace(/ /g, '_').replace(/,/g, '_');

                    let id = idClass + '-' + tempSel;
                    let tempInput = document.getElementById(id);

                    if (tempInput) {
                        tempInput = document.getElementById(id).checked = true;
                    }
                });
            } else {
                
                let tempSel = aVsSelected.toLowerCase().replace(/ /g, '_').replace(/,/g, '_');

                let id = idClass + '-' + tempSel;
                let tempInput = document.getElementById(id);

                if (tempInput) {
                    tempInput = document.getElementById(id).checked = true;
                }
            }
            
        }
            
        if (type === 'ALL' && initialAreaType == 'ALL') {
            let areaItemEls = document.querySelectorAll('.' + idClass);
            areaItemEls.forEach((el) => {
                el.checked = true;
            });
        }
    }
    
}

let groupCountUnchecked = 0;

let tempId = -1;

let currentAV = '';
function currentAVType(thisEl) {
    let parentType = thisEl.dataset.parent;
    let els = document.querySelectorAll('.area-input-select-item');
    els.forEach((el) => {
        if (el.dataset.parent !== parentType && initialAreaType.toLowerCase() !== 'all') {
            el.checked = false;
        }
    });

    let parentCatEls = document.querySelectorAll('.area-input-select');
    parentCatEls.forEach((catEl) => {
        if (catEl.dataset.type === parentType) {
            catEl.checked = true;
        } else {
            catEl.checked = false;
        }
    });
}
let selectedAreaValue = '';

function showSearched() {

    let sav = selectedAreaValue;
    
    let parentEl = document.getElementById('div-submenu-' + idClass);

    if (sav !== '') {
        sav = (sav).toLowerCase().replace(/ /g, '_').replace(/,/g, '_');
        let id = 'div-' + idClass + '-' + sav;
        let targetEl = document.getElementById(id);
        let topPos = targetEl.offsetTop;
        let targetItem = document.getElementById(idClass + '-' + sav);
        parentEl.scrollTop = topPos;
        
        let allItemEl = document.querySelector('.all-' + idClass + '.all-area-select');
        if (allItemEl.checked) {
            let nonTargetItems = document.querySelectorAll('.area-input-select-item');
                nonTargetItems.forEach((ntiEl) => {
                ntiEl.checked = false;
            });
            allItemEl.checked = false;
        }
        

        targetItem.checked = true;

        let parentType = targetItem.dataset.parent;

        let parentCatEls = document.querySelectorAll('.area-input-select');
        parentCatEls.forEach((catEl) => {
            if (catEl.dataset.type === parentType) {
                catEl.checked = true;
            } else {
                catEl.checked = false;
            }
        });
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

function checkedAll() {
    
    let areaClass = ".area-input-select-item";
    if (typeSelected.toLowerCase() === 'all' && initialAreaType.toLowerCase() === 'all') {
            let areaEls = document.querySelectorAll(areaClass);
            areaEls.forEach((el) => {
                el.checked = true;
            });
    } else if (typeSelected.toLowerCase() !== 'all' && params.toLowerCase() === 'all' && typeSelected === type) {
            let areaInputsSelectEls = document.querySelectorAll('.' + idClass);

            areaInputsSelectEls.forEach((el) => {
                el.checked = true;
            });
    }
}

onMount(() => {

    areaValueSelected();

});

</script>

<style>

    .bold-label {
        font-weight: bold;
    }

    .sub-menu-area {
        display: none;
        background-color: white;
        position: absolute;
        width: 460px;
        max-height: 300px;
        overflow-y: hidden;
        overflow-x: hidden;
        border-top: 1px solid #CCCCCC;
        border-left: 1px solid #CCCCCC;
        border-right: 1px solid #CCCCCC;
        border-bottom: 5px solid #666666;
    }


    div.option-wrapper {
        height: 20px;
        line-height: 10px;
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
        margin: unset !important;
        margin-left: 0;
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

    .submenu-header {
        position: relative;
        width: 100%;
        z-index: 8;
        background-color: white;
        height: 48px;
    }

    .search-area-wrapper {
        position: relative;
        z-index: 9;
        background-color: #FFFFFF;
        text-align: center;
        width: 400px;
        padding-left: 30px;
        padding-right: 0;
        margin-top: 5px;
        overflow-x: hidden;
    }

    .div-submenu {
        position: relative;
        z-index: 0;
        margin-top: 10px;
        height: 200px;
        overflow-y: scroll;
    }

    .hr-search-title {
        position: relative;
    }

    .clear-search {
        float: right;
        height: 20px;
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

    @media only screen and (min-width: 1025px) {
        label {
            margin-bottom: 0 !important;
        }
    }


    @media only screen and (max-width: 1024px) {

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
    <div class="submenu-header">
        <h3 class="search-area-title">Specific Area Type</h3>
        <hr class="hr-search-title" />
    </div>
    <div class="search-area-wrapper">
        <AutoComplete 
            items={searchAreaValues}         
            bind:selectedItem={selectedAreaValue} 
            noResultsText="No results found" 
            placeholder="Search"
            className={"search-area-" + idClass + " search-area-div"}
            onChange={showSearched}
            maxItemsToShowInList={7}
            minCharactersToSearch={1}
            />
            <button class="clear-search" on:click|preventDefault on:click={clearSearched}>X</button>
    </div>
    <div class="div-submenu" id="div-submenu-{idClass}">
        <div class="sub-menu-item">
            <div class='option-wrapper div-all-{idClass} ml-30'>
                <input 
                    class='area-input-select-item input-select-item all-{idClass} all-area-select all-subparent-select'
                    data-group={idClass}
                    type='checkbox' 
                    name='all-{idClass}'
                    value='all'
                    on:click="{(e) => {
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
                        let parentEl = document.getElementById('parent-' + idClass);
                        parentEl.checked = allEl.checked;

                    }}">
                    <label class="all-{type} bold-label">All</label>
            </div><!-- option wrapper -->
        </div><!-- sub menu item -->
        
    {#each dataKeys as item, i}
        <div class="sub-menu-item">
            <div class='option-wrapper div-all-group-{idClass} ml-60'>
                    <label class="all-{type} bold-label">{item}</label>
            </div>
        </div>
        {#each areaValueData[item] as menuItem}
            <!-- <div class="sub-menu-area-group" id="{setAnchorId(i)}"> -->
            <div class="sub-menu-area-group">
                <div class="sub-menu-item" >
                    <div 
                        class='option-wrapper area-wrapper div-area-input-select-item div-{idClass} ml-60' 
                        id="div-{idClass}-{(menuItem.v).toLowerCase().replace(/ /g, '_').replace(/,/g, '_')}">
                        <input
                            id="{idClass}-{(menuItem.v).toLowerCase().replace(/ /g, '_').replace(/,/g, '_')}"
                            class='area-input-select-item input-select-item {idClass} set-{item} set-{idClass} ng'
                            data-parent='{type}'
                            data-item={item}
                            type='checkbox' 
                            name='areaValue' 
                            value='{menuItem.v}'
                            on:change={(e) => { currentAVType(e.target) }}>
                        <label class="{type}">{menuItem.v} ({menuItem.c})</label>
                        
                    </div> <!-- option wrapper-->
                </div><!-- sub-menu-item-->
            </div><!-- sub menu area group-->
        {/each}
        <hr class="hr-all-group-{idClass}" />
    {/each}
    </div><!-- div-submenu -->
</div> <!-- sub menu area -->
{/if}