export interface Habit {
	id: string;
	name: string;
	description: string;
	icon: string;
	additional?: string;
	moneyPage?: boolean;
	timePage?: boolean;
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
		id: 'gambling',
		name: 'Gambling',
		description:
			'The thrill is temporary, but the losses—money, time, and peace of mind—add up fast. Real wins come from walking away.',
		icon: 'dice'
	},
	{
		id: 'alcohol',
		name: 'Alcohol',
		description:
			'It clouds your judgment, drains your energy, and tricks you into thinking you need it to relax. A clear mind feels better than any buzz.',
		icon: 'beer',
		moneyPage: true
	},
	{
		id: 'weed',
		name: 'Cannabis',
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
		additional: 'Shorts, Reels, Tiktoks, any feed',
		timePage: true
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
		icon: 'sex'
	},
	{
		id: 'games',
		name: 'Video games',
		description:
			'Too much gaming can steal your time, hurt relationships, and disconnect you from real-life goals. Control the game—don’t let it control you.',
		icon: 'gamepad',
		timePage: true
	}
];

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30.44; // Average month length (365.25 / 12)
const YEAR = DAY * 365.25; // Accounts for leap years on average

export interface Milestone {
	time: number;
	text: string;
	supportive_text?: string;
}

export const milestones: Milestone[] = [
	{ time: MINUTE * 1, text: '1 minute milestone', supportive_text: 'every moment counts' },
	{
		time: MINUTE * 5,
		text: '5 minutes milestone',
		supportive_text: 'small wins lead to big victories'
	},
	{
		time: MINUTE * 10,
		text: '10 minutes milestone',
		supportive_text: 'keep going'
	},
	{ time: MINUTE * 15, text: '15 minutes milestone', supportive_text: 'keep going, you got this' },
	{
		time: MINUTE * 30,
		text: '30 minutes milestone',
		supportive_text: 'every step forward is a success'
	},
	{ time: HOUR, text: '1 hour milestone', supportive_text: 'almost an hour of strength—awesome' },
	{
		time: HOUR * 3,
		text: '3 hours milestone',
		supportive_text: "you're building momentum, stay strong"
	},
	{
		time: HOUR * 6,
		text: '6 hours milestone',
		supportive_text: 'nearing half a day of progress'
	},
	{
		time: HOUR * 12,
		text: '12 hours milestone',
		supportive_text: 'you’re already making a difference'
	},
	{ time: DAY, text: '1 day milestone', supportive_text: 'almost one full day—a huge achievement' },
	{
		time: DAY * 2,
		text: '2 days milestone',
		supportive_text: 'keep it up, you’re doing fantastic'
	},
	{
		time: DAY * 3,
		text: '3 days milestone',
		supportive_text: 'nearing three days of strength 💪'
	},
	{ time: DAY * 5, text: '5 days milestone', supportive_text: 'make it to 5 days' },
	{ time: WEEK, text: '1 week milestone', supportive_text: 'almost a week, keep pushing' },
	{ time: DAY * 10, text: '10 days milestone', supportive_text: 'you’re incredible' },
	{
		time: WEEK * 2,
		text: '2 weeks milestone',
		supportive_text: 'you’re proving your strength already'
	},
	{ time: DAY * 20, text: '20 days milestone', supportive_text: 'three weeks is within reach' },
	{
		time: DAY * 25,
		text: '25 days milestone',
		supportive_text: 'almost a full month, amazing progress'
	},
	{ time: DAY * 27, text: '27 days milestone', supportive_text: 'keep pushing, you’re so close' },
	{ time: DAY * 29, text: '29 days milestone', supportive_text: 'one more step to a whole month' },
	{ time: MONTH, text: '1 month milestone', supportive_text: "you're doing an incredible job" },
	{ time: DAY * 35, text: '5 weeks milestone', supportive_text: 'beyond one month, unstoppable' },
	{
		time: DAY * 40,
		text: '40 days milestone',
		supportive_text: 'strength and consistency, well done'
	},
	{
		time: DAY * 45,
		text: '1.5 months milestone',
		supportive_text: 'you’re setting an amazing example'
	},
	{
		time: DAY * 50,
		text: '50 days milestone',
		supportive_text: 'phenomenal job, keep going'
	},
	{ time: DAY * 55, text: '55 days milestone', supportive_text: 'consistency is key, keep going' },
	{ time: MONTH * 2, text: '2 months milestone', supportive_text: 'your dedication is inspiring' },
	{ time: MONTH * 3, text: '3 months milestone', supportive_text: "don't give up at this point" },
	{
		time: MONTH * 4,
		text: '4 months milestone',
		supportive_text: 'your perseverance is remarkable'
	},
	{ time: MONTH * 5, text: '5 months milestone', supportive_text: 'keep crushing it' },
	{ time: MONTH * 6, text: '6 months milestone', supportive_text: 'nearly half a year, wow' },
	{ time: MONTH * 9, text: '9 months milestone', supportive_text: 'legendary' },
	{ time: YEAR, text: '1 year milestone', supportive_text: 'almost at the one-year mark' },
	{ time: YEAR * 2, text: '2 years milestone', supportive_text: "you're rewriting your future" },
	{ time: YEAR * 3, text: '3 years milestone', supportive_text: 'an inspiration to others' },
	{ time: YEAR * 5, text: '5 years milestone', supportive_text: 'you’ve made it a lifestyle' },
	{ time: YEAR * 10, text: '10 years milestone', supportive_text: 'making a decade of greatness' }
];
