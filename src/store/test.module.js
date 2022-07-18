import services from '@/services';

const getDefaultState = () => ({
	testData: 'asda',
	error: '',
});
const state = getDefaultState();
const getters = {
	testData: ({ testData }) => testData,
	error: ({ error }) => error,
};

const mutations = {
	setTestData(state, { data }) {
		state.testData = data;
	},
	setError(state, error) {
		state.error = error;
		setTimeout(function () {
			state.error = '';
		}, 2000);
	},
};
const actions = {
	// eslint-disable-next-line no-empty-pattern
	async getTestData({ commit }) {
		return new Promise((resolve, reject) =>
			services.testService
				.getTest({})
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	setTestData({ commit }, { data }) {
		commit('setTestData', { data });
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
};
