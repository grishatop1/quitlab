<script lang="ts">
	import type { Habit } from '$lib/data';
	import type { HabitEntry } from '$lib/db';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import Trophy from '$lib/icons/Trophy.svelte';
	import { onDestroy, onMount } from 'svelte';
	let { habitEntry, habitData }: { habitEntry: HabitEntry; habitData: Habit } = $props();
	import { timeElapsed, calculateSpent } from '$lib/utils';

	let date_started = new Date(habitEntry.date_started);
	let interval_id = 0;

	let free_string = $state('');
	let money_saved = $state(0);

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
		money_saved = calculateSpent(date_started, habitEntry.money_per_week);
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
			<h3>{free_string} free</h3>
			<p>about {money_saved}$ saved!</p>
		</div>
	</div>
	<div class="bottom">
		<div class="progress">
			<div class="bar"></div>
			<p>90 days milestone</p>
		</div>
		<div class="additional">keep going!</div>
	</div>
	<div class="achievements">
		<p style="margin-right: 2px;">34/50</p>
		<Trophy />
	</div>
</main>

<style>
	main {
		background-color: var(--bg);
		padding: 16px;
		margin: 16px;
		border-radius: 12px;
		position: relative;
	}
	.top {
		display: flex;
		align-items: center;
	}
	.icon {
		margin-right: 16px;
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
		border: 1px solid var(--bg2);
		overflow: hidden;
		position: relative;
	}
	.progress p {
		z-index: 5;
		position: relative;
		font-size: 0.8em;
		margin: 2px;
		text-align: right;
	}
	.bar {
		width: 80%;
		height: 100%;
		background-color: var(--bg2);
		position: absolute;
	}
	.additional {
		margin-top: 4px;
		text-align: right;
	}
	.achievements {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		align-items: center;
	}
</style>
