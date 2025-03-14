<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { fade } from 'svelte/transition';
</script>

<main in:fade>
	<h3>When do you want to stop?</h3>
	<Button>Right now from this moment!</Button>
	<p style="margin: 20px;">or</p>
	<p>I'm already in</p>
	<input type="datetime-local" />
	<Button disabled>Select</Button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	main * {
		margin: 4px 0;
	}
	h3 {
		font-weight: normal;
	}
	input {
		padding: 10px;
		border: none;
		background-color: var(--bg);
		border-radius: 6px;
	}
</style>
