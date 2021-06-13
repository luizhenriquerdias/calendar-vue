<template>
	<q-page class="flex flex-center">
		<div class="calendar-container">
			<div class="row justify-between items-center q-px-lg q-py-sm">
				<span>{{ formatDate(store.state.currentMonth, 'MMMM - YYYY') }}</span>
				<span>
					<q-btn flat round color="primary" icon="fas fa-chevron-up" class="q-mr-sm"
						@click="changeMonth(store, -1)" />
					<q-btn flat round color="primary" icon="fas fa-chevron-down" class="q-ml-sm"
						@click="changeMonth(store, 1)" />
				</span>
			</div>
			<DefaultCalendar />
		</div>
	</q-page>
</template>

<script>
import { defineComponent } from 'vue';
import DefaultCalendar from 'components/DefaultCalendar';
import { useStore } from 'vuex';
import { formatDate } from 'util/date';
import { changeMonth } from 'mixin/calendar';

export default defineComponent({
	name: 'Default',
	components: { DefaultCalendar },
	setup() {
		const store = useStore();
		return {
			store,
			formatDate,
			changeMonth
		};
	}
});
</script>

<style lang="scss" scoped>
</style>
