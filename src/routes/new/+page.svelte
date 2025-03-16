<script lang="ts">
	import { habits } from '$lib/data';
	import HabitCard from '$lib/components/HabitCard.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { db } from '$lib/db';
	import type { Habit } from '$lib/data';

	let filtered_habits: Habit[];
	let removeActive = async () => {
		let active_habits = await db.habits.toArray();
		const habits_to_filter = active_habits.map((entry) => entry.habit_id);
		filtered_habits = habits.filter((habit) => !habits_to_filter.includes(habit.id));
	};
	removeActive();
</script>

<h1 in:fade>What habit would you like to quit?</h1>
<div class="list">
	{#each filtered_habits as habit, i (habit.id)}
		<HabitCard
			{habit}
			{i}
			handleClick={() => {
				goto(`/new/${habit.id}`);
			}}
		/>
	{/each}
</div>

<style>
	h1 {
		text-align: center;
		margin: 40px 15px;
	}
	.list {
		margin-bottom: 50px;
	}
</style>
