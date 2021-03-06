import { createStore } from 'vuex';
import state from './state';
import * as mutations from './mutations';
import * as actions from './actions';

const store = createStore({
	mutations,
	actions,
	state,

	// enable strict mode (adds overhead!)
	// for dev mode and --debug builds only
	strict: process.env.DEBUGGING
});

export default store;
