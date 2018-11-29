import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import XYZ from 'ol/source/XYZ.js'
// オープンストリートマップ
function Osm () {
  this.source = new OSM()
}
const osmArr = []
for (let i = 0; i < 4; i++) {
  osmArr[i] = new TileLayer(new Osm())
}
// 標準地図
function Std () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const stdArr = []
for (let i = 0; i < 4; i++) {
  stdArr[i] = new TileLayer(new Std())
}
// 淡色地図
function Pale () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const paleArr = []
for (let i = 0; i < 4; i++) {
  paleArr[i] = new TileLayer(new Pale())
}
// 白地図
function Blank () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
const blankArr = []
for (let i = 0; i < 4; i++) {
  blankArr[i] = new TileLayer(new Blank())
}
// 全国最新写真
function Seamlessphoto () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    minZoom: 2,
    maxZoom: 18
  })
}
const seamlessphotoArr = []
for (let i = 0; i < 4; i++) {
  seamlessphotoArr[i] = new TileLayer(new Seamlessphoto())
}
// 宮崎県航空写真
function MiyazakiOrt () {
  this.source = new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 19
  })
}
const miyazakiOrtArr = []
for (let i = 0; i < 4; i++) {
  miyazakiOrtArr[i] = new TileLayer(new MiyazakiOrt())
}
// ここにレイヤーを全部書く。クリックするとストアのlayerListに追加されていく
const layers =
  [
    { text: 'OpenStreetMap', data: { id: 0, layer: osmArr, opacity: 100 } },
    { text: '国土地理院',
      children: [
        { text: '標準地図', data: { id: 1, layer: stdArr, opacity: 100 } },
        { text: '淡色地図', data: { id: 2, layer: paleArr, opacity: 100 } },
        { text: '白地図', data: { id: 3, layer: blankArr, opacity: 100 } },
        { text: '全国最新写真', data: { id: 4, layer: seamlessphotoArr, opacity: 100 } }
      ]},
    { text: '宮崎県',
      children: [
        { text: '宮崎県航空写真', data: { id: 5, layer: miyazakiOrtArr, opacity: 100 } }
      ]}
  ]
export default layers
