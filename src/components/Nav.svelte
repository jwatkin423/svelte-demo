<script>
import Icon from "./Icon.svelte";
import {faBars, faDownload, faSearch, faBookmark} from '@fortawesome/free-solid-svg-icons'

let icon = [faSearch, faDownload];
export let background_color;
export let logo;
</script>

<style>

	.navbar-wrapper {
		background-color: #ffffff;
	}

    .navbar-td {
        height: 30px;
        padding-left: 0 !important;
    }

    img {
        width: 100%;
        max-height: 65px;
        max-width: 202px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #F2F2F2;
    }

    .menu-wrapper {
		display: flex;
        line-height: 30px;
        width: 1280px;
    }

    .pull-left {
        margin-left: 0px;
        margin-right: auto;
        display: inline-block;
        position: relative;
    }

    .pull-right {
        margin-right: 0px;
        margin-left: auto;
        display: inline-block;
        position: relative;
        margin-right: 5px;
        height: 30px;
    }
    
    ul.menu {
        list-style:  none;
        margin-top: 0px;
    }

    ul.menu li {
        color: #666666;
        width: 16px;
        float:left;
        padding-right: 15px;
    }

    ul ul {
        display: none;
        list-style: none;
    }

    ul.menu li:hover > ul {
        display: block;
        z-index: auto;
    }

    ul.menu li:hover > ul li {
        width: 260px;
    }

    i svg {
        margin-bottom: 5px;
    }

    @media only screen and (max-width: 1279px) {
        .navbar-wrapper{
            width: 100%;
        }
        
        .menu-wrapper {
            width: 100%;
            z-index: auto;
        }
    }

</style>

<div class="navbar-wrapper">
	<div class="logo">
		<img src={logo} alt={'brand image'}/>
	</div>
	<div class="navbar-td" id="navbar-td" style="background-color: {background_color};">
		<div class="menu-wrapper">
            <div class="pull-right">
                <ul class="menu">
                    <li><a on:click|preventDefault href="."><i><Icon icon={icon[0]} /></i></a></li>
                    <li><a on:click|preventDefault href="."><i><Icon icon={icon[1]} /></i></a></li>
                </ul>
			</div>
		</div>

	</div>
</div>