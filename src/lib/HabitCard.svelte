<script lang="ts">
	import type { Habit } from '$lib/data';
	import HabitIcons from './icons/HabitIcons.svelte';
	let { name, description, icon }: Habit = $props();
</script>

<div class="card">
	<div class="icon">
		<HabitIcons {icon} />
	</div>
	<div class="text">
		<h2>{name}</h2>
		<p>
			{description}
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
