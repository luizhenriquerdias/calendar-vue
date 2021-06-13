<template>
	<div class="dialog bg-white q-pa-md">
		<div class="row items-center justify-between">
			<h2>{{ title }}</h2>
			<q-btn flat round icon="fas fa-times" color="grey-7" size="sm"
				@click="emit('close')" />
		</div>
		<div class="q-my-md">
			<slot />
		</div>
		<div class="row">
			<q-btn v-if="deletable" label="Delete" color="negative" flat :loading="destroying"
				@click="emit('destroy')" />
			<q-space />
			<q-btn label="Save" color="primary" :loading="saving"
				@click="emit('save')"/>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Dialog',
	props: {
		title: {
			type: String,
			required: true
		},
		saving: {
			type: Boolean,
			default: false
		},
		destroying: {
			type: Boolean,
			default: false
		},
		deletable: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		return {
			emit
		};
	}
});
</script>

<style lang="scss" scoped>
.dialog {
	min-width: 500px;
	border-radius: 3px;
}
</style>
