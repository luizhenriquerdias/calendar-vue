<template>
	<div class="row">
		<q-btn flat icon="fas fa-plus" :size="size" round @click="emit('crud')" />
		<q-btn flat icon="far fa-trash-alt" :size="size" round @click="destroy" />
	</div>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ActionsButtons',
	props: {
		size: {
			type: String,
			default: 'sm'
		}
	},
	setup(props, { emit }) {
		const $q = useQuasar();
		const destroy = () => {
			$q.dialog({
				title: 'Warning!',
				message: 'Are you sure you want to delete ALL events from this day? This action cannot be undone.',
				ok: {
					unelevated: true,
					label: 'Yes, delete',
					color: 'negative'
				},
				cancel: {
					flat: true,
					unelevated: true,
					label: 'Cancel'
				},
				persistent: true
			}).onOk(() => {
				emit('destroy');
			});
		};
		return {
			emit,
			destroy
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
