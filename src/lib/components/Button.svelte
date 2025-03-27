<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		children,
		big = false,
		red = false,
		green = false,
		...props
	}: HTMLButtonAttributes & { big?: boolean; red?: boolean; green?: boolean } = $props();
</script>

<button {...props} class:big class:red class:green>
	{@render children?.()}
</button>

<style>
	button {
		background-color: var(--primary);
		border: 0;
		border-radius: 6px;
		color: white;
		padding: 12px;
		display: flex;
	}
	button:disabled {
		background-color: var(--bg2);
	}
	.big {
		font-size: 1.2em;
		padding: 16px;
	}
	.red {
		background-color: var(--red);
	}
	.green {
		background-color: var(--green);
	}
</style>
