<script lang="ts">
	import { goto } from '$app/navigation';
	import CircularBtn from '$lib/components/CircularBtn.svelte';
	import Button from '$lib/components/Button.svelte';
	import { db } from '$lib/db';
	import { fade } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';
	import { onMount } from 'svelte';

	let tutorial = $state(false);

	let checkTutorial = async () => {
		const data = await db.status.toArray();
		if (!data[0].passedTutorial) {
			setTimeout(() => {
				tutorial = true;
			}, 700);
		}
	};

	let endTutorial = async () => {
		tutorial = false;
		const statusEntry = await db.status.toCollection().first();
		if (statusEntry) await db.status.update(statusEntry, { passedTutorial: true });
	};

	onMount(() => {
		checkTutorial();
	});
</script>

<div class="list"></div>

<div class="empty">
	<p>such an empty place...</p>
</div>

<div class="add">
	<CircularBtn
		onclick={() => {
			goto('/new');
		}}
	/>
</div>

{#if tutorial}
	<div class="tutorial" transition:fade>
		<div class="block">
			<Typewriter cursor={false}>
				<p style="margin-bottom: 10px;">
					We all have habits—some good, some not so much. Tap the '+' button to add a habit you want
					to quit.
				</p>
			</Typewriter>
			<Button onclick={endTutorial}>Got it.</Button>
		</div>
	</div>
{/if}

<style>
	.add {
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.empty {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.tutorial {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.block {
		position: absolute;
		background-color: var(--bg);
		padding: 10px;
		border-radius: 12px;
		width: 80%;
		bottom: 100px;
		right: 60px;
	}
</style>
