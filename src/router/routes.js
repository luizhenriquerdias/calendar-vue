const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', name: 'Default', component: () => import('src/pages/Default.vue') },
			{ path: 'modern', name: 'Modern', component: () => import('src/pages/Modern.vue') }
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/Error404.vue')
	}
];

export default routes;
