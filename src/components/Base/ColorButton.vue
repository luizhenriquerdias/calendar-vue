<template>
	<div class="button-container flex flex-center pointer" :class="`bg-${color}-4`" :style="`width: ${size}; height: ${size};`"
		@click="onClick">
		<q-icon v-if="selected" name="fas fa-check" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ColorButton',
	props: {
		color: {
			type: String,
			required: true
		},
		selected: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: '32px'
		}
	},
	setup(props, { emit }) {
		const onClick = () => {
			emit('input', props.color);
		};
		return {
			onClick
		};
	}
});
</script>

<style lang="scss" scoped>
.button-container {
	margin-right: 8px;
	border-radius: 50%;

	&:hover {
		box-shadow: 0 0 5px grey;
	}
}
</style>
