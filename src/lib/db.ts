import Dexie, { Entity, type EntityTable } from 'dexie';

interface Status {
	username: string;
	passedTutorial: boolean;
}

interface HabitEntry {
	id: number;
	habit_id: string;
	date_started: string;
}

const db = new Dexie('quitlab') as Dexie & {
	status: EntityTable<Status>;
	habits: EntityTable<HabitEntry, 'id'>;
};

db.version(1).stores({
	status: 'username, passedTutorial',
	habits: '++id, habit_id, date_started'
});

export { db };
