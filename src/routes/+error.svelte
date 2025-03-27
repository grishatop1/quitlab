<script>
	import { page } from '$app/state';
</script>

<main>
	<h1>
		{page.status}
		{#if page.error}
			{page.error.message}
		{/if}
		:/
	</h1>
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -5;
	}
</style>
