<script>
import { onMount } from 'svelte';
// import AutoComplete from 'svelte-autocomplete';

export let type = '';
export let data = [];
export let parentId = '';
export let params;

let propertyParams;

$: propertyParams = params;
let checked = false;
let poprertiesSelected;

function propertySelected() {
    
    if (params) {
        poprertiesSelected = propertyParams.split(',').map((i) => {
            return i;
        });
        let propertyEls = document.querySelectorAll('.property-input-select-item');
        let parentEls = document.querySelectorAll('.property-input-select');

        propertyEls.forEach(element => {
            let type = element.dataset.parent;
            let value = element.value;

            if (poprertiesSelected.find(d => d == value)) {
                element.checked =  true;
                parentEls.forEach((parentEl) => {
                    if (parentEl.dataset.type === type) {
                        if (!parentEl.checked) {
                            parentEl.checked = true;
                        }
                    }
                });
            }
            
        });
    } else {
        checked = false;
    }
}

onMount(() => {
    propertySelected();
});

</script>

<style>

    .sub-menu-property {
        display: block;
        background-color: white;
        position: relative;
    }

    .sub-menu-property {
        display: none;
    }

    .option-wrapper {
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
        color: #666666;
    } 

    input {
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
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

    @media only screen and (max-width: 1024px) {
        .sub-menu-item {
            text-align: left;
        }
        
        .option-wrapper {
            height: 30px;
        }
    }

    @media only screen and (max-width: 1024px) {
        
    }
</style>

{#if data.length > 0}
    <div class="sub-menu-property" id="{type}" >

    {#each data as sub}
        <div class="sub-menu-item">
                <div class='option-wrapper ml-90'>
                    
                    <input 
                        class='property-input-select-item input-select-item {type}'
                        data-parent='{type}'
                        data-value="{sub.label}"
                        type='checkbox' 
                        name='{sub.value}' 
                        value='{sub.value}'>
                    <label class="{type}">{sub.label}</label>
                </div>
        </div>
    {/each}

    </div>
    
{/if}