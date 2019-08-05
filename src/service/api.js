import axios from 'axios'
axios.defaults.baseURL = ''

const api = {

	get: function (url, params) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: params
			})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	post: function (url, params) {
		return new Promise((resolve, reject) => {
			axios.post(url, params)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	delete: function (url, params) {
		return new Promise((resolve, reject) => {
			axios.delete(url)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}
export default api