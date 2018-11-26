<template>
    <draggable element="ul"
               v-bind:options="{
                handle:'.handle-div',
                animation: 200,
                // delay: 50
           }"
               v-on:start="listDragBegin"
               v-on:end="listDragEnd"
               v-model="storeLayerList"
    >
        <li v-for="item in storeLayerList" v-bind:key="item.id">
            <div class="list-div">
                <div class="handle-div" >
                    <v-icon name="align-justify" class="hover-white handle-icon"/>
                </div>
                <div class="item-div">
                    {{ item.name }}
                </div>
                <div class="range-div">
                    <input type="range" class="range" v-model.number="item.opacity" v-on:input="opacityChange(item)">
                </div>
                <div class="button-div">
                    <div v-on:click="removeLayer(item)">
                        <v-icon name="times" scale="1.0" class="hover"/>
                    </div>
                </div>
            </div>
        </li>
        <vue-snotify></vue-snotify>
    </draggable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import draggable from 'vuedraggable'
export default {
  name: 'Layer',
  props: ['val'],
  components: {
    VueDraggableResizable,
    draggable
  },
  data () {
    return {
      dialogWidth: '200px',
      dialogHeight: '200px',
      list: this.storeLayerList
    }
  },
  methods: {
    listDragBegin () {
      console.log('dragstart!')
    },
    listDragEnd () {
      console.log('dragend!')
    },
    opacityChange (item) {
      item.layer.setOpacity(item.opacity / 100)
    },
    removeLayer (item) {
      const result = this.storeLayerList.filter(function (el) {
        return el.id !== item.id
      })
      if (this.val === 'map01Dialog') {
        this.$store.commit('updateList01', result)
        this.map01.removeLayer(item.layer)
      } else {
        this.$store.commit('updateList02', result)
        this.map02.removeLayer(item.layer)
      }
    }
  },
  computed: {
    map01 () {
      return this.$store.getters.map01
    },
    map02 () {
      return this.$store.getters.map02
    },
    storeLayerList: {
      get () {
        if (this.val === 'map01Dialog') {
          return this.$store.getters.layerList01
        } else {
          return this.$store.getters.layerList02
        }
      },
      set (value) {
        if (this.val === 'map01Dialog') {
          this.$store.commit('updateList01', value)
        } else {
          this.$store.commit('updateList02', value)
        }
      }
    },
    storeNotification: {
      get () { return this.$store.getters.notification },
      set (value) { this.$store.commit('updateNotification', value) }
    }
  },
  watch: {
    // ストアを監視。レイヤーを追加したとき・順番を変えたときに動く
    storeLayerList: function (newLayerList, oldLayerList) {
      // this.dialogHeight = ((40 * newLayerList.length) + 30 + 5) + 'px'
      if (this.val === 'map01Dialog') {
        if (this.map01) {
          for (let i = newLayerList.length - 1; i >= 0; i--) {
            this.map01.removeLayer(newLayerList[i].layer)
            this.map01.addLayer(newLayerList[i].layer)
            newLayerList[i].layer.setOpacity(100)
          }
        }
      } else {
        if (this.map02) {
          for (let i = newLayerList.length - 1; i >= 0; i--) {
            this.map02.removeLayer(newLayerList[i].layer)
            this.map02.addLayer(newLayerList[i].layer)
            newLayerList[i].layer.setOpacity(100)
          }
        }
      }
    },
    storeNotification: function (newValue, oldValue) {
      if (newValue === 'cyouhuku') {
        this.$store.commit('updateNotification', '')
        this.$snotify.simple('すでに選択されています。', {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: 'centerTop'
        })
      }
    }
  }
}
</script>

<style scoped>
    ul{
        padding: 0;
        margin: 0;
        position: relative;
    }
    ul li {
        color: black;
        border-bottom: solid 1px gainsboro;
        background: whitesmoke;
        padding-top: 0;
        list-style-type: none!important;
        text-align: left;
        height: 39px;
    }
    .handle-div{
        position: absolute;
        height: 100%;
        background-color: gray;
        cursor: grab;
    }
    .handle-icon{
        margin: 10px 1px 0 1px;
    }
    .list-div{
        position: relative;
        height: 100%;
    }
    .item-div{
        position: absolute;
        left: 30px;
        top: 3px;
    }
    .range-div{
        position: absolute;
        top:16px;
        left:30px;
        width:calc(100% - 60px);
    }
    .button-div{
        position: absolute;
        top:10px;
        right:0;
        width:15px;
        cursor: pointer;
    }
    .hover:hover{
        color: blue;
    }
    .hover-white:hover{
        color: white;
    }
    .el-notification__content{
        display: block;
    }
</style>
<style>
    .snotifyToast__inner{
        min-height: 50px;
    }
</style>
