<template>
	<Dialog title="Event" :deletable="!isNew" :saving="saving" :destroying="destroying"
		@close="onClose" @save="onSave" @destroy="destroy">
		<div class="row q-col-gutter-md">
			<div class="text-bold col-12 q-mb-sm">{{ formatDate(event.date, 'MMM Do, YYYY') }}</div>
			<q-input v-model="event.reminder" class="col-12" filled label="Reminder" counter
				maxlength="30" />
			<q-select filled v-model="event.city" class="col-12 q-mb-md" use-input input-debounce="0"
				label="City"
				:options="options" option-value="id" option-label="name" :placeholder="!event.city ? 'Please, type at least 2 characters to search (only US cities)' : ''"
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
import { notify } from 'src/util/notify';
import ColorButton from 'components/Base/ColorButton.vue';
import cities from 'util/city.list.json';
import { useQuasar } from 'quasar';
import { crudEvent } from 'mixin/calendar';

export default defineComponent({
	name: 'DialogEvent',
	components: { Dialog, ColorButton },
	setup() {
		const $q = useQuasar();
		const saving = ref(false);
		const destroying = ref(false);
		const store = useStore();
		const isNew = computed(() => !store.state.selectedEventId);
		const onClose = () => {
			crudEvent(store, null, null);
		};
		let obj = {
			date: store.state.selectedDate,
			reminder: '',
			color: '',
			allDay: false,
			time: `${formatDate(null, 'HH')}:00`,
			city: store.state.lastCity
		};
		if (store.state.selectedEventId && store.state.events[store.state.selectedDate])
			obj = { ...(store.state.events[store.state.selectedDate].find(item => item.id === store.state.selectedEventId) || obj) };
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

		const validate = () => new Promise((resolve, reject) => {
			if (!event.reminder)
				return reject('Please, set a reminder');
			if (!event.city)
				return reject('Please, select a city');
			if (!event.color)
				return reject('Please, select a color');
			if ((!event.time && !event.allDay) || !/^\d\d:\d\d$/.test(event.time))
				return reject('Please, enter a valid time');
			return resolve();
		});

		const onSave = async () => {
			try {
				await validate();
				saving.value = true;
				setTimeout(async () => {
					store.dispatch('SET_EVENT', { ...event, id: store.state.selectedEventId });
					saving.value = false;
					notify('Event saved successfully');
					onClose();
				}, 1000);
			} catch (error) {
				notify(error, 'negative');
			}
		};

		const doDestroy = () => {
			destroying.value = true;
			setTimeout(() => {
				store.commit('DELETE_EVENT', { ...event });
				destroying.value = false;
				notify('Event deleted successfully');
				onClose();
			}, 1000);
		};

		const destroy = () => {
			$q.dialog({
				title: 'Warning!',
				message: 'Are you sure you want to delete this event? This action cannot be undone.',
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
				doDestroy();
			});
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
			destroy,
			destroying,
			formatDate
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
