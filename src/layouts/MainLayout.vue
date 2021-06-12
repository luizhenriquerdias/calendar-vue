<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="leftDrawerOpen = !leftDrawerOpen"/>

				<q-toolbar-title>
					Vue Calendar
				</q-toolbar-title>

				<q-icon name="fab fa-linkedin" size="md" class="pointer" @click="openLinkedin" />
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
			<q-list>
				<q-item-label
					header
					class="text-grey-8">
					Calendars
				</q-item-label>

				<EssentialLink
					v-for="link in pagesList"
					:key="link.title"
					v-bind="link"/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import { useStore } from 'vuex';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'MainLayout',
	components: { EssentialLink },
	setup() {
		const store = useStore();
		store.dispatch('INIT_CALENDAR');
		const leftDrawerOpen = ref(false);

		const pagesList = [
			{
				title: 'Default calendar',
				caption: 'The default calendar',
				icon: 'far fa-calendar-alt',
				route: 'https://quasar.dev'
			},
			{
				title: 'Modern calendar',
				caption: 'A modern calendar',
				icon: 'far fa-star',
				route: 'https://github.com/quasarframework'
			}
		];

		const openLinkedin = () => {
			window.open('https://www.linkedin.com/in/luizhenriquerdias/', '_blank');
		};

		return {
			pagesList,
			openLinkedin,
			leftDrawerOpen
		};
	}
});
</script>
