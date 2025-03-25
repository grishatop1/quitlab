import type { Milestone } from './data';
import { milestones } from './data';

export const timeElapsed = (date: Date) => {
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
	return futureMilestones.reduce((closest, current) => {
		return current.time < closest.time ? current : closest;
	});
};

export const getCompletedMilestones = (secondsPassed: number): string => {
	const futureMilestones = milestones.filter((milestone) => milestone.time <= secondsPassed);
	return `${futureMilestones.length}/${milestones.length}`;
};

export const getPercentageString = (value: number, total: number): string => {
	return ((value / total) * 100).toFixed(2) + '%';
};

export const getQuitDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
	const formattedDate = date.toLocaleDateString('en-GB', options); // "17 Feb 2025"

	const day = date.getDate();
	const suffix = getOrdinalSuffix(day);

	const formattedTime = date.toTimeString().slice(0, 5); // "22:10" (24-hour format)

	return `${day}${suffix} ${formattedDate.slice(3)} at ${formattedTime}`;
};

const getOrdinalSuffix = (day: number): string => {
	if (day > 3 && day < 21) return 'th'; // Covers 4-20th
	switch (day % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
