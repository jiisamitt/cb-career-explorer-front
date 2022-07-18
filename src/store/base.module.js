import services from '@/services';

const getDefaultState = () => ({
	error: '',
	selectedView: 'Landing',
	institutionTypes: [],
	areas: [],
	careers: [],
	isSearched: false,
	searchValues: {},
	averageSalaryOrEmployability: 0,
});
const state = getDefaultState();
const getters = {
	error: ({ error }) => error,
	selectedView: ({ selectedView }) => selectedView,
	institutionTypes: ({ institutionTypes }) => institutionTypes,
	areas: ({ areas }) => areas,
	careers: ({ careers }) => careers,
	isSearched: ({ isSearched }) => isSearched,
	searchValues: ({ searchValues }) => searchValues,
	averageSalaryOrEmployability: ({ averageSalaryOrEmployability }) =>
		averageSalaryOrEmployability,
};

const mutations = {
	setError(state, error) {
		state.error = error;
		setTimeout(function () {
			state.error = '';
		}, 2000);
	},
	//main navbar selection
	setSelectedView(state, selectedView) {
		state.selectedView = selectedView;
	},
	setInstitutionTypes(state, institutionTypes) {
		state.institutionTypes = institutionTypes;
	},
	setAreas(state, areas) {
		state.areas = areas;
	},
	setCareers(state, careers) {
		state.careers = careers;
	},
	setIsSearched(state, isSearched) {
		state.isSearched = isSearched;
	},
	setSearchValues(state, searchValues) {
		state.searchValues = searchValues;
	},
	setAverageSalaryOrEmployability(state, averageSalaryOrEmployability) {
		state.averageSalaryOrEmployability = averageSalaryOrEmployability;
	},
};
const actions = {
	/* not using services */
	//main navbar selection
	setSelectedView({ commit }, selectedView) {
		commit('setSelectedView', selectedView);
	},
	//career searched (no more welcome landing)
	setIsSearched({ commit }, isSearched) {
		commit('setIsSearched', isSearched);
	},
	setSearchValues({ commit }, searchValues) {
		commit('setSearchValues', searchValues);
	},
	setAverageSalaryOrEmployability({ commit }, averageSalaryOrEmployability) {
		commit('setAverageSalaryOrEmployability', averageSalaryOrEmployability);
	},

	//utils no funciona u.u
	// eslint-disable-next-line
	addDot({ commit, rootGetters }, number) {
		number = Math.round(number);
		if (number >= 1000) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		}
		return number;
	},
	/* services */
	// eslint-disable-next-line no-empty-pattern
	async getAllYears({ commit }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getAllYears({})
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(
						response.data.map((x, index) => {
							return { ...x, name: x.year, id: index };
						})
					);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getAllInstitutionTypes({ commit }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getAllInstitutionTypes({})
				.then((response) => {
					commit('setInstitutionTypes', response.data);
					commit('setError', 'Todo ok');
					/*resolve(
						response.data .map((x) => {
							return { ...x, name: x.label };
						})
					);*/
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getAllAreasByInstitutionType({ commit }, institutionTypeId) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getAllAreasByInstitutionType(institutionTypeId)
				.then((response) => {
					commit('setError', 'Todo ok');
					commit('setAreas', response.data);
					//resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getAllCareersByAreaAndInstitutionType(
		{ commit },
		{ institutionTypeId, areaId }
	) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getAllCareersByAreaAndInstitutionType(institutionTypeId, areaId)
				.then((response) => {
					commit('setError', 'Todo ok');
					commit('setCareers', response.data);
					//resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getAverageSalaryOrEmployability({ commit }, { criteria, type, id }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getAverageSalaryOrEmployability(criteria, type, id)
				.then((response) => {
					commit('setError', 'Todo ok');
					//commit('setAverageSalaryOrEmployability', response.data);
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getTopCareers({ commit }, { criteria, areaId, limit }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getTopCareers(criteria, areaId, limit)
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getCareersOrderedBy({ commit }, { criteria }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getCareersOrderedBy(criteria)
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},

	// eslint-disable-next-line no-empty-pattern
	async getCareersByYearsAfterGrad({ commit }, { criteria, careerId }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getCareersByYearsAfterGrad(criteria, careerId)
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	// eslint-disable-next-line no-empty-pattern
	async getCareersByLevel({ commit }, { criteria, careerId }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getCareersByLevel(criteria, careerId)
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
	async getTopOrBottomCareersByArea({ commit }, { criteria, areaId }) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getTopOrBottomCareersByArea(criteria, areaId)
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},

	// eslint-disable-next-line no-empty-pattern
	async getAllCareersByCriteria({ commit }, criteria) {
		return new Promise((resolve, reject) =>
			services.baseService
				.getAllCareersByCriteria(criteria)
				.then((response) => {
					commit('setError', 'Todo ok');
					resolve(response.data);
				})
				.catch((err) => {
					commit('setError', 'Todo mal');
					reject(err);
				})
		);
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
};
