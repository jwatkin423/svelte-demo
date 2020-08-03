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
        width: 430px;
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

    .option-label {
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
        float: right;
        text-align: left;
        width: 50%;
    }

    .option-wrapper:nth-child(odd) {
        position: relative;
        float: left;
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
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
        color: #666666;
        font-weight: bold;
    }

    #submit-button {
        margin-left: 10px;
    }

    .title-wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 25% 50% 25%;
        grid-template-areas: "div-title-buffer title-div cls-btn-div";
        margin-top: 22px;
        margin-bottom: 22px;
    }

    .title-div {
        height: 14px;

    }

    .cls-btn-div {
        height: 14px;
    }

    .h3-el {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: bolder;
        line-height: 14px;
        height: 14px;
        background-color: #FFFFFF;
        color: #666666;
        text-align: center;
        padding: 0;
    }

    .close-btn {
        font-size: 12px;
        color: #666666;
        line-height: 14px;
        height: 14px;
        margin-right: 15px;
        margin-left: auto;
    }

    .mat-title {
        width: 100%;
        margin-bottom: 22px;
    }

    .form-content {
        margin-bottom: 10px;
        height: 100%;
        display: inline-block;
    }

    @media only screen and (max-width: 1024px) and (min-width: 481px) {
        

        form {
            text-align: center;
            width: 400px;
            margin-left: auto;
            margin-right: auto;
        }

        .all-wrapper {
            text-align: center;
            width: 400px;
            margin-left: auto;
            margin-right: auto;
        }

        .title-div { 
            text-align: center;
        }

        .menu-wrapper {
            width: 100%;
            right: 0 !important;
        }    

        .form-content {
            width: 400px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
        }

        .all-option {
            width: 100% !important;
            margin-left: auto;
            margin-right: auto;
        }
    }

    @media only screen and (max-width: 480px) {
        .menu-wrapper {
            top: 55px;
            right: 0;
            width: 100%;
            text-align: center;
        }
    }


</style>

<div class="menu-wrapper">
{#if !isLoading}
    {#if options}
        <div class="title-wrapper">
            <div class="div-title-buffer"></div>
            <div class="title-div">
                <h3 class="h3-el">DOWNLOAD</h3>
            </div>
            <div class="cls-btn-div">
                <label on:click|preventDefault on:click={closeMenu} class="pull-right close-btn">X</label>
            </div>
        </div>
        <div class="mat-title">
            <h3 class="h3-el">Market Area Trends</h3>
        </div>
                <div class="all-wrapper">
                    <div class="option-wrapper pull-left all-option">
                        <input class="input-select" id='all-dl' type="checkbox" data-type="all" name="all" value="all" on:change={toggleAll}>
                        <label class='all-label'>ALL</label>
                    </div>
                </div>
            <form id="pdf-download" action='{url}' method="POST">
                <div class="form-content">
                    {#each options as option}
                        <div class="option-wrapper">
                        <input
                            class="input-select dl-item"
                            type="checkbox"
                            name="matReports[]"
                            value="{option.value}"
                            on:change={validateForm}>
                        <label class="option-label">{option.label}</label>
                        </div>
                    {/each}    
                </div>
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