import { computed } from 'vue';
import { useStore } from 'vuex';

export const useEvent = props => {
	const store = useStore();

	const getWeatherIconUrl = icon => `http://openweathermap.org/img/wn/${icon}@2x.png`;

	const bgClassColor = computed(() => `bg-${props.event.color}-7`);

	const weather = computed(() => store.state.weathers[props.event.city.id]);

	return {
		weather,
		bgClassColor,
		getWeatherIconUrl
	};
};
