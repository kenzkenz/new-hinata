import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import XYZ from 'ol/source/XYZ.js'
// レイヤーをそれぞれ２つずつ作っている。要修正
// オープンストリートマップ
/*
const osm = new TileLayer({
  source: new OSM()
})
const osm2 = new TileLayer({
  source: new OSM()
})
*/
// OSM
function Osm () {
  this.source = new OSM()
}
const osmArr = []
for (let i = 0; i < 2; i++) {
  osmArr[i] = new TileLayer(new Osm())
}
console.log(osmArr)

// 標準地図
function Std () {
  this.source = new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
}
/*
const std = new TileLayer(new Std())
const std2 = new TileLayer(new Std())
*/
const stdArr = []
for (let i = 0; i < 2; i++) {
  stdArr[i] = new TileLayer(new Std())
}
console.log(stdArr)
/*
// 淡色地図
const pale = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
})
const pale2 = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    minZoom: 2,
    maxZoom: 18
  })
})
// 白地図
const blank = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    minZoom: 5,
    maxZoom: 14
  })
})
const blank2 = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    minZoom: 5,
    maxZoom: 14
  })
})
// 全国最新写真
const seamlessphoto = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    minZoom: 5,
    maxZoom: 14
  })
})
const seamlessphoto2 = new TileLayer({
  source: new XYZ({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    minZoom: 5,
    maxZoom: 14
  })
})
// 宮崎県航空写真
const miyazakiOrt = new TileLayer({
  source: new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 19
  })
})
const miyazakiOrt2 = new TileLayer({
  source: new XYZ({
    url: 'https://mtile.pref.miyazaki.lg.jp/tile/ort/{z}/{x}/{-y}.png',
    minZoom: 1,
    maxZoom: 19
  })
})
*/
// ここにレイヤーを全部書く。クリックするとストアのlayerListに追加されていく
const layers =
  [
    { text: 'OpenStreetMap', data: { id: 0, layer: osmArr, opacity: 100 } },
    { text: '国土地理院',
      children: [
        { text: '標準地図', data: { id: 1, layer: stdArr, opacity: 100 } }
      ]}
  ]
// const layers =
//   [
//     { text: 'OpenStreetMap', data: { id: 0, layer: osm, layer2: osm2, opacity: 100 } },
//     { text: '国土地理院',
//       children: [
//         { text: '標準地図', data: { id: 1, layer: std, layer2: std2, opacity: 100 } },
//         { text: '淡色地図', data: { id: 2, layer: pale, layer2: pale2, opacity: 100 } },
//         { text: '白地図', data: { id: 3, layer: blank, layer2: blank2, opacity: 100 } },
//         { text: '全国最新写真', data: { id: 4, layer: seamlessphoto, layer2: seamlessphoto2, opacity: 100 } }
//       ]},
//     { text: '宮崎県',
//       children: [
//         { text: '宮崎県航空写真', data: { id: 5, layer: miyazakiOrt, layer2: miyazakiOrt2, opacity: 100 } }
//       ]}
//   ]
export default layers
