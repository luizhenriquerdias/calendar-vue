<template>
	<div class="container" :class="containerClass">
		<div class="day text-bold" :class="dayNumClass">
			{{ formatDate(date, 'DD') }}
		</div>
		<q-btn flat icon="fas fa-plus" round size="xs" @click="crudEvent(null)" />
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
		const crudEvent = eventId => {
			store.commit('CRUD_EVENT', { eventId, date: props.date });
		};
		return {
			crudEvent,
			formatDate,
			dayNumClass,
			containerClass
		};
	}
});
</script>

<style lang="scss" scoped>
.container {
	height: 100%;
	padding: 4px;
	position: relative;

	.day {
		font-size: 0.75rem;
	}

	.q-btn {
		position: absolute;
		bottom: 4px;
		right: 4px;
		opacity: 0;
		transform: translateX(50%);
		transition: all 300ms ease-in-out;
	}

	&:hover {
		.q-btn {
			opacity: 1;
			transform: translateX(0%);
		}
	}
}
</style>
