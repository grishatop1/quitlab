<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let intervalID = 0;
	let displayDate = $state('');

	onMount(() => {
		displayDate = getPrettyDate();
		intervalID = setInterval(() => {
			displayDate = getPrettyDate();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalID);
	});

	let getPrettyDate = () => {
		const now = new Date();
		let hours = now.getHours();
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12 || 12; // Convert to 12-hour format
		const formattedDate = now.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});

		return `It's ${hours}:${minutes}${ampm} - ${formattedDate}`;
	};
</script>

<h1>Set up quitting date</h1>

<main in:fade>
	<Button style="font-size: 1em; padding: 16px; margin-bottom: 12px;">This exact time!</Button>
	<p>{displayDate}</p>
	<p style="margin: 20px;">or</p>
	<div class="already">
		<p>I'm already in</p>
		<input type="datetime-local" />
		<Button disabled style="margin: 10px;">Select</Button>
	</div>
</main>

<style>
	h1 {
		font-weight: normal;
		text-align: center;
		margin-bottom: 12px;
	}
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	input {
		padding: 10px;
		border: none;
		background-color: white;
		border-radius: 6px;
		color: white;
	}
	.already {
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80%;
		border-radius: 12px;
	}
	.already * {
		margin: 10px;
	}
</style>
