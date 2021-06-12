import moment from 'moment';
import { v4 } from 'uuid';

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

export const CRUD_EVENT = (state, { eventId, date }) => {
	state.selectedDate = date;
	if (eventId)
		state.selectedEventId = eventId;
};

export const SAVE_EVENT = (state, event) => {
	if (!state.events[event.date])
		state.events[event.date] = { items: [] };
	if (event.id) {
		const i = state.events[event.date].items.findIndex(item => item.id === event.id);
		if (i !== -1)
			state.events[event.date].items.splice(i, 1, event);
	} else
		state.events[event.date].items.push({ ...event, id: v4() });
	state.events[event.date].items.sort((a, b) => a.time.localeCompare(b.time));
};

export const DELETE_EVENT = (state, event) => {
	const events = state.events[event.date];
	if (events && events.items) {
		const i = events.items.findIndex(item => item.id === event.id);
		if (i !== -1)
			events.items.splice(i, 1);
	}
};
