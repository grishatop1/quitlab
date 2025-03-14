<script lang="ts">
	import type { Habit } from '$lib/data';
	import { fly } from 'svelte/transition';
	import HabitIcons from './icons/HabitIcons.svelte';
	let { habit, i }: { habit: Habit; i: number } = $props();
</script>

<div class="card" in:fly|global={{ delay: i * 100, x: -50 }}>
	<div class="icon">
		<HabitIcons icon={habit.icon} />
	</div>
	<div class="text">
		<h2>{habit.name}</h2>
		<p>
			{habit.description}
		</p>
	</div>
</div>

<style>
	.card {
		background-color: var(--bg);
		display: flex;
		margin: 20px;
		padding: 15px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}
	.icon {
		display: flex;
		align-items: center;
		padding-right: 15px;
	}
</style>
