<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { ...props }: HTMLButtonAttributes = $props();
</script>

<Button
	style="border-radius: 50%; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center;"
	{...props}
>
	<Plus />
</Button>
