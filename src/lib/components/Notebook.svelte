<script lang="ts">
	import { fade } from 'svelte/transition';
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { HabitEntry } from '$lib/db';
	import { Craving, db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { flip } from 'svelte/animate';

	let { habitEntry }: { habitEntry: HabitEntry } = $props();

	let note_text = $state('');

	let note_container_html: HTMLDivElement;

	let submitNote = async (craving: Craving) => {
		await db.notes.add({
			entry_id: habitEntry.id,
			date: new Date(),
			text: note_text,
			craving: craving
		});
		note_text = '';
		note_container_html.scrollTo(0, 0);
	};

	let notes = $derived(
		liveQuery(async () => {
			const notes = await db.notes.where('entry_id').equals(habitEntry.id).reverse().toArray();
			return notes;
		})
	);

	let playing = false;
	let audio = new Audio('wil.mp3');
	$effect(() => {
		if (note_text === 'what is love' && !playing) {
			audio.volume = 0.6;
			audio.play();
			playing = true;
		}
	});
</script>

<main
	transition:fade={{ duration: 100 }}
	onclick={() => {
		history.back();
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
			<p>Cravings:</p>
			<div class="cravings">
				<Button
					disabled={note_text.trim() === ''}
					green
					onclick={() => {
						submitNote(Craving.Zero);
					}}>None</Button
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
		<div class="notes" bind:this={note_container_html}>
			{#each $notes as note (note.id)}
				<div class="note-wrapper" animate:flip>
					<Note {note} {habitEntry} />
				</div>
			{/each}
			{#if $notes && $notes.length === 0}
				<div class="no-notes" transition:fade>
					No notes at the moment :o <br />Feel free to add some
				</div>
			{/if}
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
		margin: 12px;
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
		width: 100%;
		margin: 8px;
		border-radius: 8px;
		max-width: 700px;
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
	.notes {
		margin-top: 8px;
		overflow: scroll;
		height: 40dvh;
		position: relative;
	}
	.no-notes {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0 auto auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
