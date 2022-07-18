import axios from 'axios';
import CONFIG from '@/config';

const api = axios.create({
	baseURL: CONFIG.baseURL,
	/*headers: {
		'Access-Control-Allow-Origin': '*',
		
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		
	},*/
});

export { api as default };
