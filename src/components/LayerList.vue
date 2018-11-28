選択可能なレイヤーを全て表示するツリーのvueファイル。
<template>
    <tree :data="treeData" :options="treeOptions" @node:selected="onNodeSelected"/>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import draggable from 'vuedraggable'
import LiquorTree from 'liquor-tree'
import layers from '../layers.js'
export default {
  name: 'LayerList',
  props: ['val'],
  components: {
    VueDraggableResizable,
    draggable,
    [LiquorTree.name]: LiquorTree
  },
  data () {
    return {
      treeData: layers,
      treeOptions: {} // 今の所なにも設定していない
    }
  },
  methods: {
    onNodeSelected: function (node) {
      if (node.children.length === 0) { // 子ノードがいないときだけ＝親ノードではないとき
        if (this.val === 'map01Dialog') { // 親vueから取得したvalで分岐させる。
          this.$store.commit('unshiftLayerList01', {
            id: node.data.id,
            name: node.text,
            layer: node.data.layer[0],
            opacity: node.data.opacity
          })
        } else {
          this.$store.commit('unshiftLayerList02', {
            id: node.data.id,
            name: node.text,
            layer: node.data.layer[1],
            opacity: node.data.opacity
          })
        }
      }
      node.unselect()// セレクト状態を解除。解除しないと続けて押せない。
    }
  }
}
</script>

<style>
    /*非scopedでないと反映しなかったため*/
    .tree-root{
        margin: 0;
    }
    .tree-content{
        padding: 0;
        height: 24px;
    }
    .tree-anchor{
        margin-left: 0;
        padding: 0;
    }
</style>
