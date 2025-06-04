<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';

	let { ...props }: HTMLButtonAttributes = $props();
</script>

<Button
	style="border-radius: 50%; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center;"
	{...props}
>
	<Icon name="plus" size={24} variant="button" />
</Button>
