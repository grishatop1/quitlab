import type { Milestone } from './data';
import { milestones } from './data';

export const timeElapsed = (date: Date): string => {
	const now = new Date();
	// @ts-expect-error ...
	const diffInSeconds = Math.floor((now - date) / 1000);

	const seconds = diffInSeconds % 60;
	const minutes = Math.floor(diffInSeconds / 60) % 60;
	const hours = Math.floor(diffInSeconds / 3600) % 24;
	const days = Math.floor(diffInSeconds / 86400) % 30;
	const months = Math.floor(diffInSeconds / (86400 * 30)) % 12;
	const years = Math.floor(diffInSeconds / (86400 * 365));

	if (diffInSeconds < 60) {
		return `${seconds} second${seconds !== 1 ? 's' : ''}`;
	} else if (diffInSeconds < 3600) {
		return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`;
	} else if (diffInSeconds < 86400) {
		return `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
	} else if (diffInSeconds < 86400 * 30) {
		return `${days} day${days !== 1 ? 's' : ''} and ${hours} hour${hours !== 1 ? 's' : ''}`;
	} else if (diffInSeconds < 86400 * 365) {
		return `${months} month${months !== 1 ? 's' : ''} and ${days} day${days !== 1 ? 's' : ''}`;
	} else {
		return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
	}
};

export const calculateSpent = (sinceDate: Date, weeklySpending: number) => {
	const now = new Date();
	// @ts-expect-error ...
	const diffInWeeks = (now - sinceDate) / (1000 * 60 * 60 * 24 * 7);
	return (weeklySpending * diffInWeeks).toFixed(2);
};

export const getSecondsPassed = (date: Date): number => {
	return Math.abs((new Date().getTime() - date.getTime()) / 1000);
};

export const getMilestone = (secondsPassed: number): Milestone | undefined => {
	const futureMilestones = milestones.filter((milestone) => milestone.time > secondsPassed);
	if (futureMilestones.length === 0) {
		return undefined; // No future milestones exist
	}
	return futureMilestones[0];
};

export const getLastMilestone = (secondsPassed: number): Milestone => {
	const pastMilestones = milestones.filter((milestone) => milestone.time < secondsPassed);
	const lastMilestone = pastMilestones.pop();
	if (!lastMilestone) {
		return { time: 0, text: '' };
	} else {
		return lastMilestone;
	}
};

export const getCompletedMilestones = (secondsPassed: number): string => {
	const futureMilestones = milestones.filter((milestone) => milestone.time <= secondsPassed);
	return `${futureMilestones.length}/${milestones.length}`;
};

export const getPercentageString = (value: number, total: number): string => {
	return ((value / total) * 100).toFixed(2) + '%';
};

export const getQuitDate = (date: Date): string => {
	const dateStr = date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	const timeStr = date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	return `${dateStr} at ${timeStr}`;
};

export const generateTimerText = (note_date: Date, start_date: Date) => {
	const passed = new Date(+note_date - +start_date);
	const from_days = Math.floor(+passed / (1000 * 60 * 60 * 24));
	const from_hours = Math.floor((+passed / (1000 * 60 * 60)) % 24);
	const from_minutes = Math.floor((+passed / (1000 * 60)) % 60);
	let timer_text = '';
	if (from_days > 0) {
		timer_text = from_days + 'd ' + from_hours + 'h';
	} else if (from_hours > 0) {
		timer_text = from_hours + 'h ' + from_minutes + 'min';
	} else if (from_minutes > 0) {
		timer_text = from_minutes + ' minutes';
	} else {
		timer_text = 'the first minute';
	}
	return timer_text;
};
