const CONFIG = {};

CONFIG.baseURL =
	process.env.VUE_APP_API_HOST ||
	'https://staging-api.consiliumbots.com/egresa/';

export default CONFIG;
