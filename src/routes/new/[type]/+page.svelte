<script lang="ts">
	import { page } from '$app/state';
	import { db } from '$lib/db';
	import { habits, type Habit } from '$lib/data';
	import { loadingState } from '$lib/states.svelte';
	import HabitIcons from '$lib/icons/HabitIcons.svelte';
	import DateSelector from '$lib/components/DateSelector.svelte';
	import MoneySelector from '$lib/components/MoneySelector.svelte';
	import Button from '$lib/components/Button.svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let habit = habits.find((obj) => obj.id === page.params.type) as Habit;
	let current_page: 'date' | 'money' | 'final' = $state('date');

	let date_choosen: Date;
	let money_amount: number;

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

	let accept = async () => {
		loadingState.loading = true;
		await db.habits.add({
			habit_id: habit.id,
			date_started: date_choosen.toString(),
			money_per_week: habit.moneyPage ? money_amount : 0
		});
		setTimeout(async () => {
			await goto('/');
			loadingState.loading = false;
		}, 1500);
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
				date_choosen = new Date();
				if (habit.moneyPage) {
					current_page = 'money';
				} else {
					current_page = 'final';
				}
			}}
			handleDate={(d) => {
				date_choosen = d;
				if (habit.moneyPage) {
					current_page = 'money';
				} else {
					current_page = 'final';
				}
			}}
		/>
	{:else if current_page === 'money'}
		<MoneySelector
			onSelect={(amount) => {
				money_amount = amount;
				current_page = 'final';
			}}
		/>
	{:else}
		<div class="final" in:fade>
			<h2>
				I acknowledge that breaking this habit won’t be easy, but I am ready for the challenge.
			</h2>
			<Button
				style="margin: 10px;"
				big
				onclick={() => {
					accept();
				}}>Accept</Button
			>
			<Button
				style="margin: 10px;"
				onclick={() => {
					goto('/');
				}}>I'm not ready yet, will think</Button
			>
		</div>
	{/if}
</div>

{#if current_page !== 'final'}
	<div class="back" transition:fly={{ y: 100 }}>
		<Button onclick={goBack}>
			{#if current_page === 'money'}
				&lt; Go back
			{:else}
				&lt; Go home
			{/if}
		</Button>
	</div>
{/if}

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
	.final {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.final h2 {
		text-align: center;
		font-weight: normal;
		margin: 12px;
	}
</style>
