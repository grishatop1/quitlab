export const loadingState = $state({
	loading: true
});

export const dialogState = $state({
	show: false,
	text: 'Dialog text, and question. And what if text is huge?',
	yes: 'Yes',
	no: 'No',
	callback: () => {}
});
