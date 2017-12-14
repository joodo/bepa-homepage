<template>
  <div class="widget" :style="styleObject">
    <transition-group name="el-fade-in">
      <div v-show="editMode" v-for="handle in handles"
        :class="'handle handle-'+handle" :key="handle"
        @mousedown.stop.prevent="handleDown(handle, $event)"></div>
    </transition-group>
    <slot>empty widget</slot>
  </div>
</template>

<script>
const HGrid = 40

function gridSizeToViewport(size) {
  return Math.trunc(size) * 100 / 24
}

export default {
  name: 'widget',
  props: {
    widgetData: {
      type: Object,
      default: {},
    },
  },
  data () {
    const DEFAULT_DATA = {
      x: 0,
      y: 0,
      width: 6,
      height: 6,
    }
    const widgetData = Object.assign({}, DEFAULT_DATA, this.widgetData)

    return {
      widgetX: Math.trunc(widgetData.x),
      widgetY: Math.trunc(widgetData.y),
      widgetWidth: Math.trunc(widgetData.width),
      widgetHeight: Math.trunc(widgetData.height),

      handles: ['tl', 'tr', 'bl', 'br'],
      handle: null,
      resizing: false,
    }
  },
  mounted () {
    document.documentElement.addEventListener('mousemove', this.handleMove, true)
    document.documentElement.addEventListener('mouseup', this.handleUp, true)
  },
  computed: {
    styleObject () {
      return {
        width: this.widgetWidth*100/24 +'vw',
        height: this.widgetHeight*HGrid +'px',
        left: this.widgetX*100/24 +'vw',
        top: this.widgetY*HGrid +'px',
      }
    },
    editMode () { return this.$store.state.editMode },
  },
  methods: {
    handleDown (handle, event) {
      this.handle = handle
      if (event.stopPropagation) event.stopPropagation()
      if (event.preventDefault) event.preventDefault()
      this.resizing = true
    },
    handleMove (event) {
      if (this.resizing) {
        const xx = Math.trunc((event.clientX+document.documentElement.scrollLeft) * 24 / document.documentElement.clientWidth)
        const yy = Math.trunc((event.clientY+document.documentElement.scrollTop) / HGrid)
        if (this.handle.includes('l')) {
          const right = this.widgetX + this.widgetWidth
          this.widgetX = xx
          this.widgetWidth = right - xx
        }
        if (this.handle.includes('r')) {
          this.widgetWidth = xx - this.widgetX
        }
        if (this.handle.includes('t')) {
          const bottom = this.widgetY + this.widgetHeight
          this.widgetY = yy
          this.widgetHeight = bottom - yy
        }
        if (this.handle.includes('b')) {
          this.widgetHeight = yy - this.widgetY
        }
      }
    },
    handleUp (event) {
      //this.handle = null
      this.resizing = false
    },
  }
}
</script>

<style scoped>
.widget {
  position: absolute;
  padding: 5px;
}
.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid #999;
}
.handle-tl {
  left: 0;
  top: 0;
  cursor: nwse-resize;
}
.handle-bl {
  left: 0;
  top: 100%;
  margin-top: -10px;
  cursor: nesw-resize;
}
.handle-tr {
  left: 100%;
  margin-left: -10px;
  top: 0;
  cursor: nesw-resize;
}
.handle-br {
  left: 100%;
  margin-left: -10px;
  top: 100%;
  margin-top: -10px;
  cursor: nwse-resize;
}
</style>
