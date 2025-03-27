<script lang="ts">
	import { fade } from 'svelte/transition';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let { show_notebook = $bindable() }: { show_notebook: boolean } = $props();
</script>

<main
	transition:fade={{ duration: 100 }}
	onclick={() => {
		show_notebook = false;
	}}
	role="presentation"
>
	<div
		class="content"
		onclick={(e) => {
			e.stopPropagation();
		}}
		role="presentation"
	>
		<div class="write">
			<h2>How do you feel right now?</h2>
			<Input placeholder="Enter a note..." class="standard-shadow" />
			<p>Craving level</p>
			<div class="cravings">
				<Button green>Zero</Button>
				<Button>Light</Button>
				<Button>Medium</Button>
				<Button red>Strong</Button>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		position: fixed;
		inset: 0 auto auto 0;
		width: 100%;
		height: 100%;
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.content {
		background-color: var(--bg);
		padding: 16px;
		border-radius: 8px;
	}
	.cravings {
		display: flex;
	}
	h2 {
		font-weight: normal;
	}
</style>
