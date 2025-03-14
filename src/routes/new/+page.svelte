<script>
	import { habits } from '$lib/data';
	import HabitCard from '$lib/components/HabitCard.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
</script>

<h1 in:fade>What habit would you like to quit?</h1>

<div class="list">
	{#each habits as habit, i (habit.id)}
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
