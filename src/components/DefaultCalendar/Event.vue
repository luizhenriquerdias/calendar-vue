<template>
	<div class="row event-container pointer" :class="event.allDay && getBGClassColor(event.color)">
		<div v-if="!event.allDay" class="col-auto row items-center q-mr-xs">
			<div class="badge" :class="getBGClassColor(event.color)" />
		</div>
		<span class="col reminder poppins" :class="event.allDay && 'text-white'">
			{{ event.reminder }}
		</span>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { getBGClassColor } from 'util/functions';

export default defineComponent({
	name: 'Event',
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	setup() {
		return { getBGClassColor };
	}
});
</script>

<style lang="scss" scoped>
.event-container {
	border-radius: 4px;
	padding: 2px;

	.badge {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.reminder {
		font-size: 0.8rem;
	}
}
</style>
