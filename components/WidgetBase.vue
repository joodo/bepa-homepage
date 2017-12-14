<template>
  <div class="widget" :style="styleObject" @mouseover="onMouseOver" @mouseout="onMouseOut">
    <transition-group name="el-fade-in">
    <div v-for="anchor in anchors" v-show="editMode" :class="'anchor anchor-'+anchor" :key="anchor"></div>
    </transition-group>
    <slot>empty widget</slot>
  </div>
</template>

<script>
function gridSizeToViewport(size) {
  return Math.trunc(size) * 100 / 24
}

export default {
  name: 'widget',
  props: {
    widgetX: {
      type: Number,
      default: 0,
    },
    widgetWidth: {
      type: Number,
      default: 6,
    },
    widgetY: {
      type: Number,
      default: 0,
    },
    widgetHeight: {
      default: 6,
      type: Number
    },
  },
  data () {
    return {
      styleObject: {
        width: gridSizeToViewport(this.widgetWidth) +'vw',
        height: 20*this.widgetHeight +'px',
        left: gridSizeToViewport(this.widgetX) +'vw',
        top: 20*this.widgetY +'px',
      },
      anchors: ['tl', 'tr', 'bl', 'br'],
    }
  },
  computed: {
    editMode () { return this.$store.state.editMode }
  },
  methods: {
    onMouseOver: function (event) {
    },
    onMouseOut: function (event) {
    },
  }
}
</script>

<style scoped>
.widget {
  position: absolute;
  padding: 5px;
}
.anchor {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid #999;
}
.anchor-tl {
  left: 0;
  top: 0;
  cursor: nwse-resize;
}
.anchor-tr {
  left: 0;
  top: 100%;
  margin-top: -10px;
  cursor: nesw-resize;
}
.anchor-bl {
  left: 100%;
  margin-left: -10px;
  top: 0;
  cursor: nesw-resize;
}
.anchor-br {
  left: 100%;
  margin-left: -10px;
  top: 100%;
  margin-top: -10px;
  cursor: nwse-resize;
}
</style>
