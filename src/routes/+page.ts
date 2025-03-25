import type { PageLoad } from './$types';
import { db } from '$lib/db';
import { goto } from '$app/navigation';

export const load: PageLoad = async () => {
	const status = await db.status.toArray();
	const entries = await db.habits.toArray();
	if (!status[0]) {
		goto('/start');
	}

	return {
		status: status,
		entries: entries
	};
};
