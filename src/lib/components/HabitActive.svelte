<script lang="ts">
	import type { Habit } from '$lib/data';
	import { db, type HabitEntry } from '$lib/db';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import Trophy from '$lib/icons/Trophy.svelte';
	import Button from '$lib/components/Button.svelte';
	import Arrow from '$lib/icons/Arrow.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import Note from '$lib/icons/Note.svelte';
	import Hide from '$lib/icons/Hide.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { dialogState, loadingState } from '$lib/states.svelte';
	let {
		index,
		habitEntry,
		habitData
	}: { index: number; habitEntry: HabitEntry; habitData: Habit } = $props();
	import {
		timeElapsed,
		calculateSpent,
		getSecondsPassed,
		getMilestone,
		getPercentageString,
		getCompletedMilestones,
		getQuitDate,
		getLastMilestone
	} from '$lib/utils';
	import { slide } from 'svelte/transition';
	import { invalidateAll, pushState } from '$app/navigation';
	import Notebook from './Notebook.svelte';
	import ClosedEye from '$lib/icons/ClosedEye.svelte';
	import Show from '$lib/icons/Show.svelte';
	import { page } from '$app/state';
	import ArrowUp from '$lib/icons/ArrowUp.svelte';

	let date_started = new Date(habitEntry.date_started);
	let seconds_passed = $state(getSecondsPassed(date_started));
	let current_milestone = $state(getMilestone(getSecondsPassed(date_started)));
	let last_milestone = $state(getLastMilestone(getSecondsPassed(date_started)));
	let interval_id = 0;

	let free_string = $state('');
	let money_saved = $state('');
	let expanded = $state(false);
	let hidden = $state(habitEntry.hidden);

	onMount(() => {
		interval_id = setInterval(() => {
			update();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval_id);
	});

	let update = () => {
		free_string = timeElapsed(date_started);
		money_saved = calculateSpent(date_started, habitEntry.money_per_week).toString();
		seconds_passed = getSecondsPassed(date_started);
		current_milestone = getMilestone(seconds_passed);
		last_milestone = getLastMilestone(seconds_passed);
	};

	let remove = async () => {
		loadingState.loading = true;
		setTimeout(async () => {
			await db.habits.delete(habitEntry.id);
			await db.notes.where('entry_id').equals(habitEntry.id).delete();
			await invalidateAll();
		}, 400);
	};

	let hide = async () => {
		hidden = !hidden;
		await db.habits.update(habitEntry.id, { hidden: hidden });
		await invalidateAll();
	};

	let moveToTop = async () => {
		await db.transaction('rw', db.habits, async () => {
			// Shift all items with position >= 0
			await db.habits
				.where('position')
				.aboveOrEqual(0)
				.modify((item) => {
					item.position += 1;
				});

			// Now set the moved item to position 0
			await db.habits.update(habitEntry.id, { position: 0 });
		});
		invalidateAll();
	};

	update();
</script>

<main>
	<div
		class="classic"
		role="presentation"
		onclick={() => {
			expanded = !expanded;
		}}
	>
		<div class="top">
			<div class="icon">
				{#if !hidden}
					<HabitIcons icon={habitData.icon} />
				{:else}
					<ClosedEye />
				{/if}
			</div>
			<div class="info">
				<h2>
					{#if !hidden}
						{habitData.name}
					{:else}
						Addiction
					{/if}
				</h2>
				<h3>{free_string} free</h3>
				{#if habitData.moneyPage}
					<p>about ${money_saved} saved</p>
				{/if}
				<!-- {#if habitData.timePage}
					<p>about #todo hours saved</p>
				{/if} -->
			</div>
		</div>
		{#if current_milestone}
			<div class="bottom">
				<div class="progress">
					<div
						class="bar"
						style={`width: ${getPercentageString(seconds_passed - last_milestone.time, current_milestone.time - last_milestone.time)};`}
					></div>
					<p style="opacity: 0.8;">{current_milestone.text}</p>
				</div>
				<div class="additional">
					{#if current_milestone.supportive_text}
						{current_milestone.supportive_text}
					{:else}
						keep it up!
					{/if}
				</div>
			</div>
		{/if}
		<div class="achievements">
			<p style="margin-right: 2px;">
				{getCompletedMilestones(seconds_passed)}
			</p>
			<Trophy />
		</div>
	</div>
	<button
		class="expand-btn"
		onclick={() => {
			expanded = !expanded;
		}}><Arrow up={expanded} /></button
	>
	{#if expanded}
		<div class="expand" transition:slide>
			<div class="blue-buttons">
				<Button
					onclick={() => {
						pushState('', { show_notebook_habit: habitEntry.id });
					}}>Open notebook &nbsp<Note /></Button
				>
				<Button
					onclick={() => {
						hide();
					}}
					>{#if !hidden}Cover &nbsp<Hide />{:else}Show &nbsp<Show />{/if}</Button
				>
				{#if index !== 0}
					<Button
						onclick={() => {
							moveToTop();
						}}><ArrowUp /></Button
					>
				{/if}
			</div>
			<Button
				red
				onclick={() => {
					dialogState.show = true;
					dialogState.text = 'Did you really fail?';
					dialogState.yes = 'Yeah...';
					dialogState.no = "Woops, I didn't";
					dialogState.callback = remove;
				}}>I've failed, delete this progress &nbsp<Trash /></Button
			>
			<p>Quit date - {getQuitDate(date_started)}</p>
		</div>
	{/if}
</main>

{#if page.state.show_notebook_habit === habitEntry.id}
	<Notebook {habitEntry} />
{/if}

<style>
	main {
		background-color: var(--bg);
		padding: 14px;
		border-radius: 12px;
		position: relative;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		width: 100%;
		max-width: 600px;
	}
	main:first-child {
		margin-top: 0px;
	}
	.top {
		display: flex;
		align-items: center;
	}
	.icon {
		margin-right: 14px;
	}
	h3 {
		text-wrap: nowrap;
		white-space: none;
	}
	.bottom {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 8px;
	}
	.progress {
		width: 95%;
		border-radius: 4px;
		border: 1px solid var(--green);
		overflow: hidden;
		position: relative;
	}
	.bar {
		width: 0%;
		height: 100%;
		background-color: var(--green);
		position: absolute;
		transition: width 0.3s;
	}
	.progress p {
		z-index: 5;
		position: relative;
		font-size: 12px;
		margin: 0px 4px;
		text-align: right;
	}
	.additional {
		margin-top: 4px;
		text-align: right;
		opacity: 0.7;
	}
	.expand {
		margin-top: 8px;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 10px;
	}
	.expand-btn {
		all: unset;
		cursor: pointer;
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 50px;
		height: 50px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
	}
	.expand-btn :global(svg) {
		position: absolute;
		right: 8px;
		bottom: 4px;
	}
	.blue-buttons {
		display: flex;
		gap: 10px;
	}
	.achievements {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		align-items: center;
	}
</style>
