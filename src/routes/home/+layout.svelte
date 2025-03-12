<script>
	import Title from '$lib/Title.svelte';
	let { children } = $props();
</script>

<header>
	<Title small />
</header>

{@render children()}

<style>
	header {
		padding: 16px;
	}
</style>
