import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  login: {
      token: '',
      username: '',
      user_id: '',
  },
  child_id: '',
  hemo: {
      hemo_id: '',
      hemo_trc: '',
  },
  neuro: {
      score: 0,
      neuro_id: ''
  },
  pleuro: {
      pleuro_id: '',
      pleuro_cynose: '',
      pleuro_rythme: '',
  },
  result_id: ''
}

const mutations = {
    CHILD: (state, child_id) => {
        state.child_id = child_id
    },
    LOGIN: (state, obj) => {
         state.login.token = obj.token
         state.login.username = obj.username
         state.login.user_id = obj.user_id
    },
    LOGOUT: (state) => {
        state.login.token = ''
        state.login.username = ''
        state.login.user_id = ''
    },
    HEMO: (state, obj) => {
        state.hemo.hemo_id = obj.hemo_id
        state.hemo.hemo_trc = obj.hemo_trc
    },
    NEURO: (state, obj) => {
        state.neuro.score = obj.score
        state.neuro.neuro_id = obj.neuro_id
    },
    PLEURO: (state, obj) => {
        state.pleuro.pleuro_id =  obj.pleuro_id
        state.pleuro.pleuro_cynose = obj.pleuro_cynose
        state.pleuro.pleuro_rythme = obj.pleuro_rythme
    },
    RESULT: (state, result) => {
        state.result_id = result
    }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: {},
  actions: {}
})

global.store = store

export default store
