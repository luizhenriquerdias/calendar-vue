<template>
	<div class="container" :class="containerClass">
		<div class="day text-bold" :class="dayNumClass">
			{{ formatDate(date, 'DD') }}
		</div>
	</div>
</template>

<script>
import { formatDate, isWeekend } from 'src/util/date';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: 'Day',
	props: {
		date: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const weekend = computed(() => isWeekend(props.date));
		const store = useStore();
		const dayNumClass = computed(() => {
			if (formatDate(props.date, 'MM') !== formatDate(store.state.currentMonth, 'MM'))
				return 'text-grey-6';
			if (isWeekend(props.date))
				return 'text-primary';
			return null;
		});
		const containerClass = computed(() => {
			if (formatDate(props.date, 'YYYY-MM-DD') === formatDate(null, 'YYYY-MM-DD'))
				return 'bg-orange-3';
			if (isWeekend(props.date))
				return 'bg-grey-5';
			return 'bg-white';
		});
		return {
			formatDate,
			dayNumClass,
			containerClass,
			weekend
		};
	}
});
</script>

<style lang="scss" scoped>
.container {
	height: 100%;
	padding: 4px;

	.day {
		font-size: 0.75rem;
	}
}
</style>
