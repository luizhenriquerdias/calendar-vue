<template>
	<Dialog title="Event" :deletable="!isNew" @close="onClose" @save="onSave" :saving="saving">
		<div class="row q-col-gutter-sm">
			<div class="text-bold col-12 q-mb-sm">{{ formatDate(event.date, 'MMM Do, YYYY') }}</div>
			<q-input v-model="event.reminder" class="col-12" filled label="Reminder" counter
				maxlength="30" />
			<q-select filled v-model="event.city" class="col-12" use-input input-debounce="0"
				label="City"
				:options="options" option-value="id" option-label="name" hint="Please, type at least 2 characters to search"
				@filter="filterFn"/>
			<div class="col-12 row">
				<q-input filled v-model="event.time" mask="time" class="col-9" :disable="event.allDay">
					<template v-slot:append>
						<q-icon name="access_time" class="cursor-pointer">
							<q-popup-proxy transition-show="scale" transition-hide="scale">
								<q-time v-model="event.time" format24h >
									<div class="row items-center justify-end">
										<q-btn v-close-popup label="Close" color="primary" flat />
									</div>
								</q-time>
							</q-popup-proxy>
						</q-icon>
					</template>
				</q-input>
				<q-toggle class="col-3" v-model="event.allDay" label="All day"/>
			</div>
			<div class="row col-12 q-mt-sm">
				<ColorButton v-for="color in colors" :key="color" :color="color" :selected="event.color === color"
					@input="color => event.color = color" />
			</div>
		</div>
	</Dialog>
</template>

<script>
import {
	defineComponent, reactive, ref, computed
} from 'vue';
import Dialog from 'components/Base/Dialog.vue';
import { useStore } from 'vuex';
import { formatDate } from 'src/util/date';
import ColorButton from 'components/Base/ColorButton.vue';
import cities from 'util/city.list.json';

export default defineComponent({
	name: 'DialogEvent',
	components: { Dialog, ColorButton },
	setup() {
		const saving = ref(false);
		const store = useStore();
		console.log(store.state.selectedEventId);
		const isNew = computed(() => !store.state.selectedEventId);
		const onClose = () => {
			store.commit('CRUD_EVENT', { eventId: null, date: null });
		};
		let obj = {
			date: store.state.selectedDate,
			reminder: '',
			color: '',
			allDay: false,
			time: `${formatDate(null, 'HH')}:00`,
			city: null
		};
		if (store.state.selectedEventId && store.state.events[store.state.selectedDate])
			obj = store.state.events[store.state.selectedDate].find(item => item.id === store.state.selectedEventId) || obj;
		const event = reactive(obj);
		const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
		const options = ref(cities);
		const filterFn = (val, update, abort) => {
			if (val.length < 2) {
				abort();
				return;
			}

			update(() => {
				const needle = val.toLowerCase();
				options.value = cities.filter(({ name }) => name.toLowerCase().slice(0, needle.length) === needle);
			});
		};
		const onSave = () => {
			saving.value = true;
			setTimeout(() => {
				store.commit('SAVE_EVENT', { ...event, id: store.state.selectedEventId });
				saving.value = false;
				onClose();
			}, 1000);
		};
		return {
			isNew,
			event,
			colors,
			saving,
			onSave,
			onClose,
			options,
			filterFn,
			formatDate
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
