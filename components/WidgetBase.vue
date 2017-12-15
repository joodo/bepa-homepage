<template>
  <div class="widget" :style="styleObject">
    <transition-group name="el-fade-in">
      <div v-show="editMode" v-for="anchorPoint in anchorPoints"
        :class="'anchor-point anchor-point-'+anchorPoint" :key="anchorPoint"
        @mousedown.stop.prevent="anchorPointDown(anchorPoint, $event)"></div>
    </transition-group>
    <transition name="el-zoom-in-top">
    <svg class="handle-move" v-show="editMode" width="100" height="30"
      @mousedown.stop.prevent="handleMoveDown">
      <path d="M0 0 Q5 10 10 10 L90 10 Q95 10 100 0"
            style="stroke:#AAA; stroke-width:2; fill: white;" />
      <line class="line" x1="30" y1="6" x2="70" y2="6" />
      <line class="line" x1="30" y1="4" x2="70" y2="4" />
      <line class="line" x1="30" y1="2" x2="70" y2="2" />
    </svg>
    </transition>
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

      anchorPoints: ['tl', 'tr', 'bl', 'br'],
      anchorPoint: null,
      resizing: false,

      handlePosition: null,
      moving: false,
    }
  },
  mounted () {
    document.documentElement.addEventListener('mousemove', this.mouseMove, true)
    document.documentElement.addEventListener('mouseup', this.mouseUp, true)
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
    anchorPointDown (anchorPoint, event) {
      this.anchorPoint = anchorPoint
      this.resizing = true
      if (event.stopPropagation) event.stopPropagation()
      if (event.preventDefault) event.preventDefault()
    },
    handleMoveDown (event) {
      const xx = Math.trunc((event.clientX+document.documentElement.scrollLeft) * 24 / document.documentElement.clientWidth)
      const yy = Math.trunc((event.clientY+document.documentElement.scrollTop) / HGrid)
      this.handlePosition = { x: xx-this.widgetX, y: yy-this.widgetY }
      this.moving = true
      if (event.stopPropagation) event.stopPropagation()
      if (event.preventDefault) event.preventDefault()
    },
    mouseMove (event) {
      const xx = Math.trunc((event.clientX+document.documentElement.scrollLeft) * 24 / document.documentElement.clientWidth)
      const yy = Math.trunc((event.clientY+document.documentElement.scrollTop) / HGrid)

      if (this.resizing) {
        if (this.anchorPoint.includes('l')) {
          const right = this.widgetX + this.widgetWidth
          this.widgetX = xx
          this.widgetWidth = right - xx
        }
        if (this.anchorPoint.includes('r')) {
          this.widgetWidth = xx - this.widgetX
        }
        if (this.anchorPoint.includes('t')) {
          const bottom = this.widgetY + this.widgetHeight
          this.widgetY = yy
          this.widgetHeight = bottom - yy
        }
        if (this.anchorPoint.includes('b')) {
          this.widgetHeight = yy - this.widgetY
        }
      } else if (this.moving) {
        this.widgetX = xx - this.handlePosition.x
        this.widgetY = yy - this.handlePosition.y
      }
    },
    mouseUp (event) {
      this.anchorPoint = null
      this.resizing = false
      this.moving = false
    },
  }
}
</script>

<style scoped>
.widget {
  position: absolute;
  padding: 5px;
}
.anchor-point {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid #999;
}
.anchor-point-tl {
  left: 0;
  top: 0;
  cursor: nwse-resize;
}
.anchor-point-bl {
  left: 0;
  top: 100%;
  margin-top: -10px;
  cursor: nesw-resize;
}
.anchor-point-tr {
  left: 100%;
  margin-left: -10px;
  top: 0;
  cursor: nesw-resize;
}
.anchor-point-br {
  left: 100%;
  margin-left: -10px;
  top: 100%;
  margin-top: -10px;
  cursor: nwse-resize;
}
.handle-move {
  position: absolute;
  cursor: move;
  left: 50%;
  margin-left: -50px;
}
.line {
  stroke:#BBB;
  stroke-width: 1;
}
</style>
