<template>
	<div class="day" :class="{ 'today': isToday, 'another-month': isFromAnotherMonth }">
		<div class="q-pa-sm">
			<div class="row items-center justify-between">
				<div class="poppins">
					{{ formatDate(date, 'DD') }}
				</div>
				<div class="btn-container">
					<ActionButtons @crud="crudEvent(null)" @destroy="destroyAll" />
				</div>
			</div>
			<Event v-for="event in events" :key="event.id" :event="event" @click="crudEvent(event.id)" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useDay } from 'composable/day';
import { useCalendar } from 'composable/calendar';
import ActionButtons from 'components/ActionsButtons.vue';
import Event from './Event.vue';

export default defineComponent({
	name: 'Day',
	components: { Event, ActionButtons },
	props: {
		date: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const { isToday, isFromAnotherMonth, events } = useDay(props.date);
		const { crudEvent, formatDate, destroyAll } = useCalendar(props.date);

		return {
			events,
			isToday,
			crudEvent,
			formatDate,
			destroyAll,
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

	.btn-container {
		opacity: 0;
		transform: translateX(50%);
		transition: all 300ms ease-in-out;
	}

	&:hover {
		.btn-container {
			opacity: 1;
			transform: translateX(0%);
		}
	}
}
</style>
