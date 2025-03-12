<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { value = $bindable(), ...props }: HTMLInputAttributes = $props();
</script>

<input bind:value {...props} />

<style>
	input {
		background-color: var(--bg);
		border: 0;
		border-radius: 6px;
		color: black;
		padding: 12px;
	}
</style>
