const state = {
	msg: 'default msg'
}
const getters = {
	mapGetMsg: state => state.msg
}
const mutations = {
	changeMsg(state) {
		state.msg = 'set success!!'
	}
}
const actions = {
	setMsg(val) {
		setTimeout(() => {
			val.commit('changeMsg')
		}, 3000)
	}
}
export default {
	state,
	getters,
	mutations,
	actions,
}