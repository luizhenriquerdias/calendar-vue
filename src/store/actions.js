export const INIT_CALENDAR = ({ commit }) => {
	commit('SET_CALENDAR');
};

export const CHANGE_MONTH = ({ commit }, num) => {
	commit('UPDATE_MONTH', num);
};
