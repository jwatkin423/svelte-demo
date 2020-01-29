<script>
import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
import LoadingSpinner from './LoadingSpinner.svelte';
import { getAllUrlParams } from '../helpers/parse-search-query';
import downloadjs from 'downloadjs';

export let options;
export let btnColor;

onMount(() => {
    setBtnColor();
});

function setBtnColor() {
    let btn = document.getElementById('submit-button');
    btn.style.backgroundColor = btnColor;
    btn.style.color = 'white';
}

let dispatch = createEventDispatcher();
let isLoading = false;
let error;
let errorStatus;

function toggleAll () {
    let dlEls = document.querySelectorAll('.dl-item');
    let allChecked = document.getElementById('all-dl').checked;
    dlEls.forEach((el) => {
            el.checked = allChecked;
    });
    validateForm();
}

function submitForm() {
    let form = document.getElementById('pdf-download');
    closeMenu();
    form.submit();
}

function closeMenu() {
    dispatch('closeDlMenu', {
        text: 'close'
    });
}

let fetchingPdf = false;

let queryParams = window.location.search;
let rawLocation = window.location.pathname;
let baseUrl = window.location.origin;
let urlParams = getAllUrlParams(window.location.href);

let location = rawLocation.replace('public', 'pdf') + '/';

let url = baseUrl + location + urlParams.set + '=' + '/' + queryParams;
let disabled = true;

function validateForm() {
    let els = document.querySelectorAll('.dl-item');
    let count = 0;

    els.forEach((el) => {
        if (el.checked) {
            count++;
        }

        if (count >= 1) {
            disabled = false;
        } else {
            disabled = true;
        }
    });
}

</script>

<style>

    .menu-wrapper {
        width: 375px;
        display: inline-block;
        background-color: white;
        z-index: 9;
        position: absolute;
        top: 30px;
        right: 10px;
        border-bottom: 3px solid black;
        border-right: 1px solid black;
        border-left: 1px solid black;
    }

    .option-wrapper > input {
        display: inline-block;
    }

    .pull-left {
        float: left;
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

    label {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: black;
    } 

   .pull-right {
        float: right;
    }

    .done-btn {
        margin-top: 0;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        margin-right: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    h3 {
        padding-left: 10px;
        font-size: 12px;
    }

    .option-wrapper:nth-child(even) {
        position: relative;
        float: left;
        text-align: left;
        width: 50%;
    }

    .option-wrapper:nth-child(odd) {
        position: relative;
        float: right;
        text-align: left;
        width: 50%;
    }

    .all-option {
        width: 100% !important;
    }

    .sub-menu-btn {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        padding: 0;
        width: 60px;
        border-radius: 5px;
    }

    #submit-button {
        margin-left: 10px;
    }

    @media only screen and (max-width: 480px) {
        .menu-wrapper {
            top: 55px;
        }
    }

</style>

<div class="menu-wrapper">
{#if !isLoading}
    {#if options}
        <h3>DOWNLOAD</h3>
                <div class="option-wrapper pull-left all-option">
                    <input class="input-select" id='all-dl' type="checkbox" data-type="all" name="all" value="all" on:change={toggleAll}>
                    <label>ALL</label>
                </div>
            <form id="pdf-download" action='{url}' method="POST">
                {#each options as option}
                    <div class="option-wrapper">
                    <input
                        class="input-select dl-item"
                        type="checkbox"
                        name="matReports[]"
                        value="{option.value}"
                        on:change={validateForm}>
                    <label>{option.label}</label>
                    </div>
                {/each}    
            <div class="pull-right done-btn">
                <button on:click|preventDefault on:click={closeMenu} class="sub-menu-btn" >cancel</button>
                <button on:click|preventDefault on:click={submitForm} id='submit-button' class="sub-menu-btn" disabled={disabled} type="submit">done</button>
            </div>
            </form>
    {/if}

{:else}
    <LoadingSpinner />
{/if}
</div>