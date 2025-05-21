<script lang="ts">
	import { dialogState, loadingState, menuState } from '$lib/states.svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './Button.svelte';
	import FileDown from '$lib/icons/FileDown.svelte';
	import FileUp from '$lib/icons/FileUp.svelte';
	import Palette from '$lib/icons/Palette.svelte';
	import Gh from '$lib/icons/Gh.svelte';
	import { db } from '$lib/db';
	import 'dexie-export-import';
	import download from 'downloadjs';
	import { invalidateAll } from '$app/navigation';

	let input = document.createElement('input');
	input.type = 'file';

	let backup = async () => {
		let username = (await db.status.toCollection().first())?.username;
		const blob = await db.export();
		download(blob, `${username}-backup.quitlab`, 'application/json');
	};

	let load = async () => {
		input.click();
	};

	input.onchange = (e: Event) => {
		let files = (e.target as HTMLInputElement).files;
		if (!files) return;
		let file = files[0];
		let loadProceed = async () => {
			loadingState.loading = true;
			try {
				await db.delete({ disableAutoOpen: false });
				await db.import(file);
			} catch (e) {
				setTimeout(() => {
					loadingState.loading = false;
					dialogState.show = true;
					dialogState.text = `Loading backup failed :(`;
					dialogState.yes = 'Choose another file';
					dialogState.no = 'Give up';
					dialogState.callback = load;
					console.log(e);
				}, 400);
				return;
			}
			setTimeout(async () => {
				await invalidateAll();
				loadingState.loading = false;
			}, 400);
		};
		dialogState.show = true;
		dialogState.text = 'This will overwrite your current data!';
		dialogState.yes = 'Sure, load the backup';
		dialogState.no = 'Cancel';
		dialogState.callback = loadProceed;
		menuState.show = false;
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
			<Button onclick={load}>Load the backup file &nbsp<FileUp /></Button>
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
