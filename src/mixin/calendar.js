export const changeMonth = (store, num) => {
	store.dispatch('CHANGE_MONTH', num);
};

export const crudEvent = (store, eventId, date) => {
	store.commit('CRUD_EVENT', { eventId, date });
};
