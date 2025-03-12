import Dexie, { type EntityTable } from 'dexie';

interface Status {
	username: string;
	passedTutorial: boolean;
}

const db = new Dexie('quitlab') as Dexie & {
	status: EntityTable<Status>;
};

db.version(1).stores({
	status: 'username, passedTutorial' // primary key "id" (for the runtime!)
});

export { db };
