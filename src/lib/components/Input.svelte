<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		value = $bindable(),
		onenter,
		...props
	}: HTMLInputAttributes & { onenter?: () => void } = $props();

	let handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && typeof onenter === 'function') {
			onenter();
		}
	};
</script>

<input bind:value {...props} onkeydown={handleKeydown} />

<style>
	input {
		background-color: var(--bg);
		border: 0;
		border-radius: 6px;
		color: black;
		padding: 12px;
	}
	input::placeholder {
		color: var(--text);
	}
</style>
