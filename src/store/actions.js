import moment from 'moment';
import { INIT_CALENDAR } from './actions-types';
import { SET_CALENDAR } from './mutation-types';

export default {
	[INIT_CALENDAR]({ commit }) {
		const date = moment().startOf('month');
		while (date.day() !== 0)
			date.subtract(1, 'days');
		const calendar = [];
		for (let i = 0; i < 42; i++) {
			calendar.push({ date: date.format('YYYY-MM-DD') });
			date.add(1, 'days');
		}
		commit(SET_CALENDAR, calendar);
	}
};
