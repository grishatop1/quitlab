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
}

export enum Craving {
	Zero,
	Light,
	Medium,
	Strong
}

interface Note {
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

db.version(1).stores({
	status: 'username, passedTutorial',
	habits: '++id, &habit_id, date_started, money_per_week',
	notes: '++id, entry_id, date, text, craving'
});

export type { HabitEntry };
export { db };
