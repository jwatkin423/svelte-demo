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
        border-bottom: 5px solid #666666;
        -webkit-box-shadow: 2px 0px 0px 0px #ccc; 
        box-shadow: 2px 0px 0px 0px #ccc;
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
        margin-left: 15px;
        margin-right: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
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
        font-size: 10px;
        padding: 0;
        width: 60px;
        border-radius: 5px;
    }

    .all-label {
        font-weight: bold;
    }

    #submit-button {
        margin-left: 10px;
    }

    h3 {
        padding-top: 12px;
        font-size: 13px;
        font-weight: bolder;
        line-height: 25px;
        margin-bottom: 15px;
        margin-top: 0;
        background-color: #FFFFFF;
        color: #666666;
    }

    .title-wrapper {
        width: 100%;
        display: block;
    }

    .title-div {
        width: 50%;
        float: left;
        height: 40px;
    }

    .cls-btn-div {
        width: 50%;
        float: right;
        height: 40px;
    }

    .close-btn {
        padding-top: 12px;
        font-size: 13px;
        color: #666666;
        line-height: 25px;
        margin-right: 15px;
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
        <div class="title-wrapper">
            <div class="title-div">
                <h3 class="pull-right">DOWNLOAD</h3>
            </div>
            <div class="cls-btn-div">
                <label on:click|preventDefault on:click={closeMenu} class="pull-right close-btn">X</label>
            </div>
        </div>
                <div class="option-wrapper pull-left all-option">
                    <input class="input-select" id='all-dl' type="checkbox" data-type="all" name="all" value="all" on:change={toggleAll}>
                    <label class='all-label'>MARKET AREA TRENDS</label>
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
                <button on:click|preventDefault on:click={closeMenu} class="sub-menu-btn" >Cancel</button>
                <button on:click|preventDefault on:click={submitForm} id='submit-button' class="sub-menu-btn" disabled={disabled} type="submit">Download</button>
            </div>
            </form>
    {/if}

{:else}
    <LoadingSpinner />
{/if}
</div>