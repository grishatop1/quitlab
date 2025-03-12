<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>QuitLab</title>
</svelte:head>

{@render children()}
