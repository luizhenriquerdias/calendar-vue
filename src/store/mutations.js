import { SET_CALENDAR } from './mutation-types';

export default {
	[SET_CALENDAR](state, calendar) {
		state.calendar = calendar;
	}
};
