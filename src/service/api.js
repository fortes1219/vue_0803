import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
const api = {
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

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