<script lang="ts">
	import type { IconName } from '$lib/types/icons';
	let {
		name,
		variant = 'default',
		size,
		style = undefined
	}: {
		name: IconName | string;
		variant?: 'default' | 'button';
		size?: number;
		style?: string;
	} = $props();

	const sizes = {
		default: 32,
		button: 18
	};

	if (!size) {
		size = sizes[variant];
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	{style}
	class:default={variant == 'default'}
	class:button={variant == 'button'}
>
	{#if name == 'hide'}
		<path
			d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
		/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path
			d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
		/><path d="m2 2 20 20" />
	{:else if name == 'note'}
		<path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><rect
			width="16"
			height="20"
			x="4"
			y="2"
			rx="2"
		/><path d="M9.5 8h5" /><path d="M9.5 12H16" /><path d="M9.5 16H14" />
	{:else if name == 'trash'}
		<path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
			d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
		/><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
	{:else if name == 'show'}
		<path
			d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
		/><circle cx="12" cy="12" r="3" />
	{:else if name == 'trophy'}
		<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path
			d="M4 22h16"
		/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path
			d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
		/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
	{:else if name == 'cig'}
		<path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" /><path d="M18 8c0-2.5-2-2.5-2-5" /><path
			d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
		/><path d="M22 8c0-2.5-2-2.5-2-5" /><path d="M7 12v4" />
	{:else if name == 'weed'}
		<path d="M12 22v-4" /><path
			d="M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"
		/>
	{:else if name == 'phone'}
		<rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
	{:else if name == 'sex'}
		<path d="M10 20h4" /><path d="M12 16v6" /><path d="M17 2h4v4" /><path
			d="m21 2-5.46 5.46"
		/><circle cx="12" cy="11" r="5" />
	{:else if name == 'coffee'}
		<path d="M10 2v2" /><path d="M14 2v2" /><path
			d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"
		/><path d="M6 2v2" />
	{:else if name == 'gamepad'}
		<line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" /><line
			x1="15"
			x2="15.01"
			y1="12"
			y2="12"
		/><line x1="18" x2="18.01" y1="10" y2="10" /><path
			d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
		/>
	{:else if name == 'dice'}
		<rect width="12" height="12" x="2" y="10" rx="2" ry="2" /><path
			d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"
		/><path d="M6 18h.01" /><path d="M10 14h.01" /><path d="M15 6h.01" /><path d="M18 9h.01" />
	{:else if name == 'beer'}
		<path d="M17 11h1a3 3 0 0 1 0 6h-1" /><path d="M9 12v6" /><path d="M13 12v6" /><path
			d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"
		/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
	{:else if name == 'menu'}
		<path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
	{:else if name == 'arrow'}
		<path d="m6 9 6 6 6-6" />
	{:else if name == 'arrowup'}
		<path d="M5 3h14" /><path d="m18 13-6-6-6 6" /><path d="M12 7v14" />
	{:else if name == 'closedeye'}
		<path d="m15 18-.722-3.25" /><path d="M2 8a10.645 10.645 0 0 0 20 0" /><path
			d="m20 15-1.726-2.05"
		/><path d="m4 15 1.726-2.05" /><path d="m9 18 .722-3.25" />
	{:else if name == 'filedown'}
		<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path
			d="M14 2v4a2 2 0 0 0 2 2h4"
		/><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" />
	{:else if name == 'fileup'}
		<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path
			d="M14 2v4a2 2 0 0 0 2 2h4"
		/><path d="M12 12v6" /><path d="m15 15-3-3-3 3" />
	{:else if name == 'gh'}
		<path
			d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
		/><path d="M9 18c-4.51 2-5-2-7-2" />
	{:else if name == 'palette'}
		<path
			d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
		/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle
			cx="17.5"
			cy="10.5"
			r=".5"
			fill="currentColor"
		/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><circle
			cx="8.5"
			cy="7.5"
			r=".5"
			fill="currentColor"
		/>
	{:else if name == 'plus'}
		<path d="M5 12h14" /><path d="M12 5v14" />
	{:else if name == 'moon'}
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	{/if}
</svg>

<!-- {:else if name == ''} -->

<style>
	svg {
		stroke: var(--icon-color, currentColor);
	}

	.default {
		--icon-color: var(--text);
	}

	.button {
		--icon-color: var(--button-icon);
	}
</style>
