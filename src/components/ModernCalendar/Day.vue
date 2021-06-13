<template>
	<div class="day" :class="{ 'today': isToday }">
		<div class="poppins">
			{{ formatDate(date, 'DD') }}
		</div>
	</div>
</template>

<script>
import { formatDate } from 'src/util/date';
import { defineComponent } from 'vue';
import { useDay } from 'composable/day';

export default defineComponent({
	name: 'Day',
	props: {
		date: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const { isToday } = useDay(props.date);

		return {
			isToday,
			formatDate
		};
	}
});
</script>

<style lang="scss" scoped>
.day {
	min-height: 100px;

	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 2px;
		background: #444;
	}

	&.today {
		background: $grey-3;

		.poppins {
			color: $primary
		}

		&::before {
			background: $primary;
		}
	}

	.poppins {
		font-size: 1.5rem;
	}

}
</style>
