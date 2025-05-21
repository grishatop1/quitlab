import Dexie, { type EntityTable } from 'dexie';

interface Status {
	username: string;
	passedTutorial: boolean;
}

interface HabitEntry {
	id: number;
	habit_id: string;
	date_started: string;
	money_per_week: number;
	hidden: boolean;
	position: number;
}

export enum Craving {
	Zero,
	Light,
	Medium,
	Strong
}

export interface Note {
	id: number;
	entry_id: number;
	date: Date;
	text: string;
	craving: Craving;
}

const db = new Dexie('quitlab') as Dexie & {
	status: EntityTable<Status>;
	habits: EntityTable<HabitEntry, 'id'>;
	notes: EntityTable<Note, 'id'>;
};

db.version(3)
	.stores({
		status: 'username, passedTutorial',
		habits: '++id, &habit_id, date_started, money_per_week, hidden, position',
		notes: '++id, entry_id, date, text, craving'
	})
	.upgrade(async (t) => {
		await t
			.table('habits')
			.toCollection()
			.modify((entry) => {
				entry.position = 0;
			});
	});

export type { HabitEntry };
export { db };
