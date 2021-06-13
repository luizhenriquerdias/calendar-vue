import { formatDate, isWeekend } from 'src/util/date';
import { computed } from 'vue';
import { useStore } from 'vuex';

export const useDay = date => {
	const store = useStore();

	const isToday = computed(() => formatDate(date, 'YYYY-MM-DD') === formatDate(null, 'YYYY-MM-DD'));

	const isFromAnotherMonth = computed(() => formatDate(date, 'MM') !== formatDate(store.state.currentMonth, 'MM'));

	const dayNumClass = computed(() => {
		if (isFromAnotherMonth.value)
			return 'text-grey-6';
		if (isWeekend(date))
			return 'text-primary';
		return null;
	});

	const containerClass = computed(() => {
		if (isToday.value)
			return 'bg-orange-3';
		if (isWeekend(date))
			return 'bg-grey-5';
		return 'bg-white';
	});

	const events = computed(() => store.state.events[date] || []);

	return {
		events,
		isToday,
		dayNumClass,
		containerClass
	};
};
