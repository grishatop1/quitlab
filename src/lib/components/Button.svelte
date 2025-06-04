<script lang="ts">
	import type { IconName } from '$lib/types/icons';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';

	let {
		children,
		big = false,
		red = false,
		green = false,
		icon = undefined,
		...props
	}: HTMLButtonAttributes & {
		big?: boolean;
		red?: boolean;
		green?: boolean;
		icon?: IconName;
	} = $props();
</script>

<button {...props} class:big class:red class:green>
	{@render children?.()}
	{#if icon}
		<Icon name={icon} variant="button" style="margin-left: {children ? '8px' : '0'};" />
	{/if}
</button>

<style>
	button {
		background-color: var(--primary);
		border: 0;
		border-radius: 6px;
		color: white;
		padding: 12px;
		display: flex;
		transition: background-color 0.3s;
	}
	button:disabled {
		background-color: var(--bg2);
		cursor: default;
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
