<script lang="ts">
	import { fade } from 'svelte/transition';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { HabitEntry } from '$lib/db';
	import type { Habit } from '$lib/data';
	import { Craving, db } from '$lib/db';

	let {
		show_notebook = $bindable(),
		habitEntry,
		habitData
	}: { show_notebook: boolean; habitEntry: HabitEntry; habitData: Habit } = $props();

	let note_text = $state('');

	let submitNote = async (craving: Craving) => {
		await db.notes.add({
			entry_id: habitEntry.id,
			date: new Date(),
			text: note_text,
			craving: craving
		});
		note_text = '';
	};
</script>

<main
	transition:fade={{ duration: 100 }}
	onclick={() => {
		show_notebook = false;
	}}
	role="presentation"
>
	<div
		class="content"
		onclick={(e) => {
			e.stopPropagation();
		}}
		role="presentation"
	>
		<div class="write">
			<h2>How do you feel right now?</h2>
			<textarea class="standard-shadow" placeholder="Enter a note..." bind:value={note_text}
			></textarea>
			<p>Craving level</p>
			<div class="cravings">
				<Button
					disabled={note_text.trim() === ''}
					green
					onclick={() => {
						submitNote(Craving.Zero);
					}}>Zero</Button
				>
				<Button
					disabled={note_text.trim() === ''}
					onclick={() => {
						submitNote(Craving.Light);
					}}>Light</Button
				>
				<Button
					disabled={note_text.trim() === ''}
					onclick={() => {
						submitNote(Craving.Medium);
					}}>Medium</Button
				>
				<Button
					disabled={note_text.trim() === ''}
					red
					onclick={() => {
						submitNote(Craving.Strong);
					}}>Strong</Button
				>
			</div>
		</div>
		<div class="notes">
			<Note />
		</div>
	</div>
</main>

<style>
	textarea {
		background-color: white;
		border: 0;
		border-radius: 6px;
		color: black;
		padding: 4px;
		resize: none;
		width: 100%;
		height: 80px;
	}
	h2 {
		font-weight: normal;
	}
	main {
		position: fixed;
		inset: 0 auto auto 0;
		width: 100%;
		height: 100%;
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.content {
		background-color: var(--bg);
		padding: 16px;
		border-radius: 8px;
		width: 100%;
		margin: 16px;
	}
	.write {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
	.cravings {
		display: flex;
		gap: 4px;
	}
</style>
