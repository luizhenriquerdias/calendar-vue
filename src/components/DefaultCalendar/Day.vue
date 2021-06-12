<template>
	<div class="container" :class="weekend ? 'bg-grey-5' : 'bg-white'">
		<div class="day text-bold" :class="dayNumClass">
			{{ formatDate(date, 'DD') }}
		</div>
	</div>
</template>

<script>
import moment from 'moment';
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
			const date = moment(props.date);
			if (formatDate(date, 'MM') !== formatDate(store.state.currentMonth, 'MM'))
				return 'text-grey-6';
			if (isWeekend(date))
				return 'text-primary';
			return null;
		});
		return {
			formatDate,
			dayNumClass,
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
