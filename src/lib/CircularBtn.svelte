<script lang="ts">
	import Button from './basic/Button.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { ...props }: HTMLButtonAttributes = $props();
</script>

<Button style="border-radius: 50%; width: 60px; height: 60px; font-size: 1.3em;" {...props}
	>+</Button
>
