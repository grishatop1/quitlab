<script>
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import Input from '$lib/components/Input.svelte';
	import { fly } from 'svelte/transition';
	import { db } from '$lib/db';
	import { goto } from '$app/navigation';
	import { loadingState } from '$lib/states.svelte';

	let user_ready = $state(false);
	let username = $state('');

	let checkReady = async () => {
		const data = await db.status.toArray();
		if (data.length !== 0) {
			loadingState.loading = true;
			setTimeout(async () => {
				await goto('/', { invalidateAll: true });
				loadingState.loading = false;
			}, 700);
		} else {
			user_ready = true;
		}
	};

	let submit = async () => {
		if (!username.trim()) return;
		loadingState.loading = true;
		await db.status.clear();
		await db.status.add({ username: username.trim(), passedTutorial: false });
		setTimeout(async () => {
			await goto('/');
			loadingState.loading = false;
		}, 700);
	};
</script>

<main>
	<div class="title">
		<Title />
	</div>
	<div class="sections">
		{#if !user_ready}
			<section transition:fly={{ x: -100 }}>
				<div class="desc">
					QuitLab helps you take control of your habits—breaking bad ones and building mental
					clarity for a better you.
				</div>
				<div>
					<Button
						onclick={() => {
							checkReady();
						}}>I'm ready</Button
					>
				</div>
			</section>
		{:else}
			<section transition:fly={{ x: 100 }}>
				<div style="margin-bottom: 10px;">Choose an username you like.</div>
				<Input placeholder="Enter here" bind:value={username} onenter={submit} />
				<div style="margin-top: 10px;">
					<Button
						onclick={() => {
							submit();
						}}>Proceed</Button
					>
				</div>
			</section>
		{/if}
	</div>
</main>

<style>
	main {
		height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.sections {
		display: grid;
		height: 150px;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	.desc {
		margin: 20px 40px;
		text-align: center;
	}
</style>
