<script>
	import Spinner from './icons/Spinner.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="loading" transition:fade>
	<h2>QuitLab</h2>
	<Spinner />
</div>

<style>
	h2 {
		font-weight: normal;
		text-align: center;
	}
	.loading {
		background-color: black;
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		color: var(--bg);
		flex-wrap: wrap;
	}
	.loading * {
		margin: 16px 6px;
	}
</style>
