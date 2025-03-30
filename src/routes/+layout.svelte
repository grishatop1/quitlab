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
		<p style="opacity: 0.7;">pre-alpha version</p>
	</header>
{/if}

{@render children()}

<svelte:head>
	<title>QuitLab</title>
	<meta property="og:title" content="QuitLab: Start making a change" />
	<meta property="og:site_name" content="QuitLab" />
	<meta
		property="og:description"
		content="Whatever you're struggling with, deciding to quit is an important step. Take the next step by tracking it on QuitLab."
	/>
	<meta property="og:image" content="https://quitlab.org/ql.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://quitlab.org" />
	<meta property="og:type" content="website" />
</svelte:head>

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
