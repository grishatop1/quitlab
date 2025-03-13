<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { db } from '$lib/db';
	import Loading from '$lib/Loading.svelte';

	let { children } = $props();
	let loading = $state(true);

	onMount(() => {
		checkStatus();
	});

	let checkStatus = async () => {
		const data = await db.status.toArray();
		if (data.length === 0) {
			await goto('/start');
		}
		setTimeout(() => {
			loading = false;
		}, 500);
	};
</script>

<svelte:head>
	<title>QuitLab</title>
</svelte:head>

{#if loading}
	<Loading />
{/if}

{@render children()}
