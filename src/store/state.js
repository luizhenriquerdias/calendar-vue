import moment from 'moment';

export default function () {
	return {
		selectedDate: null,
		selectedEventId: null,
		currentMonth: moment().format('YYYY-MM-DD'),
		calendar: [],
		events: {}
	};
}
