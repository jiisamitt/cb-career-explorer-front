import api from '../api';

export default {
	// Test API with GET method
	getTest() {
		return api.get('/posts/1');
	},
};
