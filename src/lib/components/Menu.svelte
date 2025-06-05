<script lang="ts">
	import { dialogState, loadingState, menuState, themeState } from '$lib/states.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import Button from './Button.svelte';
	import { db } from '$lib/db';
	import 'dexie-export-import';
	import download from 'downloadjs';
	import { invalidateAll } from '$app/navigation';
	import Icon from './Icon.svelte';

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

	let theme = () => {
		themeState.theme = themeState.theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = themeState.theme;
		localStorage.setItem('theme', themeState.theme);
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
			<p class="version">version stable 1.0</p>
			<Button icon="filedown" onclick={backup}>Create a backup file</Button>
			<Button icon="fileup" onclick={load}>Load the backup file</Button>
			<Button onclick={theme}>
				<div class="switch-animation">
					<span>Switch to</span>
					{#if themeState.theme === 'light'}
						<div style="height: 18px;" transition:scale>
							<Icon name="moon" variant="button" style="margin: 0 4px;" />
						</div>
					{:else}
						<div style="height: 18px;" transition:scale>
							<Icon name="sun" variant="button" style="margin: 0 4px;" />
						</div>
					{/if}
					<span>mode</span>
				</div>
			</Button>
			<a
				href="https://github.com/grishatop1/quitlab"
				target="_blank"
				style="display: flex; align-items: center; margin-top: 6px;"
				>Contribute &nbsp;<Icon name="gh" size={18} /></a
			>
			<p style="margin-top: 8px; max-width: 200px; text-align: center; opacity: 0.6;">
				&COPY; 2025. Licensed under the GNU GPL v3.0.
			</p>
		</div>
	</main>
{/if}

<style>
	main {
		position: fixed;
		width: 100%;
		height: 100dvh;
		inset: 0 auto auto 0;
		background-color: rgba(0, 0, 0, 0.45);
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
	.switch-animation {
		display: grid;
		grid-template-columns: auto auto auto;
	}
	.switch-animation div {
		grid-column-start: 2;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
</style>
