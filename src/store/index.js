import { createStore } from 'vuex'

export default createStore({
  state: {
    result: [],
  },
  getters: {
    getResult(state) { return state.result },
  },
  mutations: {
    SET_RESULT(state, payload) {
      state.result = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
