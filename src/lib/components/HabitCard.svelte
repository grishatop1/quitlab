<script lang="ts">
	import type { Habit } from '$lib/data';
	import { fly } from 'svelte/transition';
	import Icon from './Icon.svelte';
	let { habit, i, handleClick }: { habit: Habit; i: number; handleClick: () => void } = $props();
</script>

<button class="card" in:fly|global={{ delay: i * 100, x: -50 }} onclick={handleClick}>
	<div class="icon">
		<Icon name={habit.icon} />
	</div>
	<div class="text">
		<h2>{habit.name}</h2>
		<p>
			{habit.description}
		</p>
	</div>
</button>

<style>
	button {
		all: unset;
		cursor: pointer;
	}
	.card {
		background-color: var(--bg);
		display: flex;
		margin: 10px 20px;
		padding: 15px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		max-width: 400px;
	}
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 15px;
	}
</style>
