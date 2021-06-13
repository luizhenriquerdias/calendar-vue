<template>
	<div class="flex flex-center icon-container">
		<img :src="src" :style="`height: ${size}; width: ${size}`" />
	</div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'Icon',
	props: {
		icon: {
			type: String,
			required: true
		},
		size: {
			type: String,
			default: '24px'
		}
	},
	setup(props) {
		const src = computed(() => `http://openweathermap.org/img/wn/${props.icon}@2x.png`);

		return {
			src
		};
	}
});
</script>

<style lang="scss" scoped>
.icon-container {
	background: white;
	border-radius: 50%;
}
</style>
