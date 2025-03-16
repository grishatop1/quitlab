<script lang="ts">
	import type { Habit } from '$lib/data';
	import type { HabitEntry } from '$lib/db';
	let { habitEntry, habitData }: { habitEntry: HabitEntry; habitData: Habit } = $props();
</script>
