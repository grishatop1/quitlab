export interface Habit {
	id: string;
	name: string;
	description: string;
	icon: string;
	additional?: string;
}

export const habits: Habit[] = [
	{
		id: 'nicotine',
		name: 'Nicotine',
		description:
			'It drains your energy, ages your skin, and keeps you hooked on a cycle of cravings. Quitting gives you back control.',
		icon: 'cig',
		additional: 'including cigarettes, vapes and pouches'
	},
	{
		id: 'weed',
		name: 'Weed',
		description:
			'Overuse can kill motivation, fog your mind, and make you dependent on escaping reality. Clarity feels better.',
		icon: 'weed',
		additional: 'including all THC products'
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
		additional: 'including coffee and energy drinks'
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
		icon: 'gamepad'
	}
];
