<template>
	<div class="calendar">
		<div v-for="date in calendar.slice(0, 7)" :key="date" class="bg-primary font-bold text-white text-center">
			{{ formatDate(date, 'dddd') }}
		</div>
		<div v-for="date in calendar" :key="date" class="day">
			<Day :date="date" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCalendar } from 'composable/calendar';
import Day from './Day.vue';

export default defineComponent({
	name: 'DefaultCalendar',
	components: { Day },
	setup() {
		const { calendar, formatDate } = useCalendar();
		return {
			calendar,
			formatDate
		};
	}
});
</script>

<style lang="scss" scoped>
$gap: 1px;

.calendar {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	padding: $gap;
	background: #333;

	.day {
		margin: calc(#{$gap} / 2);
		min-height: 70px;
		min-width: 140px;
	}
}
</style>
