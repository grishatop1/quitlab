<script lang="ts">
	import type { Habit } from '$lib/data';
	import type { HabitEntry } from '$lib/db';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import Trophy from '$lib/icons/Trophy.svelte';
	let { habitEntry, habitData }: { habitEntry: HabitEntry; habitData: Habit } = $props();
</script>

<main>
	<div class="top">
		<div class="icon">
			<HabitIcons icon={habitData.icon} />
		</div>
		<div class="info">
			<h2>{habitData.name}</h2>
			<h3>1 month and 2 days free</h3>
			<p>about 34$ saved!</p>
		</div>
	</div>
	<div class="bottom">
		<div class="progress">
			<div class="bar"></div>
		</div>
		<div class="additional">3h and 5m until next milestone</div>
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
		margin-top: 16px;
	}
	.progress {
		width: 90%;
		height: 16px;
		border-radius: 4px;
		border: 1px solid var(--text);
		overflow: hidden;
	}
	.bar {
		width: 45%;
		height: 100%;
		background-color: var(--active);
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
