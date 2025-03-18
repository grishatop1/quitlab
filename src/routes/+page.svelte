<script lang="ts">
	import { goto } from '$app/navigation';
	import CircularBtn from '$lib/components/CircularBtn.svelte';
	import Button from '$lib/components/Button.svelte';
	import { db } from '$lib/db';
	import { fade } from 'svelte/transition';
	import Typewriter from 'svelte-typewriter';
	import { onMount } from 'svelte';
	import { habits } from '$lib/data';
	import type { Habit } from '$lib/data';
	import type { HabitEntry } from '$lib/db';
	import HabitActive from '$lib/components/HabitActive.svelte';

	let tutorial = $state(false);
	let show_add_btn = $state(true);
	let entries: HabitEntry[] | undefined = $state();

	onMount(async () => {
		const data = await db.status.toArray();
		entries = await db.habits.toArray();
		if (entries.length === habits.length) {
			show_add_btn = false;
		}
		if (!data[0]) {
			goto('/start');
			return;
		}
		if (!data[0].passedTutorial) {
			setTimeout(() => {
				tutorial = true;
			}, 700);
		}
	});

	let endTutorial = async () => {
		tutorial = false;
		const statusEntry = await db.status.toCollection().first();
		if (statusEntry) await db.status.update(statusEntry, { passedTutorial: true });
	};
</script>

{#if entries}
	{#if entries.length > 0}
		<div class="list">
			{#each entries as entry (entry.id)}
				<HabitActive
					habitEntry={entry}
					habitData={habits.find((h) => h.id === entry.habit_id) as Habit}
				/>
			{/each}
		</div>
	{:else}
		<div class="empty">
			<p>such an empty place...</p>
		</div>
	{/if}
{:else}
	<div class="empty">
		<p>such an empty place...</p>
	</div>
{/if}

{#if show_add_btn}
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
					Here, tapping "+" button you can add a habit you want to quit and start making a change.
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
	.list {
		margin-top: 20px;
	}
</style>
