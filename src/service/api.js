import axios from 'axios'
axios.defaults.baseURL = ''

const api = {

	/*
	註解掉的是ES6 Promise封裝法，現在改寫成async/await會更易懂些，兩者其實都可以。
	但沒正式後端middle ware吐回res.result的話會無法判斷成功或失敗，所以暫時先拿掉判斷res.result
	*/
	// get: function (url, params) {
	// 	return new Promise((resolve, reject) => {
	// 		axios.get(url, {
	// 			params: params
	// 		})
	// 			.then((response) => {
	// 				resolve(response.data);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});
	// 	})
	// },

	// post: function (url, params) {
	// 	return new Promise((resolve, reject) => {
	// 		axios.post(url, params)
	// 			.then((response) => {
	// 				resolve(response.data);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});
	// 	})
	// },

	// delete: function (url, params) {
	// 	return new Promise((resolve, reject) => {
	// 		axios.delete(url)
	// 			.then((response) => {
	// 				resolve(response.data);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});
	// 	})
	// }

	async get (url, data) {
		try {
			let res = await axios.get(url, { params: data })
			res = res.data
			return new Promise((resolve) => {
				resolve(res)
				// if (res.code === 1) resolve(res)
				// else resolve(res)
			})
		}
		catch(err) {
			console.log(err)
		}
	},

	async post (url, data) {
		try {
			let res = await axios.post(url, data)
			res = res.data
			return new Promise((resolve, reject) => {
				resolve(res)
				// if (res.code === 1) {
				// 	resolve(res)
				// }
				// else {
				// 	reject(res)
				// }
			})
		}
		catch(err) {
			console.log(err)
		}
	},

	async delete(url, data) {
		try {
			let res = await axios.delete(url, { params: data })
			res = res.data
			return new Promise((resolve) => {
				resolve(res)
				// if (res.code === 1) resolve(res)
				// else resolve(res)
			})
		}
		catch (err) {
			console.log(err)
		}
	},



}
export default api