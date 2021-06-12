import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5',
	headers: {
		Accept: 'application/json'
	},
	responseType: 'json'
});

const clearData = response => {
	if (typeof (response || {}).data === 'object')
		return clearData(response.data);
	return response;
};

const beforeRequest = config => {
	config.url += `&appid=${process.env.API_KEY}`;
	return config;
};

api.interceptors.request.use(beforeRequest, e => e);
api.interceptors.response.use(clearData, e => e);

export { api };
