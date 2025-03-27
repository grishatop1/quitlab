<script lang="ts">
	import { dialogState } from '$lib/states.svelte';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/state';
	import Button from '$lib/components/Button.svelte';

	$effect(() => {
		if (navigating.to) {
			dialogState.show = false;
		}
	});
</script>

{#if dialogState.show}
	<main
		transition:fade
		role="presentation"
		onclick={() => {
			dialogState.show = false;
		}}
	>
		<div class="dialog" role="presentation" onclick={(e) => e.stopPropagation()}>
			<div class="text">
				<h2>
					{dialogState.text}
				</h2>
			</div>
			<div class="buttons">
				<Button
					onclick={() => {
						dialogState.show = false;
						dialogState.callback();
					}}>{dialogState.yes}</Button
				>
				<Button
					onclick={() => {
						dialogState.show = false;
					}}>{dialogState.no}</Button
				>
			</div>
		</div>
	</main>
{/if}

<style>
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.dialog {
		background-color: var(--bg);
		padding: 20px;
		border-radius: 8px;
		margin: 20px;
	}
	.dialog h2 {
		font-weight: normal;
	}
	.dialog .buttons {
		margin-top: 20px;
		display: flex;
		width: 100%;
		gap: 20px;
		justify-content: center;
	}
</style>
