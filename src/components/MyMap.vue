<template>
    <div id="map00">
        <div id="map01">
            <div id="top-right-div">
                <el-button type="info" size="medium" @click="openDialog">背景</el-button>
            </div>
            <G-Dialog :opt="{name:'map01Dialog',position:{top:'56px', right:'210px'},dialog:{height:'auto'}}">
                <div class="first-content-div">
                    <Layer val="map01Dialog"/>
                </div>
                <div class="second-content-div">
                    <LayerList val="map01Dialog" />
                </div>
            </G-Dialog>

        </div>
        <div id="map02">
            <G-Dialog :opt="{name:'map02Dialog',position:{top:'56px', right:'210px'},dialog:{height:'auto'}}">
                <div class="first-content-div">
                    <Layer val="map02Dialog"/>
                </div>
                <div class="second-content-div">
                    <LayerList val="map02Dialog" />
                </div>
            </G-Dialog>
        </div>
    </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import layers from '../layers.js'
import LayerList from './LayerList.vue'
import Layer from './Layer.vue'
// import Dialog from './Dialog.vue'
const center = fromLonLat([140.097, 37.856])
export default {
  name: 'MyMap',
  components: {
    LayerList,
    Layer
  },
  data () {
    return {
      map01Dialog: {
        right: '300px'
      },
      map02Dialog: {
        right: '200px'
      }
    }
  },
  methods: {
    openDialog () {
      this.$store.commit('editDialogArr', {name: 'map01Dialog', flg: 'toggle'})
      this.$store.commit('editDialogArr', {name: 'map02Dialog', flg: 'toggle'})
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(function () {
      initMap(this.$store)
    })
  }
}
function initMap (store) {
  let target = document.getElementById('map01')
  let map01 = null
  target.style.height = window.innerHeight + 'px'
  map01 = new Map({
    layers: [
      // layers[0].data.layer
      layers[1].children[0].data.layer
    ],
    target: 'map01',
    view: new View({
      center: center,
      zoom: 8
    })
  })
  store.commit('setMap01', map01)
  map01 = store.state.map01
  map01.on('singleclick', function (evt) {
    console.log(store.state.map01)
  })
  // map2
  target = document.getElementById('map02')
  let map02 = null
  target.style.height = window.innerHeight + 'px'
  map02 = new Map({
    layers: [
      // layers[0].data.layer
      layers[1].children[0].data.layer2
    ],
    target: 'map02',
    view: new View({
      center: center,
      zoom: 8
    })
  })
  store.commit('setMap02', map02)
}
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    #map00{
        width: 100%;
    }
    #map01{
        width: 50%;
        height: 300px;
        /*background-color: #1e88e5;*/
        position: relative;
    }
    #top-right-div{
        position: absolute;
        margin: 0;
        padding: 10px;
        top: 0;
        right: 0;
        z-index: 1;
    }
    #map02{
        width: 50%;
        height: 300px;
        /*background-color: red;*/
        position: absolute;
        right: 0;
        top:0;
    }
    .first-content-div{
        /*height: 150px;*/
        border: 1px solid grey;
        margin: 5px;
    }
    .second-content-div{
        /*height: 150px;*/
        border: 1px solid grey;
        margin: 5px;
        /*overflow: auto;*/
        background: whitesmoke;
    }
</style>
<style>
    /*汎用的なスタイルはここに*/
    body{
        margin: 0;
        padding: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }

    input[type=range] {
        height: 26px;
        -webkit-appearance: none;
        margin: 0 0;/*修正*/
        width: 100%;
        background-color: rgba(0,0,0,0);/*修正*/
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #B6B6B6;
        border-radius: 6px;
        border: 1px solid #8A8A8A;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 1px 1px 1px #828282;
        border: 1px solid #8A8A8A;
        height: 18px;
        width: 18px;
        border-radius: 18px;
        background: #DADADA;
        cursor: grab;
        -webkit-appearance: none;
        margin-top: -7.5px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #B6B6B6;
    }
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #B6B6B6;
        border-radius: 6px;
        border: 1px solid #8A8A8A;
    }
    input[type=range]::-moz-range-thumb {
        box-shadow: 1px 1px 1px #828282;
        border: 1px solid #8A8A8A;
        height: 18px;
        width: 18px;
        border-radius: 18px;
        background: #DADADA;
        cursor: grab;
    }
    input[type=range]::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #B6B6B6;
        border: 1px solid #8A8A8A;
        border-radius: 12px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-fill-upper {
        background: #B6B6B6;
        border: 1px solid #8A8A8A;
        border-radius: 12px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 1px 1px 1px #828282;
        border: 1px solid #8A8A8A;
        height: 18px;
        width: 18px;
        border-radius: 18px;
        background: #DADADA;
        cursor: grab;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #B6B6B6;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #B6B6B6;
    }
</style>
