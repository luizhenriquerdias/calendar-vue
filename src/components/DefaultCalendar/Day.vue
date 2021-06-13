<template>
	<div class="container" :class="containerClass">
		<div class="day text-bold" :class="dayNumClass">
			{{ formatDate(date, 'DD') }}
		</div>
		<div class="q-pb-lg">
			<Event v-for="event in events" :key="event.id" :event="event" @click="crudEvent(event.id)" />
		</div>
		<div class="btn-container">
			<ActionButtons :show-destroy="events.length > 0" size="xs" @crud="crudEvent(null)" @destroy="destroyAll" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCalendar } from 'composable/calendar';
import { useDay } from 'composable/day';
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
		const { dayNumClass, containerClass, events } = useDay(props.date);
		const { crudEvent, formatDate, destroyAll } = useCalendar(props.date);

		return {
			events,
			crudEvent,
			formatDate,
			destroyAll,
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
	max-width: 150px;

	.day {
		font-size: 0.75rem;
	}

	.btn-container {
		position: absolute;
		bottom: 4px;
		right: 4px;
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
