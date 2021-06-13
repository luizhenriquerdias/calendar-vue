import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatDate } from 'util/date';

export const useCalendar = date => {
	const store = useStore();

	const changeMonth = num => {
		store.dispatch('CHANGE_MONTH', num);
	};

	const crudEvent = eventId => {
		store.commit('CRUD_EVENT', { eventId, date });
	};

	const currentMonth = computed(() => store.state.currentMonth);

	const calendar = computed(() => store.state.calendar);

	return {
		calendar,
		crudEvent,
		formatDate,
		changeMonth,
		currentMonth
	};
};
