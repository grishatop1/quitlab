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

const db = new Dexie('quitlab') as Dexie & {
	status: EntityTable<Status>;
	habits: EntityTable<HabitEntry, 'id'>;
};

db.version(1).stores({
	status: 'username, passedTutorial',
	habits: '++id, &habit_id, date_started, money_per_week'
});

export { db };
