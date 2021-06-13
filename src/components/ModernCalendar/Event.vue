<template>
	<div class="row items-center event-container q-px-sm q-mb-xs pointer" :class="event.allDay && bgClassColor">
		<span v-if="!event.allDay" class="col-auto q-pr-sm text-bold" :class="`text-${event.color}`">{{ event.time }}</span>
		<span class="col text-bold" :class="event.allDay && 'text-white'">{{event.reminder}}</span>
		<Icon class="col-auto" v-if="weather" :icon="weather.icon" />
		<Tooltip v-if="weather" :cityName="event.city.name" :weatherDescription="weather.description" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { useEvent } from 'composable/event';
import Icon from 'components/Base/Icon.vue';
import Tooltip from 'components/Base/Tooltip.vue';

export default defineComponent({
	name: 'Event',
	components: { Icon, Tooltip },
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
	border-radius: 8px;
}
</style>
