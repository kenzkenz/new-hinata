import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import layers from './layers.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    map01: null,
    map02: null,
    map03: null,
    map04: null,
    layerList01: [{id: 1, name: '標準地図', layer: layers[1].children[0].data.layer[0], opacity: 100}],
    layerList02: [{id: 2, name: '淡色地図', layer: layers[1].children[1].data.layer[1], opacity: 100}],
    layerList03: [{id: 4, name: '色別標高図', layer: layers[1].children[3].data.layer[2], opacity: 100}],
    layerList04: [{id: 5, name: '全国最新写真', layer: layers[1].children[4].data.layer[3], opacity: 100}],
    notification: '',
    dialogArr: []
  },
  getters: {
    map01 (state) { return state.map01 },
    map02 (state) { return state.map02 },
    map03 (state) { return state.map03 },
    map04 (state) { return state.map04 },
    layerList: (state) => (name) => {
      switch (name) {
        case 'map01Dialog':
          return state.layerList01
        case 'map02Dialog':
          return state.layerList02
        case 'map03Dialog':
          return state.layerList03
        case 'map04Dialog':
          return state.layerList04
      }
      /*
      if (name === 'map01Dialog') {
        return state.layerList01
      } else {
        return state.layerList02
      }
      */
    },
    close01Flg (state) { return state.close01Flg },
    close02Flg (state) { return state.close02Flg },
    notification (state) { return state.notification },
    dialogArr (state) { return state.dialogArr }
  },
  mutations: {
    setMap01 (state, payload) { state.map01 = payload },
    setMap02 (state, payload) { state.map02 = payload },
    setMap03 (state, payload) { state.map03 = payload },
    setMap04 (state, payload) { state.map04 = payload },
    // ダイアログの開閉フラグ---------------------------------------------------------
    pushDialogArr (state, payload) { state.dialogArr.push(payload) },
    editDialogArr (state, payload) {
      const result = state.dialogArr.find(el => el.name === payload.name)
      if (payload.flg === 'toggle') {
        result.flg = !result.flg
      } else {
        result.flg = payload.flg
      }
    },
    // 背景リスト-------------------------------------------------------------------
    updateList (state, payload) {
      switch (payload.name) {
        case 'map01Dialog':
          state.layerList01 = payload.value
          break
        case 'map02Dialog':
          state.layerList02 = payload.value
          break
        case 'map03Dialog':
          console.log('map03Dialog')
          state.layerList03 = payload.value
          break
        case 'map04Dialog':
          state.layerList04 = payload.value
          break
      }
    },
    unshiftLayerList (state, payload) {
      let layerList, layer
      switch (payload.name) {
        case 'map01Dialog':
          layerList = state.layerList01
          layer = payload.value.layer[0]
          break
        case 'map02Dialog':
          layerList = state.layerList02
          layer = payload.value.layer[1]
          break
        case 'map03Dialog':
          layerList = state.layerList03
          layer = payload.value.layer[2]
          console.log('map03Dialog9999')
          break
        case 'map04Dialog':
          layerList = state.layerList04
          layer = payload.value.layer[3]
          break
      }
      payload.value.layer = layer
      layerList.unshift(payload.value)
      console.log(2222222)
      /*
      if (!layerList.find(el => el.id === payload.value.id)) {
        payload.value.layer = layer
        layerList.unshift(payload.value)
      } else {
        console.log(3333333)
      }
      */
    },
    // 通知------------------------------------------------------------------------
    updateNotification (state, payload) { state.notification = payload }
  }
})
export default store
