import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('Token')
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem('Token', state.user)
    }
  },
  actions: {},
  modules: {}
})
