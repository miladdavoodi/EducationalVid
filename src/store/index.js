import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	baseServerUrl: "http://ws.az0ta100.com/api/",
	tokenRow: localStorage.getItem('tokenRow') || '',
    },
    mutations: {
	auth_success(state, token) {
	    state.tokenRow = token;
	    localStorage.setItem('tokenRow', token)
	},
	logout(state) {
	    state.tokenRow = "";
	    localStorage.removeItem('tokenRow')
	},
    },
    actions: {},
    modules: {}
})
