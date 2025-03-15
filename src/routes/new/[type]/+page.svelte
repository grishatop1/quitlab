<script lang="ts">
	import { page } from '$app/state';
	import { habits, type Habit } from '$lib/data';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import DateSelector from '$lib/components/DateSelector.svelte';
	import MoneySelector from '$lib/components/MoneySelector.svelte';
	import Button from '$lib/components/Button.svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let habit = habits.find((obj) => obj.id === page.params.type) as Habit;
	let current_page = $state('date'); // date, money, final

	let dateChoosen: Date;

	let goBack = () => {
		if (current_page === 'final') {
			if (habit.moneyPage) {
				current_page = 'money';
			} else {
				current_page = 'date';
			}
		} else if (current_page === 'money') {
			current_page = 'date';
		} else {
			goto('/');
		}
	};
</script>

<header in:fly={{ y: -50 }}>
	<div class="top">
		<HabitIcons icon={habit.icon} />
		<h1>
			{habit.name}
		</h1>
	</div>
	{#if habit.additional}
		<p>{habit.additional}</p>
	{/if}
</header>

<div in:fade>
	{#if current_page === 'date'}
		<DateSelector
			handleNow={() => {
				dateChoosen = new Date();
				if (habit.moneyPage) {
					current_page = 'money';
				} else {
					current_page = 'final';
				}
			}}
			handleDate={(d) => {
				dateChoosen = d;
				if (habit.moneyPage) {
					current_page = 'money';
				} else {
					current_page = 'final';
				}
			}}
		/>
	{:else if current_page === 'money'}
		<MoneySelector />
	{:else}
		Final
	{/if}
</div>

<div class="back">
	<Button onclick={goBack}>
		{#if current_page === 'money' || current_page === 'final'}
			&lt; Go back
		{:else}
			&lt; Go home
		{/if}
	</Button>
</div>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 40px 15px;
	}

	header .top {
		display: flex;
		align-items: center;
	}

	header .top h1 {
		margin-left: 5px;
	}

	.back {
		position: absolute;
		bottom: 16px;
		right: 16px;
	}
</style>
