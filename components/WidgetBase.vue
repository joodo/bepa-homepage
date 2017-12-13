<template>
  <div :style="styleObject">
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
        position: 'absolute',
        width: gridSizeToViewport(this.widgetWidth) +'vw',
        height: gridSizeToViewport(this.widgetHeight) +'vh',
        left: gridSizeToViewport(this.widgetX) +'vw',
        top: gridSizeToViewport(this.widgetY) +'vh',
      }
    }
  }
}
</script>
