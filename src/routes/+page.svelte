<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import CircularBtn from '$lib/components/CircularBtn.svelte';
	import HabitActive from '$lib/components/HabitActive.svelte';
	import type { Habit } from '$lib/data';
	import { habits } from '$lib/data';
	import { db } from '$lib/db';
	import Typewriter from 'svelte-typewriter';
	import { fade } from 'svelte/transition';
	import type { LayoutProps } from './$types';
	import { flip } from 'svelte/animate';

	let { data }: LayoutProps = $props();

	let tutorial = $state(false);

	if (!data.status[0].passedTutorial) {
		setTimeout(() => {
			tutorial = true;
		}, 700);
	}

	let endTutorial = async () => {
		tutorial = false;
		const statusEntry = await db.status.toCollection().first();
		if (statusEntry) await db.status.update(statusEntry, { passedTutorial: true });
		invalidateAll();
	};

	setTimeout(() => {
		if (navigator.storage && navigator.storage.persist) {
			navigator.storage.persist();
		}
	}, 1500);
</script>

<svelte:head>
	<title>QuitLab</title>
	<meta property="og:title" content="QuitLab: Start making a change" />
	<meta property="og:site_name" content="QuitLab" />
	<meta
		property="og:description"
		content="Whatever you're struggling with, deciding to quit is an important step. Take the next step by tracking it on QuitLab."
	/>
	<meta property="og:image" content="https://quitlab.org/ql.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://quitlab.org" />
	<meta property="og:type" content="website" />
</svelte:head>

{#if data.entries.length > 0}
	<div class="list">
		{#each data.entries as entry, index (entry.id)}
			<div class="entry" animate:flip={{ duration: 350 }} in:fade|global>
				<HabitActive
					{index}
					habitEntry={entry}
					habitData={habits.find((h) => h.id === entry.habit_id) as Habit}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div class="empty">
		<p>such an empty place...</p>
	</div>
{/if}

{#if data.entries.length < habits.length}
	<div class="add">
		<CircularBtn
			onclick={() => {
				goto('/new');
			}}
		/>
	</div>
{/if}

{#if tutorial}
	<div class="tutorial" transition:fade>
		<div class="block">
			<Typewriter cursor={false}>
				<p style="margin-bottom: 10px;">
					Here, by tapping the "+" button you can add a habit you want to quit and start making a
					change.
				</p>
			</Typewriter>
			<Button onclick={endTutorial}>Got it.</Button>
		</div>
	</div>
{/if}

<style>
	.list {
		margin: 16px 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 100px;
	}
	.entry {
		margin: 8px 0;
		width: 100%;
	}
	.add {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 20;
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
		z-index: 25;
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
