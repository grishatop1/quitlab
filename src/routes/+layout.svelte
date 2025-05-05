<script lang="ts">
	import '../app.css';
	import Loading from '$lib/components/Loading.svelte';
	import Title from '$lib/components/Title.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<Loading />
<Dialog />

{#if page.url.pathname !== '/start'}
	<header>
		<a href="/">
			<Title small />
		</a>
		<p style="opacity: 0.7;">alpha 1.1</p>
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
	header a {
		all: unset;
		cursor: pointer;
	}
</style>
