<script lang="ts">
	import { menuState } from '$lib/states.svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './Button.svelte';
	import FileDown from '$lib/icons/FileDown.svelte';
	import FileUp from '$lib/icons/FileUp.svelte';
	import Palette from '$lib/icons/Palette.svelte';
	import Gh from '$lib/icons/Gh.svelte';
	import { db } from '$lib/db';
	import 'dexie-export-import';
	import download from 'downloadjs';

	let backup = async () => {
		const blob = await db.export();
		download(blob, `quitlab-test.json`, 'application/json');
	};
</script>

{#if menuState.show}
	<main
		transition:fade
		role="presentation"
		onclick={() => {
			menuState.show = false;
		}}
	>
		<div
			class="menu"
			role="presentation"
			onclick={(e) => e.stopPropagation()}
			transition:fly={{ x: 150 }}
		>
			<p class="version">version alpha 1.2</p>
			<Button onclick={backup}>Create a backup file &nbsp<FileDown /></Button>
			<Button>Load the backup file &nbsp<FileUp /></Button>
			<Button disabled>Switch theme &nbsp<Palette /></Button>
			<Button
				onclick={() => {
					window.location.assign('https://github.com/grishatop1/quitlab');
				}}>Contribute &nbsp<Gh /></Button
			>
		</div>
	</main>
{/if}

<style>
	main {
		position: fixed;
		width: 100%;
		height: 100dvh;
		inset: 0 auto auto 0;
		background-color: rgba(0, 0, 0, 0.35);
		z-index: 10000;
	}
	.menu {
		background-color: var(--bg);
		inset: 0 0 auto auto;
		position: absolute;
		border-bottom-left-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 24px;
		padding-left: 24px;
		padding-right: 24px;
	}
	.menu :global(button) {
		margin: 4px;
	}
	.version {
		opacity: 0.5;
		padding: 24px;
	}
</style>
