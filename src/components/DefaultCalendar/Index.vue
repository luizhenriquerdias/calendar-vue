<template>
	<div class="calendar">
		<div v-for="date in store.state.calendar.slice(0, 7)" :key="date" class="bg-primary font-bold text-white text-center">
			{{ formatDate(date, 'dddd') }}
		</div>
		<div v-for="date in store.state.calendar" :key="date" class="day">
			<Day :date="date" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { formatDate } from 'util/date';
import Day from './Day.vue';

export default defineComponent({
	name: 'DefaultCalendar',
	components: { Day },
	setup() {
		const store = useStore();
		return {
			store,
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
	max-width: 50vw;

	.day {
		margin: calc(#{$gap} / 2);
		min-height: 80px;
		min-width: 150px;
	}
}
</style>
