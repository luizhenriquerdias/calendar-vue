<template>
	<div class="calendar">
		<div v-for="date in calendar.slice(0, 7)" :key="date" class="header">
			<div class="title text-bold" :class="{ 'text-primary': isSameWeekDay(date) }">{{ formatDate(date, 'ddd') }}</div>
		</div>
		<Day v-for="date in calendar" :key="date" :date="date" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCalendar } from 'composable/calendar';
import Day from './Day.vue';

export default defineComponent({
	name: 'ModernCalendar',
	components: { Day },
	setup() {
		const { calendar, formatDate } = useCalendar();
		const isSameWeekDay = date => formatDate(date, 'd') === formatDate(null, 'd');

		return {
			calendar,
			formatDate,
			isSameWeekDay
		};
	}
});
</script>

<style lang="scss" scoped>
.calendar {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 1rem;

	.header {
		.title {
			font-size: 1.5rem;
		}
	}
}
</style>
