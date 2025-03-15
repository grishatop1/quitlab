<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { handleNow, handleDate }: { handleNow: () => void; handleDate: (date: Date) => void } =
		$props();

	let intervalID = 0;
	let displayDate = $state('');
	let datetimeInput = $state('');

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

	let isInputWrong = (): boolean => {
		let now = new Date();
		if (datetimeInput === '' || new Date(datetimeInput) > now) return true;
		return false;
	};
</script>

<h1 in:fade>Set up quitting date</h1>

<main in:fade>
	<p style="margin-bottom: 12px;">{displayDate}</p>
	<Button style="font-size: 1em; padding: 16px;" onclick={handleNow}>This exact time!</Button>

	<p style="margin: 12px;">or</p>
	<div class="already">
		<p>I'm already in</p>
		<input type="datetime-local" bind:value={datetimeInput} />
		<Button
			disabled={isInputWrong()}
			style="margin: 10px;"
			onclick={() => handleDate(new Date(datetimeInput))}>Select</Button
		>
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
		color: var(--text);
	}
	.already {
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80%;
		border-radius: 12px;
		padding: 5px;
	}
	.already * {
		margin: 5px;
	}
</style>
