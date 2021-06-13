<template>
	<div class="row event-container pointer" :class="event.allDay && getBGClassColor(event.color)">
		<div v-if="!event.allDay" class="col-auto row items-center q-mr-xs">
			<div class="badge" :class="getBGClassColor(event.color)" />
		</div>
		<span class="col reminder poppins row items-center" :class="event.allDay && 'text-white'">
			{{ !event.allDay ? `${event.time} - ` : ''}}{{ event.reminder }}
		</span>
		<div class="col-auto row items-center">
			<img v-if="weather" :src="getWeatherIconUrl(weather.icon)" />
		</div>
		<q-tooltip v-if="weather">
			<div>
				{{ event.city.name }}
			</div>
			<div>
				Weather: {{ weather.description }}
			</div>
		</q-tooltip>
	</div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { getBGClassColor, getWeatherIconUrl } from 'util/functions';
import { useStore } from 'vuex';

export default defineComponent({
	name: 'Event',
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const store = useStore();
		const weather = computed(() => store.state.weathers[props.event.city.id]);
		return {
			weather,
			getBGClassColor,
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
