import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import layers from './layers.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    map01: null,
    map02: null,
    layerList01: [{id: 1, name: '標準地図', layer: layers[1].children[0].data.layer[0], opacity: 100}],
    layerList02: [{id: 1, name: '標準地図', layer: layers[1].children[0].data.layer[1], opacity: 100}],
    // layerList: [{id: 0, name: 'OSM', layer: layers[0].data.layer, opacity: 100}],
    notification: '',
    dialogArr: []
  },
  getters: {
    map01 (state) { return state.map01 },
    map02 (state) { return state.map02 },
    layerList01 (state) { return state.layerList01 },
    layerList02 (state) { return state.layerList02 },
    close01Flg (state) { return state.close01Flg },
    close02Flg (state) { return state.close02Flg },
    notification (state) { return state.notification },
    dialogArr (state) { return state.dialogArr }
  },
  mutations: {
    setMap01 (state, payload) { state.map01 = payload },
    setMap02 (state, payload) { state.map02 = payload },
    pushDialogArr (state, payload) { state.dialogArr.push(payload) },
    editDialogArr (state, payload) {
      // ダイアログの開閉フラグを操作
      const result = state.dialogArr.find(el => el.name === payload.name)
      if (payload.flg === 'toggle') {
        result.flg = !result.flg
      } else {
        result.flg = payload.flg
      }
    },
    unshiftLayerList01 (state, payload) {
      // 同じレイヤーは追加しない
      const result = state.layerList01.find(el => el.id === payload.id)
      if (!result) {
        state.layerList01.unshift(payload)
      } else {
        state.notification = 'cyouhuku'
      }
    },
    updateList01 (state, payload) { state.layerList01 = payload },
    unshiftLayerList02 (state, payload) {
      // 同じレイヤーは追加しない
      const result = state.layerList02.find(el => el.id === payload.id)
      if (!result) {
        state.layerList02.unshift(payload)
      } else {
        state.notification = 'cyouhuku'
      }
    },
    updateList02 (state, payload) { state.layerList02 = payload },
    updateClose01Flg (state, payload) { state.close01Flg = payload },
    updateNotification (state, payload) { state.notification = payload }
  }
})
export default store
