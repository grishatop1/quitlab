import type { LayoutLoad } from './$types';
import { db } from '$lib/db';
import { goto } from '$app/navigation';
import { loadingState } from '$lib/states.svelte';

export const ssr = false;

export const load: LayoutLoad = async ({ url }) => {
	const status = await db.status.toArray();
	const entries = await db.habits.toCollection().sortBy('position');

	if (status.length === 0 && url.pathname !== '/start') {
		await goto('/start');
	}

	setTimeout(() => {
		loadingState.loading = false;
	}, 700);

	return {
		status: status,
		entries: entries
	};
};
