import moment from 'moment';

export default function () {
	return {
		currentMonth: moment().format('YYYY-MM-DD'),
		calendar: []
	};
}
