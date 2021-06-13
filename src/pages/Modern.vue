<template>
	<q-page padding>
		<div class="row items-center justify-between">
			<span>
				<div class="row items-center justify-between">
					<h1 class="text-bold">{{ formatDate(currentMonth, 'MMM\' YYYY') }}</h1>
					<span class="row items-center ">
						<q-btn flat round color="primary" icon="fas fa-chevron-left"
							@click="changeMonth(-1)" />
						<span class="bull">&bull;</span>
						<q-btn flat round color="primary" icon="fas fa-chevron-right"
							@click="changeMonth(1)" />
					</span>
				</div>
				<p>Here you can find all information about your events</p>
			</span>
			<q-btn color="primary" label="Add event today" @click="crudEvent(null)" />
		</div>
		<ModernCalendar />
	</q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { formatDate } from 'util/date';
import { useCalendar } from 'composable/calendar';
import ModernCalendar from 'components/ModernCalendar';

export default defineComponent({
	name: 'Modern',
	components: { ModernCalendar },
	setup() {
		const { changeMonth, crudEvent, currentMonth } = useCalendar(formatDate(null, 'YYYY-MM-DD'));

		return {
			crudEvent,
			formatDate,
			changeMonth,
			currentMonth
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
