<script>
	let { up = false } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class:up
	class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg
>

<style>
	svg {
		stroke: var(--text);
		transition: transform 0.4s;
	}
	.up {
		transform: rotate(180deg);
	}
</style>
