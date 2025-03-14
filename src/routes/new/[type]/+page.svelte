<script lang="ts">
	import { page } from '$app/state';
	import { habits, type Habit } from '$lib/data';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import DateSelector from '$lib/components/DateSelector.svelte';
	import { fly } from 'svelte/transition';

	let habit = habits.find((obj) => obj.id === page.params.type) as Habit;
</script>

<header in:fly={{ y: -50 }}>
	<div class="top">
		<HabitIcons icon={habit.icon} />
		<h1>
			{habit.name}
		</h1>
	</div>
	{#if habit.additional}
		<p>{habit.additional}</p>
	{/if}
</header>

<DateSelector />

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 40px 15px;
	}

	header .top {
		display: flex;
		align-items: center;
	}

	header .top h1 {
		margin-left: 5px;
	}
</style>
