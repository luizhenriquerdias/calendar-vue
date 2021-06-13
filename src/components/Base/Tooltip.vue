<template>
	<q-tooltip>
		<div>
			{{ cityName }}
		</div>
		<div>
			Weather: {{ weatherDescription }}
		</div>
	</q-tooltip>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Tooltip',
	props: {
		cityName: {
			type: String,
			required: true
		},
		weatherDescription: {
			type: String,
			required: true
		}
	}
});
</script>

<style lang="scss" scoped>

</style>
