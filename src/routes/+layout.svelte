<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { db } from '$lib/db';
	import { loadingState } from '$lib/states.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Title from '$lib/components/Title.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let checkStatus = async () => {
		const data = await db.status.toArray();
		if (data.length === 0) {
			await goto('/start');
		}
		setTimeout(() => {
			loadingState.loading = false;
		}, 500);
	};

	checkStatus();
</script>

<svelte:head>
	<title>QuitLab</title>
</svelte:head>

{#if loadingState.loading}
	<Loading />
{/if}

{#if page.url.pathname !== '/start'}
	<header>
		<Title small />
		<p style="opacity: 0.7;">early pre-alpha</p>
	</header>
{/if}

{@render children()}

<style>
	header {
		padding-top: 16px;
		padding-left: 16px;
		padding-right: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
