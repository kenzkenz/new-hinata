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
      dialogWidth: '200px',
      dialogHeight: 'auto',
      treeData: layers,
      treeOptions: {}
    }
  },
  methods: {
    onNodeSelected: function (node) {
      if (node.children.length === 0) {
        if (this.val === 'map01Dialog') {
          this.$store.commit('unshiftLayerList01', {
            id: node.data.id,
            name: node.text,
            layer: node.data.layer,
            opacity: node.data.opacity
          })
        } else {
          this.$store.commit('unshiftLayerList02', {
            id: node.data.id,
            name: node.text,
            layer: node.data.layer2,
            opacity: node.data.opacity
          })
        }
      }
      node.unselect()// セレクト状態を解除
    }
  }
}
</script>

<style scoped>
    .hover-red:hover{
        color: red;
    }
    .hover-white:hover{
        color: white;
    }
</style>
<style>
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
