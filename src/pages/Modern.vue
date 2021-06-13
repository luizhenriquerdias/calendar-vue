<template>
	<q-page padding>
		<div class="row items-center justify-between">
			<span>
				<div class="row items-center justify-between">
					<h1 class="text-bold">{{ formatDate(store.state.currentMonth, 'MMM\' YYYY') }}</h1>
					<span class="row items-center ">
						<q-btn flat round color="primary" icon="fas fa-chevron-left"
							@click="changeMonth(store, -1)" />
						<span class="bull">&bull;</span>
						<q-btn flat round color="primary" icon="fas fa-chevron-right"
							@click="changeMonth(store, 1)" />
					</span>
				</div>
				<p>Here you can find all information about your events</p>
			</span>
			<q-btn color="primary" label="Add event today" @click="addEventToday" />
		</div>
		<ModernCalendar />
	</q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { formatDate } from 'util/date';
import { changeMonth, crudEvent } from 'mixin/calendar';
import ModernCalendar from 'components/ModernCalendar';

export default defineComponent({
	name: 'Modern',
	components: { ModernCalendar },
	setup() {
		const store = useStore();
		const addEventToday = () => {
			crudEvent(store, null, formatDate(null, 'YYYY-MM-DD'));
		};
		return {
			store,
			formatDate,
			changeMonth,
			addEventToday
		};
	}
});
</script>

<style lang="scss" scoped>
.bull {
	font-size: 4rem;
	margin-bottom: 9px;
	color: $primary;
}
</style>
