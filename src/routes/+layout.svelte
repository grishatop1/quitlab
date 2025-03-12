<script>
	import '../app.css';
	import { db } from '$lib/db';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	let { children } = $props();

	onMount(async () => {
		let data = await db.status.toArray();
		if (data.length === 0) {
			if (page.url.pathname !== '/start') {
				goto('/start');
			}
		} else {
			goto('/home');
		}
	});
</script>

<svelte:head>
	<title>QuitLab</title>
</svelte:head>

{@render children()}
