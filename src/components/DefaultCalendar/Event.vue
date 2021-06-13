<template>
	<div class="row event-container pointer" :class="event.allDay && bgClassColor">
		<div v-if="!event.allDay" class="col-auto row items-center q-mr-xs">
			<div class="badge" :class="bgClassColor" />
		</div>
		<span class="col reminder poppins row items-center" :class="event.allDay && 'text-white'">
			{{ !event.allDay ? `${event.time} - ` : ''}}{{ event.reminder }}
		</span>
		<div class="col-auto row items-center">
			<img v-if="weather" :src="getWeatherIconUrl(weather.icon)" />
		</div>
		<Tooltip v-if="weather" :cityName="event.city.name" :weatherDescription="weather.description" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useEvent } from 'composable/event';
import Tooltip from 'components/Base/Tooltip.vue';

export default defineComponent({
	name: 'Event',
	components: { Tooltip },
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const { bgClassColor, getWeatherIconUrl, weather } = useEvent(props);
		return {
			weather,
			bgClassColor,
			getWeatherIconUrl
		};
	}
});
</script>

<style lang="scss" scoped>
.event-container {
	border-radius: 4px;
	padding: 2px;

	.badge {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.reminder {
		font-size: 0.8rem;
	}

	img {
		width: 24px;
		height: 24px;
	}
}
</style>
