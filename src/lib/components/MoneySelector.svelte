<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let user_input = $state(null);

	let isValid = (): boolean => {
		if (!user_input || user_input < 0) return false;
		return true;
	};
</script>

<main in:fade>
	<h2>On average, how much do you spend on this habit per week?</h2>
	<div class="btns">
		<Button>About 5$</Button>
		<Button>About 10$</Button>
		<Button>About 15$</Button>
		<Button>About 20$</Button>
		<Button>About 30$</Button>
		<Button>About 50$</Button>
	</div>
	<p style="margin: 12px; text-align: center;">or</p>
	<div class="custom" style="margin-bottom: 12px;">
		<Input placeholder="Enter your approximation..." type="number" bind:value={user_input} />
		<span>$</span>
	</div>
	<Button disabled={!isValid()}>Proceed</Button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	h2 {
		font-weight: normal;
		margin: 12px;
		text-align: center;
	}
	.btns {
		margin: 0px 12px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 6px;
	}
</style>
