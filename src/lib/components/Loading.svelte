<script>
	import Spinner from '$lib/components/Spinner.svelte';
	import { loadingState } from '$lib/states.svelte';
	import { fade } from 'svelte/transition';
</script>

{#if loadingState.loading}
	<div class="loading" transition:fade>
		<h2>QuitLab</h2>
		<Spinner />
	</div>
{/if}

<style>
	h2 {
		font-weight: normal;
		text-align: center;
		margin-right: 6px;
	}
	.loading {
		inset: 0 auto auto 0;
		background-color: black;
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		color: white;
		flex-wrap: wrap;
	}
</style>
