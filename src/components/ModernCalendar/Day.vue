<template>
	<div class="day" :class="{ 'today': isToday, 'another-month': isFromAnotherMonth }">
		<div class="q-pa-sm">
			<div class="row items-center justify-between">
				<div class="poppins">
					{{ formatDate(date, 'DD') }}
				</div>
				<q-btn flat icon="fas fa-plus" size="sm" round @click="crudEvent(null)" />
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useDay } from 'composable/day';
import { useCalendar } from 'composable/calendar';

export default defineComponent({
	name: 'Day',
	props: {
		date: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const { isToday, isFromAnotherMonth } = useDay(props.date);
		const { crudEvent, formatDate } = useCalendar(props.date);

		return {
			isToday,
			crudEvent,
			formatDate,
			isFromAnotherMonth
		};
	}
});
</script>

<style lang="scss" scoped>
.day {
	min-height: 100px;

	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 2px;
		background: $grey-7;
	}

	&.another-month {
		.poppins, .q-btn {
			color: $grey-4;
		}

		&::before {
			background: $grey-4;
		}
	}

	&.today {
		background: $grey-3;

		.poppins, .q-btn {
			color: $primary
		}

		&::before {
			background: $primary;
		}
	}

	.poppins {
		font-size: 1.5rem;
	}

	.q-btn {
		opacity: 0;
		transform: translateX(50%);
		transition: all 300ms ease-in-out;
	}

	&:hover {
		.q-btn {
			opacity: 1;
			transform: translateX(25%);
		}
	}
}
</style>
