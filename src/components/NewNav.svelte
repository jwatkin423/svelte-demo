<script>

import "materialize-css/dist/js/materialize.min";

import { onMount } from 'svelte';

export let background_color;
export let logo;

let options = {};

onMount(() => {
    var elems = document.querySelectorAll('select');
    console.log(elems);
    var instances = M.FormSelect.init(elems, options);
});

</script>

<style>

</style>

<!-- Dropdown Structure -->
<ul id="dropdown1" class="dropdown-content">
  <li><a href="#!">one</a></li>
  <li><a href="#!">two</a></li>
  <li><a href="#!">three</a></li>
</ul>

<nav>
  <div class="nav-wrapper" style="background-color: {background_color};">
    <a href="#!" class="brand-logo">
    {#if logo}
        <img src={logo} alt={'brand image'}/>
    {/if}
    </a>
    <ul class="center hide-on-med-and-down">
      <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
    </ul>
  </div>
</nav>