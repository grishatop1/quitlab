<script lang="ts">
	import '../app.css';
	import Loading from '$lib/components/Loading.svelte';
	import Title from '$lib/components/Title.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import MenuIcon from '$lib/icons/Menu.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { menuState } from '$lib/states.svelte';

	let { children } = $props();
</script>

<Loading />
<Dialog />
<Menu />

{#if page.url.pathname !== '/start'}
	<header>
		<a href="/">
			<Title small />
		</a>
		{#if page.url.pathname === '/'}
			<button
				style="all: unset; cursor: pointer;"
				transition:fly={{ y: -50 }}
				onclick={() => {
					menuState.show = !menuState.show;
				}}><MenuIcon /></button
			>
		{/if}
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
