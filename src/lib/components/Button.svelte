<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, ...props }: HTMLButtonAttributes = $props();
</script>

<button {...props}>
	{@render children?.()}
</button>

<style>
	button {
		background-color: var(--primary);
		border: 0;
		border-radius: 6px;
		color: white;
		padding: 12px;
	}
	button:disabled {
		background-color: var(--bg2);
	}
</style>
