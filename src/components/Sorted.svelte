<script>

export let sortKeys;
export let type;
$: idPrefix = type;
let tempKey = '';
$: keys = sortKeys.map((key,i) => {
    
    if (key.toLowerCase() === 'a' || key === 'b' || key === 'c' && (tempKey !== 1)){
        tempKey = 1;
        return {group: 1}
    }

    if (key.toLowerCase() === 'd' || key === 'e' || key === 'f' && (tempKey !== 2)){
        tempKey = 2;
        return {group: 2}
    }

    if (key.toLowerCase() === 'g' || key === 'h' || key === 'i' && (tempKey !== 3)){
        tempKey = 3;
        return {group: 3}
    }

    if (key.toLowerCase() === 'j' || key === 'k' || key === 'l' && (tempKey !== 4)){
        tempKey = 4;
        return {group: 4}
    }

    if (key.toLowerCase() === 'm' || key === 'n' || key === 'o' && (tempKey !== 5)){
        tempKey = 5;
        return {group: 5}
    }

    if (key.toLowerCase() === 'p' || key === 'q' || key === 'r' && (tempKey !== 6)){
        tempKey = 6;
        return {group: 6}
    }

    if (key.toLowerCase() === 's' || key === 't' || key === 'u' && (tempKey !== 7)){
        tempKey = 7;
        return {group: 7}
    }

    if (key.toLowerCase() === 'v' || key === 'w' || key === 'x' || key === 'y' || key === 'z' && (tempKey !== 8)){
        tempKey = 8;
        return {group: 8}
    }

    if (key === '0' || key === '1' && (tempKey !== 9)) {
        tempKey = 9;
        return {group: 9}
    }

    if (key === '2' || key === '3' && (tempKey !== 10)) {
        tempKey = 10;
        return {group: 10}
    }

    if (key === '4' || key === '5' && (tempKey !== 11)) {
        tempKey = 11;
        return {group: 11}
    }

    if (key === '6' || key === '7' && (tempKey !== 12)) {
        tempKey = 12;
        return {group: 12}
    }

    if (key === '8' || key === '9' && (tempKey !== 13)) {
        tempKey = 13;
        return {group: 13}
    }

    return {group: 'na'};
});

</script>

<style>

    .sorted {
        display: block;
        position: relative;
        height: 20px;
        line-height: 20px;
        width: 100%;
    }

    .sorted-group {
        height: 20px;
        line-height: 20px;
        margin-bottom: 5px;
        display: inline-block;
    }

    .sorted-group-item {
        text-decoration: none;
        font-size: 10px;
        width: 21px;
    }

    .sorted-centered {
        width: 200px;
        text-align: center;
    }

</style>

<div class="sorted">
            <div class="sorted-centered">
                {#each keys as key}
                    {#if key.group === 1}
                        <div class="sorted-group" b><a class='sorted-group-item' href="#{type}-ac">A-C</a></div>
                    {/if}
                    {#if key.group === 2}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-df">D-F</a></div>
                    {/if}
                    {#if key.group === 3}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-gi">G-I</a></div>
                    {/if}
                    {#if key.group === 4}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-jl">J-L</a></div>
                    {/if}
                    {#if key.group === 5}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-mo">M-O</a></div>
                    {/if}
                    {#if key.group ===  6}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-pr">P-R</a></div>
                    {/if}
                    {#if key.group ===  7}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-su">S-U</a></div>
                    {/if}
                    {#if key.group === 8}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-vz">V-Z</a></div>
                    {/if}
                    {#if key.group === 9}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-01">0-1</a></div>
                    {/if}
                    {#if key.group === 10}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-23">2-3</a></div>
                    {/if}
                    {#if key.group === 11}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-45">4-5</a></div>
                    {/if}
                    {#if key.group === 12}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-67">6-7</a></div>
                    {/if}
                    {#if key.group === 13}
                        <div class="sorted-group"><a class='sorted-group-item' href="#{type}-89">8-9</a></div>
                    {/if}
                {/each}
            </div>    
        </div>