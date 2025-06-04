<script lang="ts">
	import type { HabitEntry, Note } from '$lib/db';
	import { Craving, db } from '$lib/db';
	import { generateTimerText } from '$lib/utils';
	import Icon from './Icon.svelte';

	let { note, habitEntry }: { note: Note; habitEntry: HabitEntry } = $props();

	let remove = async () => {
		await db.notes.delete(note.id);
	};
</script>

<main>
	<p class="text">{note.text}</p>
	<div class="info">
		{#if note.craving === Craving.Zero}
			<div class="ball" style="background-color: var(--green);"></div>
			<p class="info-text">
				&nbsp;no cravings at {generateTimerText(note.date, new Date(habitEntry.date_started))} free
			</p>
		{:else if note.craving === Craving.Light}
			<div class="ball" style="background-color: var(--text); opacity: 0.4;"></div>
			<p class="info-text">
				&nbsp;light cravings at {generateTimerText(note.date, new Date(habitEntry.date_started))} free
			</p>
		{:else if note.craving === Craving.Medium}
			<div class="ball" style="background-color: var(--text);"></div>
			<p class="info-text">
				&nbsp;medium cravings at {generateTimerText(note.date, new Date(habitEntry.date_started))} free
			</p>
		{:else if note.craving === Craving.Strong}
			<div class="ball" style="background-color: var(--red);"></div>
			<p class="info-text">
				&nbsp;strong cravings at {generateTimerText(note.date, new Date(habitEntry.date_started))} free
			</p>
		{/if}
	</div>
	<button
		class="trash"
		onclick={() => {
			remove();
		}}
	>
		<Icon name="trash" size={18} />
	</button>
</main>

<style>
	main {
		border-bottom: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		padding: 6px;
		position: relative;
	}
	.text {
		word-wrap: break-word;
		padding: 5px;
	}
	.ball {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.info {
		display: flex;
		align-items: center;
		margin-top: 5px;
	}
	.trash {
		all: unset;
		position: absolute;
		inset: auto 10px 2px auto;
		opacity: 0.9;
	}
	.trash :global(svg) {
		stroke: var(--text);
		cursor: pointer;
	}
</style>
