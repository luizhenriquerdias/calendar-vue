import moment from 'moment';

export const SET_CALENDAR = state => {
	const date = moment(state.currentMonth).startOf('month');
	while (date.day() !== 0)
		date.subtract(1, 'days');
	const calendar = [];
	for (let i = 0; i < 42; i++) {
		calendar.push(date.format('YYYY-MM-DD'));
		date.add(1, 'days');
	}
	state.calendar = calendar;
};

export const UPDATE_MONTH = (state, num) => {
	state.currentMonth = moment(state.currentMonth).add(num, 'months').format('YYYY-MM-DD');
	SET_CALENDAR(state);
};
