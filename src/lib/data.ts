export interface Habit {
	id: string;
	name: string;
	description: string;
	icon: string;
	additional?: string;
	moneyPage?: boolean;
}

export const habits: Habit[] = [
	{
		id: 'nicotine',
		name: 'Nicotine',
		description:
			'It drains your energy, ages your skin, and keeps you hooked on a cycle of cravings. Quitting gives you back control.',
		icon: 'cig',
		additional: 'including cigarettes, vapes and pouches',
		moneyPage: true
	},
	{
		id: 'weed',
		name: 'Weed',
		description:
			'Overuse can kill motivation, fog your mind, and make you dependent on escaping reality. Clarity feels better.',
		icon: 'weed',
		additional: 'including all THC products',
		moneyPage: true
	},
	{
		id: 'doomscrolling',
		name: 'Doomscrolling',
		description:
			'It wastes time, fuels anxiety, and traps you in a cycle of negativity. Your mind deserves better input.',
		icon: 'phone',
		additional: 'Shorts, Reels, Tiktoks, any feed'
	},
	{
		id: 'caffeine',
		name: 'Caffeine',
		description:
			'Dependence leads to energy crashes, anxiety, and poor sleep. Real energy comes from a healthy lifestyle, not a quick fix.',
		icon: 'coffee',
		additional: 'including coffee and energy drinks',
		moneyPage: true
	},
	{
		id: 'fap',
		name: 'Masturbation',
		description:
			'Excessive use can drain your drive, numb real-world experiences, and mess with dopamine balance. Real connection > fake pleasure.',
		icon: 'sex',
		additional: 'quit this as soon as possible'
	},
	{
		id: 'games',
		name: 'Video games',
		description:
			'Too much gaming can steal your time, hurt relationships, and disconnect you from real-life goals. Control the game—don’t let it control you.',
		icon: 'gamepad'
	}
];

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = WEEK * 4;
const YEAR = MONTH * 12;

export interface Milestone {
	time: number;
	text: string;
	supportive_text?: string;
}

export const milestones: Milestone[] = [
	{
		time: MINUTE * 15,
		text: '15 minutes milestone'
	},
	{
		time: HOUR,
		text: '1 hour milestone'
	},
	{
		time: DAY,
		text: '1 day milestone'
	},
	{
		time: WEEK,
		text: '1 week milestone',
		supportive_text: "you're doing amazing"
	},
	{
		time: WEEK * 2,
		text: '2 weeks milestone',
		supportive_text: "you're doing amazing"
	},
	{
		time: MONTH,
		text: '1 month milestone!',
		supportive_text: "you're doing an incredible job"
	},
	{
		time: MONTH * 3,
		text: '3 months milestone!',
		supportive_text: "don't give up at this point"
	},
	{
		time: YEAR,
		text: '1 year milestone!',
		supportive_text: 'legendary'
	}
];
