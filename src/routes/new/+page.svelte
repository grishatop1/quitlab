<script>
	import { habits } from '$lib/data';
	import HabitCard from '$lib/HabitCard.svelte';
	import { fade } from 'svelte/transition';
</script>

<h1 in:fade>What habit would you like to quit?</h1>

<div class="list">
	{#each habits as habit, i (habit.name)}
		<HabitCard {habit} {i} />
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
