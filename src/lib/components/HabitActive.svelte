<script lang="ts">
	import type { Habit } from '$lib/data';
	import type { HabitEntry } from '$lib/db';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import Trophy from '$lib/icons/Trophy.svelte';
	import { onDestroy, onMount } from 'svelte';
	let { habitEntry, habitData }: { habitEntry: HabitEntry; habitData: Habit } = $props();
	import {
		timeElapsed,
		calculateSpent,
		getSecondsPassed,
		getMilestone,
		getPercentageString,
		getCompletedMilestones
	} from '$lib/utils';

	let date_started = new Date(habitEntry.date_started);
	let seconds_passed = $state(getSecondsPassed(date_started));
	let current_milestone = $state(getMilestone(getSecondsPassed(date_started)));
	let interval_id = 0;

	let free_string = $state('');
	let money_saved = $state('');

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
	};

	update();
</script>

<main>
	<div class="top">
		<div class="icon">
			<HabitIcons icon={habitData.icon} />
		</div>
		<div class="info">
			<h2>{habitData.name}</h2>
			<h3>{free_string} <span style="text-decoration: underline;">free</span></h3>
			{#if habitData.moneyPage}
				<p>about {money_saved}$ saved</p>
			{/if}
		</div>
	</div>
	{#if current_milestone}
		<div class="bottom">
			<div class="progress">
				<div
					class="bar"
					style={`width: ${getPercentageString(seconds_passed, current_milestone.time)};`}
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
</main>

<style>
	main {
		background-color: var(--bg);
		padding: 16px;
		margin: 26px 16px;
		border-radius: 12px;
		position: relative;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}
	main:first-child {
		margin-top: 16px;
	}
	main:last-child {
		margin-bottom: 100px;
	}
	.top {
		display: flex;
		align-items: center;
	}
	.icon {
		margin-right: 16px;
	}
	h3 {
		text-wrap: nowrap;
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
	}
	.progress p {
		z-index: 5;
		position: relative;
		font-size: 0.8em;
		margin: 2px;
		text-align: right;
	}
	.additional {
		margin-top: 4px;
		text-align: right;
		opacity: 0.7;
	}
	.achievements {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		align-items: center;
	}
</style>
