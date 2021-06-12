import { getWeatherByCityId } from 'src/api';

export const INIT_CALENDAR = ({ commit }) => {
	commit('SET_CALENDAR');
};

export const CHANGE_MONTH = ({ commit }, num) => {
	commit('UPDATE_MONTH', num);
};

export const SET_EVENT = ({ commit, state }, event) => {
	commit('SAVE_EVENT', event);
	if (!state.weathers[event.city.id]) {
		getWeatherByCityId(event.city.id)
			.then(({ weather }) => {
				commit('SAVE_WEATHER', { event, weather: weather[0] });
				state.weathers[event.city.id] = weather[0];
			});
	}
};
