import Vue from 'vue';
import Vuex from 'vuex';
import test from './test.module';
import base from './base.module';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		test,
		base,
	},
});
