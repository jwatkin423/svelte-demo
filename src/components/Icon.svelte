<script>
import { onMount } from 'svelte';

export let icon;
export let tempId = 'default';
export let customColor = '';

let path = [];
let classes = "";
let viewBox = "";

$: viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];

$: classes = "fa-svelte " + ($$props.class ? $$props.class : "");

$: path = icon.icon[4];


$: svgId = tempId;

onMount(() => {
  setCustomColor(customColor, svgId);
});

function setCustomColor(customColor, svgId) {
  let el = document.getElementById(svgId);
  el.style.color = customColor;
}

</script>

<svg
  aria-hidden="true"
  class="{classes}"
  id="{svgId}"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="{viewBox}"
>
  <path fill="currentColor" d="{path}" />
</svg>


<style>
  .fa-svelte {
    width: 1em;
    height: 1em;
    overflow: visible;
    display: inline-block;
    color: #ffffff;
    margin-left: 10px;
    font-size: 20px;
    vertical-align: middle;
    margin-bottom: 4px;
  }
  .item-menu {
    color: black !important;
    font-size: 15px;
    height: 15px;
    line-height: 10px;
    margin-bottom: 0px !important;
  }

  .chng-up {
    color: green !important;
    font-size: 20px;
    height: 24px;
    line-height: 24px;
    margin-left: 0 !important;
    margin-bottom: 0px !important;
    width: 16px !important;
  }

  .chng-dn {
    color: red !important;
    font-size: 20px;
    height: 24px;
    line-height: 24px;
    margin-left: 0 !important;
    margin-bottom: 0px !important;
    width: 16px !important;
  }

  .chng-up {
    color: green !important;
    font-size: 20px;
    height: 24px;
    line-height: 24px;
    margin-left: 0 !important;
    margin-bottom: 0px !important;
    width: 16px !important;
  }

  .chng-up-ytd {
    color: green !important;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    margin-left: 0 !important;
    margin-bottom: 0px !important;
    width: 8px !important;
  }

  .chng-dn-ytd {
    color: red !important;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    margin-left: 0 !important;
    margin-bottom: 0px !important;
    width: 8px !important;
  }

  .year {
    font-size: 10px;
    margin-right: 2px;
  }

</style>
